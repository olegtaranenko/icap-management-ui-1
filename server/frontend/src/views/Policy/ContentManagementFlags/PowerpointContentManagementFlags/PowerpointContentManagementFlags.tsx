import React, { useState } from "react";
import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { PowerpointContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/PowerpointContentFlags";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

export interface PowerpointContentManagementFlagsProps {
    initialPowerpointContentFlags: PowerpointContentFlags,
    updatePowerpointContentFlags: (newPowerpointContentFlags: PowerpointContentFlags) => void,
    allDisabled?: boolean
}

const PowerpointContentManagementFlags = (props: PowerpointContentManagementFlagsProps) => {
    const [newPowerpointContentFlags, setNewPowerpointContentFlags] = useState<PowerpointContentFlags>(props.initialPowerpointContentFlags);

    const updateContentFlagAction = (flagActionName: string) => {
        setNewPowerpointContentFlags((prev) => {
            const newContentAction = newPowerpointContentFlags[flagActionName as keyof PowerpointContentFlags]
                === ContentManagementFlagAction.Disallow ?
                ContentManagementFlagAction.Sanitise :
                ContentManagementFlagAction.Disallow;
            return {
                ...prev,
                [flagActionName]: newContentAction
            }
        });
    }

    const powerpointContentFlagToggles = [
        {
            id: "powerpointEmbeddedFiles",
            name: "Embedded Files",
            position: newPowerpointContentFlags.embeddedFiles as number,
            changed: newPowerpointContentFlags.embeddedFiles !== props.initialPowerpointContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "powerpointEmbeddedImages",
            name: "Embedded Images",
            position: newPowerpointContentFlags.embeddedImages as number,
            changed: newPowerpointContentFlags.embeddedImages !== props.initialPowerpointContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "powerpointExternalHyperlinks",
            name: "External Hyperlinks",
            position: newPowerpointContentFlags.externalHyperlinks as number,
            changed: newPowerpointContentFlags.externalHyperlinks !== props.initialPowerpointContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "powerpointInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: newPowerpointContentFlags.internalHyperlinks as number,
            changed: newPowerpointContentFlags.internalHyperlinks !== props.initialPowerpointContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "powerpointMacros",
            name: "Macros",
            position: newPowerpointContentFlags.macros as number,
            changed: newPowerpointContentFlags.macros !== props.initialPowerpointContentFlags.macros,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("macros")
        },
        {
            id: "powerpointMetadata",
            name: "Metadata",
            position: newPowerpointContentFlags.metadata as number,
            changed: newPowerpointContentFlags.metadata !== props.initialPowerpointContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        },
        {
            id: "powerpointReviewComments",
            name: "Review Comments",
            position: newPowerpointContentFlags.reviewComments as number,
            changed: newPowerpointContentFlags.reviewComments !== props.initialPowerpointContentFlags.reviewComments,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("reviewComments")
        }
    ];

    return (
        <>
            {powerpointContentFlagToggles.map(toggle => {
                return (
                    <RadioButton
                        key={toggle.id}
                        block={toggle.name}
                        buttonName={toggle.name}
                        buttonId={toggle.id}
                        position={toggle.position}
                        onChangeHandler={toggle.onChange}
                        changed={toggle.changed}
                        disabled={toggle.disabled} />
                )
            })}
        </>
    );
}

export default PowerpointContentManagementFlags;