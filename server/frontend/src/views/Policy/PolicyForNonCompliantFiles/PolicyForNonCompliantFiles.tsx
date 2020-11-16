import React from "react";
import { NcfsActions } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";

import classes from "./PolicyForNonCompliantFiles.module.scss";
import GlasswallBlockedFilesToggles from "./Toggles/GlasswallBlockedFilesToggles";
import UnProcessableFileTypesToggles from "./Toggles/UnProcessableFileTypesToggles";

export interface PolicyForNonCompliantFilesProps {
	ncfsActions: NcfsActions
}

const PolicyForNonCompliantFiles = (props: PolicyForNonCompliantFilesProps) => {
	return (
		<div className={classes.PolicyForNonCompliantFiles}>
			<section className={classes.wrapBlocksToggle}>
				<label className={classes.toggleHead}>Un-Processable File Types</label>
				<GlasswallBlockedFilesToggles
					glasswallBlockedFilesAction={props.ncfsActions.glasswallBlockedFilesAction}
					disabled />

				<label className={classes.toggleHead}>Glasswall Blocked Files</label>
				<UnProcessableFileTypesToggles
					unprocessableFileTypeAction={props.ncfsActions.unprocessableFileTypeAction}
					disabled />
			</section>
		</div>
	);
};

export default PolicyForNonCompliantFiles;
