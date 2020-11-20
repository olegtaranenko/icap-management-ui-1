import React, { useContext, useState } from "react";

import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ContentFlags";
import { NcfsActions } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";

import { PolicyContext } from "../../../context/policy/PolicyContext";

import classes from "./DraftPolicy.module.scss";
import Button from "../../../components/UI/Button/Button";

const DraftPolicy = () => {
    const {
        isPolicyChanged,
        newDraftPolicy,
        status,
        setNewDraftPolicy,
        saveDraftChanges,
        cancelDraftChanges
    } = useContext(PolicyContext);

    const [selectedTab, setSelectedTab] = useState("Adaption Policy");

    const tabs = [
        { testId: "buttonCurrentAdaptionPolicyTab", name: "Adaption Policy" },
        { testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
    ];

    const updateContentManagementFlags = (newContentFlags: ContentFlags) => {
        setNewDraftPolicy({
            ...newDraftPolicy,
            adaptionPolicy: {
                ...newDraftPolicy.adaptionPolicy,
                contentManagementFlags: newContentFlags
            }
        });
    };

    const updateNcfsRoute = (newRoutingUrl: string) => {
        setNewDraftPolicy({
            ...newDraftPolicy,
            adaptionPolicy: {
                ...newDraftPolicy.adaptionPolicy,
                ncfsRoute: {
                    ncfsRoutingUrl: newRoutingUrl,
                    isDeleted: false,
                    isValidated: false
                }
            }
        });
    };

    const updateNcfsActions = (newActions: NcfsActions) => {
        setNewDraftPolicy({
            ...newDraftPolicy,
            adaptionPolicy: {
                ...newDraftPolicy.adaptionPolicy,
                ncfsActions: {
                    glasswallBlockedFilesAction: newActions.glasswallBlockedFilesAction,
                    unprocessableFileTypeAction: newActions.unprocessableFileTypeAction
                }
            }
        });
    };

    const saveCancelButtons = (
        <div className={classes.header}>
            <div className={classes.buttons}>
                <Button
                    externalStyles={classes.buttons}
                    onButtonClick={cancelDraftChanges}
                    buttonType="button">Cancel Changes</Button>
                <Button
                    externalStyles={classes.buttons}
                    onButtonClick={() => saveDraftChanges()}
                    buttonType="button">Save Changes</Button>
            </div>
        </div>
    );

    return (
        <div className={classes.Draft}>
            {status === "LOADING" &&
                <div>Loading...</div>
            }

            {status === "ERROR" &&
                <div>Error getting Policy data.</div>
            }

            {status === "LOADED" &&
                <TabNav
                    tabs={tabs}
                    selectedTabName={selectedTab}
                    onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

                    <div className={classes.innerContent}>
                        <Tab isSelected={selectedTab === "Adaption Policy"} externalStyles={classes.Tab}>
                            <h2 className={classes.head}>
                                <div className={classes.header}>
                                    Content Management Flags
                                                {isPolicyChanged && <>{saveCancelButtons}</>}
                                </div>
                            </h2>
                            <ContentManagementFlags
                                contentManagementFlags={newDraftPolicy.adaptionPolicy.contentManagementFlags}
                                updateContentFlags={updateContentManagementFlags} />
                        </Tab>

                        <Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab}>
                            <h2 className={classes.head}>
                                <div className={classes.header}>
                                    Config for non-compliant files
                                                {isPolicyChanged && <>{saveCancelButtons}</>}
                                </div>
                            </h2>
                            <div className={classes.ncfsContainer}>
                                <section className={classes.info}>
                                    <div>
                                        <h3>
                                            <strong>Un-Processable File Types</strong>{" "}
                                        </h3>
                                        <p>
                                            When the filetype of the original file is identified as one that
                                            the Glasswall SDK cannot rebuild.
											</p>
                                    </div>
                                    <div>
                                        <h3>
                                            <strong>Glasswall Blocked Files</strong>
                                        </h3>
                                        <p>The original file cannot be rebuilt by the Glasswall SDK</p>
                                    </div>
                                </section>
                                <RoutesForNonCompliantFiles
                                    ncfsRoutingUrl={newDraftPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl}
                                    changeInput={updateNcfsRoute} />

                                <PolicyForNonCompliantFiles
                                    ncfsActions={newDraftPolicy.adaptionPolicy.ncfsActions}
                                    updateNcfsActions={updateNcfsActions} />
                            </div>
                        </Tab>
                    </div>
                </TabNav>
            }
        </div>
    )
}

export default DraftPolicy;