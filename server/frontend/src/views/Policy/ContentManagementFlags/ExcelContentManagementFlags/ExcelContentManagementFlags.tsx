import React, { useState } from "react";
import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { ExcelContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ExcelContentFlags";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

export interface ExcelContentManagementFlagsProps {
    initialExcelContentFlags: ExcelContentFlags,
    updateExcelContentFlags: (newExcelContentFlags: ExcelContentFlags) => void,
    allDisabled?: boolean
}

const ExcelContentManagementFlags = (props: ExcelContentManagementFlagsProps) => {
    const [newExcelContentFlags, setNewExcelContentFlags] = useState<ExcelContentFlags>(props.initialExcelContentFlags);

    const updateContentFlagAction = (flagActionName: string) => {
        setNewExcelContentFlags((prev) => {
            const newContentAction = newExcelContentFlags[flagActionName as keyof ExcelContentFlags]
                === ContentManagementFlagAction.Disallow ?
                ContentManagementFlagAction.Sanitise :
                ContentManagementFlagAction.Disallow;
            return {
                ...prev,
                [flagActionName]: newContentAction
            }
        });
    }

    const excelContentFlagToggles = [
        {
            id: "excelDynamicDataExchange",
            name: "Dynamic Data Exchange",
            position: newExcelContentFlags.dynamicDataExchange as number,
            changed: newExcelContentFlags.dynamicDataExchange !== props.initialExcelContentFlags.dynamicDataExchange,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("dynamicDataExchange")
        },
        {
            id: "excelEmbeddedFiles",
            name: "Embedded Files",
            position: newExcelContentFlags.embeddedFiles as number,
            changed: newExcelContentFlags.embeddedFiles !== props.initialExcelContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "excelEmbeddedImages",
            name: "Embedded Images",
            position: newExcelContentFlags.embeddedImages as number,
            changed: newExcelContentFlags.embeddedImages !== props.initialExcelContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "excelExternalHyperlinks",
            name: "External Hyperlinks",
            position: newExcelContentFlags.externalHyperlinks as number,
            changed: newExcelContentFlags.externalHyperlinks !== props.initialExcelContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "excelInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: newExcelContentFlags.internalHyperlinks as number,
            changed: newExcelContentFlags.internalHyperlinks !== props.initialExcelContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "excelMacros",
            name: "Macros",
            position: newExcelContentFlags.macros as number,
            changed: newExcelContentFlags.macros !== props.initialExcelContentFlags.macros,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("macros")
        },
        {
            id: "excelMetadata",
            name: "Metadata",
            position: newExcelContentFlags.metadata as number,
            changed: newExcelContentFlags.metadata !== props.initialExcelContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        },
        {
            id: "excelReviewComments",
            name: "Review Comments",
            position: newExcelContentFlags.reviewComments as number,
            changed: newExcelContentFlags.reviewComments !== props.initialExcelContentFlags.reviewComments,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("reviewComments")
        }
    ];


    return (
        <>
            {excelContentFlagToggles.map(toggle => {
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

export default ExcelContentManagementFlags;