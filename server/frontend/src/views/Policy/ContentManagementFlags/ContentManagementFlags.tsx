import React, { useEffect, useState } from "react";

import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ContentFlags";
import { WordContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/WordContentFlags";
import { ExcelContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ExcelContentFlags";
import { PowerpointContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/PowerpointContentFlags";
import { PdfContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/PdfContentFlags";

import WordContentManagementFlags from "./WordContentManagementFlags/WordContentManagementFlags";
import PowerpointContentManagementFlags from "./PowerpointContentManagementFlags/PowerpointContentManagementFlags";

import classes from "./ContentManagementFlags.module.scss";
import ExcelContentManagementFlags from "./ExcelContentManagementFlags/ExcelContentManagementFlags";
import PdfContentManagementFlags from "./PdfContentManagementFlags/PdfContentManagementFlags";

export interface ContentManagementFlagsProps {
    contentManagementFlags: ContentFlags,
    updateContentFlags: (newContentFlags: ContentFlags) => void,
    disabled?: boolean
}

const ContentManagementFlags = (props: ContentManagementFlagsProps) => {
    const { contentManagementFlags, updateContentFlags } = props;
    const [newContentFlags, setNewContentFlags] = useState<ContentFlags>(null);

    const updateWordContentFlags = (newWordContentFlags: WordContentFlags) => {
        setNewContentFlags((prev: ContentFlags) => {
            return {
                ...prev,
                wordContentManagement: newWordContentFlags
            }
        });
    }

    const updateExcelContentFlags = (newExcelContentFlags: ExcelContentFlags) => {
        setNewContentFlags((prev: ContentFlags) => {
            return {
                ...prev,
                excelContentManagement: newExcelContentFlags
            }
        });
    }

    const updatePowerpointContentFlags = (newPowerpointContentFlags: PowerpointContentFlags) => {
        setNewContentFlags((prev: ContentFlags) => {
            return {
                ...prev,
                powerPointContentManagement: newPowerpointContentFlags
            }
        });
    }

    const updatePdfContentFlags = (newPdfContentFlags: PdfContentFlags) => {
        setNewContentFlags((prev: ContentFlags) => {
            return {
                ...prev,
                pdfContentManagement: newPdfContentFlags
            }
        });
    }

    useEffect(() => {
        if (newContentFlags) {
            updateContentFlags(newContentFlags);
        }
    }, [newContentFlags, updateContentFlags]);

    return (
        <>
            <h2 className={classes.head}>Content Flags</h2>
            <div className={classes.contentFlagsContainer}>
                <div className={classes.block}>
                    <h2>Word</h2>
                    <div data-test-id="currentPolicySectionWord" className={classes.CurrentRow}>
                        <WordContentManagementFlags
                            initialWordContentFlags={contentManagementFlags.wordContentManagement}
                            updateWordContentFlags={updateWordContentFlags}
                            allDisabled={props.disabled} />
                    </div>
                </div>
                <div className={classes.block}>
                    <h2>Excel</h2>
                    <div data-test-id="currentPolicySectionExcel" className={classes.CurrentRow}>
                        <ExcelContentManagementFlags
                            initialExcelContentFlags={contentManagementFlags.excelContentManagement}
                            updateExcelContentFlags={updateExcelContentFlags}
                            allDisabled={props.disabled} />
                    </div>
                </div>
                <div className={classes.block}>
                    <h2>Powerpoint</h2>
                    <div data-test-id="currentPolicySectionPowerpoint" className={classes.CurrentRow}>
                        <PowerpointContentManagementFlags
                            initialPowerpointContentFlags={contentManagementFlags.powerPointContentManagement}
                            updatePowerpointContentFlags={updatePowerpointContentFlags}
                            allDisabled={props.disabled} />
                    </div>
                </div>

                <div className={classes.block}>
                    <h2>PDF</h2>
                    <div data-test-id="currentPolicySectionPdf" className={classes.CurrentRow}>
                        <PdfContentManagementFlags
                            initialPdfContentFlags={contentManagementFlags.pdfContentManagement}
                            updatePdfContentFlags={updatePdfContentFlags}
                            allDisabled={props.disabled} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentManagementFlags;