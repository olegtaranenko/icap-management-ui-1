import React, { useContext, useState } from "react";
import equal from "deep-equal";
import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/ContentFlags";
import { NcfsActions } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";

import { PolicyContext } from "../../../context/policy/PolicyContext";

import classes from "./DraftPolicy.module.scss";
import Button from "../../../components/UI/Button/Button";
import { Guid } from "guid-typescript";

const DraftPolicy = () => {
    const {
        isPolicyChanged,
        newDraftPolicy,
        currentPolicy,
        status,
        setNewDraftPolicy,
        saveDraftChanges,
        cancelDraftChanges,
        publishPolicy
    } = useContext(PolicyContext);

    const [selectedTab, setSelectedTab] = useState("Adaptation Policy");

    const tabs = [
        { testId: "buttonCurrentAdaptationPolicyTab", name: "Adaptation Policy" },
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

    const showPublishButton = () => {
        const draft = {
            adaptionPolicy: {
                ...newDraftPolicy.adaptionPolicy,
                ncfsRoute: newDraftPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl
            },
            ...newDraftPolicy.ncfsPolicy,
        };

        const current = {
            adaptionPolicy: {
                ...currentPolicy.adaptionPolicy,
                ncfsRoute: currentPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl
            },
            ...currentPolicy.ncfsPolicy
        };

        return !isPolicyChanged && !equal(draft, current);
    }

    const saveCancelButtons = (
        <div className={classes.buttons}>
            <Button
                externalStyles={classes.cancelButton}
                onButtonClick={() => cancelDraftChanges()}
                buttonType="button">Cancel Changes</Button>
            <Button
                externalStyles={classes.saveButton}
                onButtonClick={() => saveDraftChanges()}
                buttonType="button">Save Changes</Button>
        </div>
    );

    const publishButton = (
        <div className={classes.buttons}>
            <Button
                externalStyles={classes.publishButton}
                onButtonClick={() => publishPolicy(Guid.parse(newDraftPolicy.id))}
                buttonType="button">Publish</Button>
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
                        <Tab isSelected={selectedTab === "Adaptation Policy"} externalStyles={classes.Tab}>
                            <h2 className={classes.head}>
                                <div className={classes.header}>
                                    Content Management Flags
                                    {isPolicyChanged && <>{saveCancelButtons}</>}
                                    {showPublishButton() && publishButton}
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
                                    {showPublishButton() && publishButton}
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