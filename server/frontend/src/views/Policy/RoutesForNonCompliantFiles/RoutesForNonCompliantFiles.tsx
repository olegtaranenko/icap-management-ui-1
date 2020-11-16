import React, { useContext } from "react";

import { PolicyContext } from "../../../context/policy/policy-context";
import DomainField from "../DomainField/DomainField";

import classes from "./RoutesForNonCompliantFiles.module.scss";

export interface RoutesForNonCompliantFilesProps {
	ncfsRoutingUrl: string,
	changeInput?: (newUrl: string) => void,
	disabled?: boolean
}

const RoutesForNonCompliantFiles = (props: RoutesForNonCompliantFilesProps) => {

	const {
		currentPolicy
	} = useContext(PolicyContext);
	const currentPolicyRoutingUrl = currentPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl;

	const handleChange = (newUrl: string) => {
		if (props.changeInput) {
			props.changeInput(newUrl);
		}
	}

	return (
		<section className={classes.routes}>
			<div className={classes.table}>
				<DomainField
					isChanged={currentPolicyRoutingUrl !== props.ncfsRoutingUrl}
					value={props.ncfsRoutingUrl}
					disabled={props.disabled}
					onChangeInputHandler={(event: any) => handleChange(event.target.value)} />

				{props.changeInput !== null &&
					<p className={classes.currentApiUrl}>Current API Url: {currentPolicyRoutingUrl}</p>
				}
			</div>
		</section>
	);
};

export default RoutesForNonCompliantFiles;
