import { Guid } from "guid-typescript";
import React, { useContext, useEffect } from "react";
import Button from "../../../../components/UI/Button/Button";
import { PolicyContext } from "../../../../context/policy/PolicyContext";

import classes from "./ConfirmDraftPublishModal.module.scss";

export interface ConfirmPublishModalProps {
    onCancelHandler: () => void
}

const ConfirmPublishModal = (props: ConfirmPublishModalProps) => {
    const {
        draftPolicy,
        publishPolicy
    } = useContext(PolicyContext);

    const publish = () => {
        publishPolicy(Guid.parse(draftPolicy.id))
        props.onCancelHandler();
    }

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            props.onCancelHandler();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        }
    });

    return (
        <div className={classes.modalContainer}>
            <div className={classes.header}>
                <h2>Publish Draft Policy - Are you sure?</h2>
            </div>
            <div className={classes.modalInnerContent}>
                <div className={classes.confirmPublishModalInfo}>
                    <p>After confirmation, the 'draft' policy will be published.
                        This becomes the new master policy, and will be applied to all future requests.</p>
                </div>

                <div className={classes.buttons}>
                    <Button
                        externalStyles={classes.cancelPublishButton}
                        onButtonClick={() => props.onCancelHandler()}
                        buttonType="button">Cancel</Button>
                    <Button
                        externalStyles={classes.confirmPublishButton}
                        onButtonClick={() => publish()}
                        buttonType="button">Publish</Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPublishModal;