import React, { useState } from "react";
import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";

import { WordContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/WordContentFlags";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

export interface WordContentManagementFlagsProps {
    initialWordContentFlags: WordContentFlags,
    updateWordContentFlags: (newWordContentFlags: WordContentFlags) => void
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
            disabled: false,
            onChange: () => updateContentFlagAction("dynamicDataExchange")
        },
        {
            id: "wordEmbeddedFiles",
            name: "Embedded Files",
            position: newWordContentFlags.embeddedFiles as number,
            changed: newWordContentFlags.embeddedFiles !== props.initialWordContentFlags.embeddedFiles,
            disabled: false,
            onChange: () => updateContentFlagAction("embeddedFiles")
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