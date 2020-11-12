import React, { useEffect, useState } from "react";

import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ContentFlags";
import { WordContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/WordContentFlags";

import WordContentManagementFlags from "./WordContentManagementFlags/WordContentManagementFlags";

import classes from "./ContentManagementFlags.module.scss";

export interface ContentManagementFlagsProps {
    contentManagementFlags: ContentFlags,
    updateContentFlags: (newContentFlags: ContentFlags) => void
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

    useEffect(() => {
        if (newContentFlags) {
            updateContentFlags(newContentFlags);
        }
    }, [newContentFlags, updateContentFlags]);

    return (
        <>
            <h2 className={classes.head}>Content Flags</h2>
            <div className={classes.togglesBlock}>
                <div className={classes.block}>
                    <h2>Word</h2>
                    <div data-test-id="currentPolicySectionWord" className={classes.CurrentRow}>
                        <WordContentManagementFlags
                            initialWordContentFlags={contentManagementFlags.wordContentManagement}
                            updateWordContentFlags={updateWordContentFlags} />
                    </div>
                </div>
                {/* <div className={classes.block}>
                    <h2>Excel</h2>
                    <CurrentPolicyRow
                        testId="currentPolicySectionExcel"
                        block="excel"
                        itemList={props.policyFlags.excel}
                        onChangeHandler={props.changeToggle}
                    />
                </div>
                <div className={classes.block}>
                    <h2>Powerpoint</h2>
                    <CurrentPolicyRow
                        testId="currentPolicySectionPowerpoint"
                        block="powerpoint"
                        itemList={props.policyFlags.powerpoint}
                        onChangeHandler={props.changeToggle}
                    />
                </div>
                <div className={classes.block}>
                    <h2>PDF</h2>
                    <CurrentPolicyRow
                        testId="currentPolicySectionPdf"
                        block="pdf"
                        itemList={props.policyFlags.pdf}
                        onChangeHandler={props.changeToggle}
                    />
                </div> */}
            </div>
        </>
    );
}

export default ContentManagementFlags;