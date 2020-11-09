import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./Current.module.scss";

import CurrentRow from "./CurrentRow/CurrentRow";
import RoutesForNonCompliantFiles from "../RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";

import { Policy, PolicyFlagList, PolicyToggle } from "../../../context/policy/models";

export interface CurrentProps {
	timestamp: string,
	id: string,
	email: string,
	policyFlags: PolicyFlagList,
	changeToggle: (toggle: PolicyToggle) => void,
	currentPolicy: boolean,
	policy: Policy,
	isPolicyChanged: boolean,
	cancelChanges: () => void,
	saveChanges: () => void
}

const Current = (props: CurrentProps) => {
	const [userDomain, setUserDomain] = useState("glasswallsolutions.com");
	return (
		<div className={classes.Current}>
			<div className={classes.header}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Timestamp</TableCell>
							<TableCell>Updated By</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tbody}>
						<TableRow>
							<TableCell id={props.currentPolicy ? props.id : props.policy.id}>
								{props.currentPolicy ? props.timestamp : props.policy.timestamp}
							</TableCell>
							<TableCell id={props.currentPolicy ? props.id : props.policy.id}>
								{props.currentPolicy ? props.email : props.policy.userEmail}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				{props.isPolicyChanged && (
					<div className={classes.buttons}>
						<Button
							externalStyles={classes.buttons}
							onButtonClick={props.cancelChanges}
							buttonType="button"
						>
							Cancel Changes
						</Button>
						<Button
							externalStyles={classes.buttons}
							onButtonClick={props.saveChanges}
							buttonType="button"
						>
							Save Changes
						</Button>
					</div>
				)}
			</div>
			<div className={classes.innerContent}>
				<h2 className={classes.head}>Content Flags</h2>
				<div className={classes.togglesBlock}>
					<div className={classes.block}>
						<h2>Word</h2>
						<CurrentRow
							testId="currentPolicySectionWord"
							block="word"
							itemList={props.policyFlags.word}
							onChangeHandler={props.changeToggle}
						/>
					</div>
					<div className={classes.block}>
						<h2>Excel</h2>
						<CurrentRow
							testId="currentPolicySectionExcel"
							block="excel"
							itemList={props.policyFlags.excel}
							onChangeHandler={props.changeToggle}
						/>
					</div>
					<div className={classes.block}>
						<h2>Powerpoint</h2>
						<CurrentRow
							testId="currentPolicySectionPowerpoint"
							block="powerpoint"
							itemList={props.policyFlags.powerpoint}
							onChangeHandler={props.changeToggle}
						/>
					</div>
					<div className={classes.block}>
						<h2>PDF</h2>
						<CurrentRow
							testId="currentPolicySectionPdf"
							block="pdf"
							itemList={props.policyFlags.pdf}
							onChangeHandler={props.changeToggle}
						/>
					</div>
				</div>
				<RoutesForNonCompliantFiles
					userDomain={userDomain}
					changeInput={setUserDomain}
				/>
				<PolicyForNonCompliantFiles />
			</div>
		</div>
	);
};

export default Current;
