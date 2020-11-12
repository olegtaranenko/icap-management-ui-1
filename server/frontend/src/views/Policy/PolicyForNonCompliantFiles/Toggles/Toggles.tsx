import React from "react";

import classes from "./Toggles.module.scss";

export interface TogglesProps {
	nameBlock: string
}

const Toggles = (props: TogglesProps) => {
	return (
		<div className={classes.Toggles}>
			<form method="post" action="">
				<div className={classes.input}>
					<input data-test-id={`input-${props.nameBlock}-Relay`} id={`relay-${props.nameBlock}`} type="radio" name="toggle" />
					<label htmlFor={`relay-${props.nameBlock}`}>
						{" "}
						<strong>Relay </strong>- The unmodified original file should be
						relayed
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id={`input-${props.nameBlock}-Block`} id={`block-${props.nameBlock}`} type="radio" name="toggle" />
					<label htmlFor={`block-${props.nameBlock}`}>
						{" "}
						<strong>Block </strong>- The original file should be blocked. An
						Error report should be constructed using the template included in
						the Adaption Policy.
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id={`input-${props.nameBlock}-Refer`} id={`refer-${props.nameBlock}`} type="radio" name="toggle" />
					<label htmlFor={`refer-${props.nameBlock}`}>
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

export default Toggles;
