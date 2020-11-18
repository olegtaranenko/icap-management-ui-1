import React, { useContext, useEffect, useState } from "react";

import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ContentFlags";
import { NcfsActions } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";

import { PolicyContext } from "../../../context/policy/policy-context";

import classes from "./DraftPolicy.module.scss";
import Button from "../../../components/UI/Button/Button";

const DraftPolicy = () => {
    const {
        newDraftPolicy,
        currentPolicy,
        isPolicyChanged,
        policyContextHasError,
        updateNewDraftPolicy,
        saveDraftChanges,
        cancelChanges
    } = useContext(PolicyContext);

    const [isLoading, setIsLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Adaption Policy");

    const tabs = [
        { testId: "buttonCurrentAdaptionPolicyTab", name: "Adaption Policy" },
        { testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
    ];

    const updateContentManagementFlags = (newContentFlags: ContentFlags) => {
        updateNewDraftPolicy({
            ...newDraftPolicy,
            adaptionPolicy: {
                ...newDraftPolicy.adaptionPolicy,
                contentManagementFlags: newContentFlags
            }
        });
    };

    const updateNcfsRoute = (newRoutingUrl: string) => {
        updateNewDraftPolicy({
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
        updateNewDraftPolicy({
            ...newDraftPolicy,
            adaptionPolicy: {
                ...newDraftPolicy.adaptionPolicy,
                ncfsActions: {
                    glasswallBlockedFilesAction: newActions.glasswallBlockedFilesAction,
                    unprocessableFileTypeAction: newActions.unprocessableFileTypeAction
                }
            }
        });
    }

    const saveDraft = () => {
        setIsLoading(true);
        saveDraftChanges();
    }

    useEffect(() => {
        if (newDraftPolicy !== null && currentPolicy !== null && isLoading) {
            setTimeout(() => setIsLoading(false), 500);
        }
    }, [newDraftPolicy, currentPolicy, isLoading]);

    const saveCancelButtons = (
        <div className={classes.header}>
            <div className={classes.buttons}>
                <Button
                    externalStyles={classes.buttons}
                    onButtonClick={cancelChanges}
                    buttonType="button">Cancel Changes</Button>
                <Button
                    externalStyles={classes.buttons}
                    onButtonClick={saveDraft}
                    buttonType="button">Save Changes</Button>
            </div>
        </div>
    );

    return (
        <div className={classes.Draft}>
            {isLoading &&
                <div>Loading...</div>
            }

            {!isLoading &&
                <>
                    {policyContextHasError &&
                        <div>Error getting Policy data.</div>
                    }

                    {!policyContextHasError &&
                        <>
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
                        </>
                    }
                </>
            }
        </div>
    )
}

export default DraftPolicy;