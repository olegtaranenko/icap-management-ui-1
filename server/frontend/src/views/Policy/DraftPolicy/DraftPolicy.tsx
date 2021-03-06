import React, { useContext, useState } from "react";
import equal from "deep-equal";
import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../common/ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../common/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../common/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/ContentFlags";
import { NcfsActions } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";
import { PolicyContext } from "../../../context/policy/PolicyContext";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import ConfirmDraftPublishModal from "./ConfirmDraftPublishModal/ConfirmDraftPublishModal";
import ConfirmDraftDeleteModal from "./ConfirmDraftDeleteModal/ConfirmDraftDeleteModal";
import UnsavedChangesPrompt from "../common/UnsavedChangesPrompt/UnsavedChangesPrompt";

import classes from "./DraftPolicy.module.scss";

const DraftPolicy = () => {
    const {
        isPolicyChanged,
        newDraftPolicy,
        currentPolicy,
        status,
        setNewDraftPolicy,
        saveDraftChanges,
        cancelDraftChanges,
    } = useContext(PolicyContext);

    const [selectedTab, setSelectedTab] = useState("Adaptation Policy");
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);

    const tabs = [
        { testId: "buttonCurrentAdaptationPolicyTab", name: "Adaptation Policy" },
        { testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
    ];

    const closePublishModal = () => setShowPublishModal(false);

    const closeDeleteModal = () => setshowDeleteModal(false);

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
                ncfsRoute: newDraftPolicy.adaptionPolicy.ncfsRoute ?
                    newDraftPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : null
            },
            ...newDraftPolicy.ncfsPolicy,
        };

        const current = {
            adaptionPolicy: {
                ...currentPolicy.adaptionPolicy,
                ncfsRoute: currentPolicy.adaptionPolicy.ncfsRoute ?
                    currentPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : null
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

    const publishDeleteButtons = (
        <div className={classes.buttons}>
            <Button
                externalStyles={classes.deleteButton}
                onButtonClick={() => setshowDeleteModal(true)}
                buttonType="button">Delete</Button>
            <Button
                externalStyles={classes.publishButton}
                onButtonClick={() => setShowPublishModal(true)}
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
                <>
                    <UnsavedChangesPrompt
                        when={isPolicyChanged}
                        message="You have unsaved changes, are you sure you want to leave the page?" />

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
                                        {showPublishButton() && publishDeleteButtons}
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
                                        {showPublishButton() && publishDeleteButtons}
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
                                        ncfsRoutingUrl={newDraftPolicy.adaptionPolicy.ncfsRoute ? newDraftPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : ""}
                                        changeInput={updateNcfsRoute} />

                                    <PolicyForNonCompliantFiles
                                        ncfsActions={newDraftPolicy.adaptionPolicy.ncfsActions}
                                        updateNcfsActions={updateNcfsActions} />
                                </div>
                            </Tab>
                        </div>
                    </TabNav>

                    {showPublishModal &&
                        <>
                            <Modal onCloseHandler={closePublishModal} externalStyles={classes.modal}>
                                <ConfirmDraftPublishModal onCancelHandler={closePublishModal} />
                            </Modal>
                            <Backdrop onClickOutside={closePublishModal} />
                        </>
                    }

                    {showDeleteModal &&
                        <>
                            <Modal onCloseHandler={closeDeleteModal} externalStyles={classes.modal}>
                                <ConfirmDraftDeleteModal onCancelHandler={closeDeleteModal} />
                            </Modal>
                            <Backdrop onClickOutside={closeDeleteModal} />
                        </>
                    }
                </>
            }
        </div >
    )
}

export default DraftPolicy;