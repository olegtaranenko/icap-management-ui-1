import React from "react";
import { NcfsOption } from "../../../../../../src/common/models/enums/NcfsOption";


import classes from "./Toggles.module.scss";

export interface GlasswallBlockedFilesTogglesProps {
	glasswallBlockedFilesAction: NcfsOption,
	disabled?: boolean
}

const GlasswallBlockedFilesToggles = (props: GlasswallBlockedFilesTogglesProps) => {
	return (
		<div className={classes.Toggles}>
			<form method="post" action="">
				<div className={classes.input}>
					<input data-test-id="input-glasswallBlockedFiles-relay"
						id="relay-glasswallBlockedFiles"
						type="radio"
						name="toggle"
						defaultChecked={props.glasswallBlockedFilesAction === NcfsOption.Relay}
						disabled={props.disabled} />

					<label htmlFor="relay-glasswallBlockedFiles">
						{" "}
						<strong>Relay </strong>- The unmodified original file should be
						relayed
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id="input-glasswallBlockedFiles-block"
						id="block-glasswallBlockedFiles"
						type="radio"
						name="toggle"
						defaultChecked={props.glasswallBlockedFilesAction === NcfsOption.Block}
						disabled={props.disabled} />

					<label htmlFor="block-glasswallBlockedFiles">
						{" "}
						<strong>Block </strong>- The original file should be blocked. An
						Error report should be constructed using the template included in
						the Adaption Policy.
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id="input-glasswallBlockedFiles-refer"
						id="refer-glasswallBlockedFiles"
						type="radio"
						name="toggle"
						defaultChecked={props.glasswallBlockedFilesAction === NcfsOption.Refer}
						disabled={props.disabled} />

					<label htmlFor="refer-glasswallBlockedFiles">
						{" "}
						<strong>Refer </strong>- The document it is submitted to the
						'Non-compliant File Service' (see section 1.4.5 Non-compliant File
						Service). The return information from this call is then used to
						construct the Transaction Outcome message.
					</label>
				</div>
			</form>
		</div>
	);
};

export default GlasswallBlockedFilesToggles;
