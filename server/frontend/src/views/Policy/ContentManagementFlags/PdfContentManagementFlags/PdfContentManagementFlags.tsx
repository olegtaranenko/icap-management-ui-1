import React, { useState } from "react";
import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { PdfContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/PdfContentFlags";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

export interface PdfContentManagementFlagsProps {
    initialPdfContentFlags: PdfContentFlags,
    updatePdfContentFlags: (newPdfContentFlags: PdfContentFlags) => void,
    allDisabled?: boolean
}

const PdfContentManagementFlags = (props: PdfContentManagementFlagsProps) => {
    const [newPdfContentFlags, setNewPdfContentFlags] = useState<PdfContentFlags>(props.initialPdfContentFlags);

    const updateContentFlagAction = (flagActionName: string) => {
        setNewPdfContentFlags((prev) => {
            const newContentAction = newPdfContentFlags[flagActionName as keyof PdfContentFlags]
                === ContentManagementFlagAction.Disallow ?
                ContentManagementFlagAction.Sanitise :
                ContentManagementFlagAction.Disallow;
            return {
                ...prev,
                [flagActionName]: newContentAction
            }
        });
    }

    const pdfContentFlagToggles = [
        {
            id: "pdfAcroform",
            name: "Acroform",
            position: newPdfContentFlags.acroform as number,
            changed: newPdfContentFlags.acroform !== props.initialPdfContentFlags.acroform,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("acroform")
        },
        {
            id: "pdfActionsAll",
            name: "ActionsAll",
            position: newPdfContentFlags.actionsAll as number,
            changed: newPdfContentFlags.actionsAll !== props.initialPdfContentFlags.actionsAll,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("actionsAll")
        },
        {
            id: "pdfEmbeddedFiles",
            name: "Embedded Files",
            position: newPdfContentFlags.embeddedFiles as number,
            changed: newPdfContentFlags.embeddedFiles !== props.initialPdfContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "pdfEmbeddedImages",
            name: "Embedded Images",
            position: newPdfContentFlags.embeddedImages as number,
            changed: newPdfContentFlags.embeddedImages !== props.initialPdfContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "pdfExternalHyperlinks",
            name: "External Hyperlinks",
            position: newPdfContentFlags.externalHyperlinks as number,
            changed: newPdfContentFlags.externalHyperlinks !== props.initialPdfContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "pdfInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: newPdfContentFlags.internalHyperlinks as number,
            changed: newPdfContentFlags.internalHyperlinks !== props.initialPdfContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "pdfJavascript",
            name: "Javascript",
            position: newPdfContentFlags.javascript as number,
            changed: newPdfContentFlags.javascript !== props.initialPdfContentFlags.javascript,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("javascript")
        },
        {
            id: "pdfMetadata",
            name: "Metadata",
            position: newPdfContentFlags.metadata as number,
            changed: newPdfContentFlags.metadata !== props.initialPdfContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        }
    ];


    return (
        <>
            {pdfContentFlagToggles.map(toggle => {
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

export default PdfContentManagementFlags;