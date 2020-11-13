import React, { useState } from "react";
import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { WordContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/WordContentFlags";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

export interface WordContentManagementFlagsProps {
    initialWordContentFlags: WordContentFlags,
    updateWordContentFlags: (newWordContentFlags: WordContentFlags) => void,
    allDisabled?: boolean
}

const WordContentManagementFlags = (props: WordContentManagementFlagsProps) => {
    const [newWordContentFlags, setNewWordContentFlags] = useState<WordContentFlags>(props.initialWordContentFlags);

    const updateContentFlagAction = (flagActionName: string) => {
        setNewWordContentFlags((prev) => {
            const newContentAction = newWordContentFlags[flagActionName as keyof WordContentFlags]
                === ContentManagementFlagAction.Disallow ?
                ContentManagementFlagAction.Sanitise :
                ContentManagementFlagAction.Disallow;
            return {
                ...prev,
                [flagActionName]: newContentAction
            }
        });
    }

    const wordContentFlagToggles = [
        {
            id: "wordDynamicDataExchange",
            name: "Dynamic Data Exchange",
            position: newWordContentFlags.dynamicDataExchange as number,
            changed: newWordContentFlags.dynamicDataExchange !== props.initialWordContentFlags.dynamicDataExchange,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("dynamicDataExchange")
        },
        {
            id: "wordEmbeddedFiles",
            name: "Embedded Files",
            position: newWordContentFlags.embeddedFiles as number,
            changed: newWordContentFlags.embeddedFiles !== props.initialWordContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "wordEmbeddedImages",
            name: "Embedded Images",
            position: newWordContentFlags.embeddedImages as number,
            changed: newWordContentFlags.embeddedImages !== props.initialWordContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "wordExternalHyperlinks",
            name: "External Hyperlinks",
            position: newWordContentFlags.externalHyperlinks as number,
            changed: newWordContentFlags.externalHyperlinks !== props.initialWordContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "wordInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: newWordContentFlags.internalHyperlinks as number,
            changed: newWordContentFlags.internalHyperlinks !== props.initialWordContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "wordMacros",
            name: "Macros",
            position: newWordContentFlags.macros as number,
            changed: newWordContentFlags.macros !== props.initialWordContentFlags.macros,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("macros")
        },
        {
            id: "wordMetadata",
            name: "Metadata",
            position: newWordContentFlags.metadata as number,
            changed: newWordContentFlags.metadata !== props.initialWordContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        },
        {
            id: "wordReviewComments",
            name: "Review Comments",
            position: newWordContentFlags.reviewComments as number,
            changed: newWordContentFlags.reviewComments !== props.initialWordContentFlags.reviewComments,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("reviewComments")
        }
    ];


    return (
        <>
            {wordContentFlagToggles.map(toggle => {
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

export default WordContentManagementFlags;