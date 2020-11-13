import React, { useContext, useEffect, useState } from "react";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptionPolicy/ContentFlags/ContentFlags";
import ContentManagementFlags from "../ContentManagementFlags/ContentManagementFlags";
import { PolicyContext } from "../../../context/policy/policy-context";
import Button from "../../../components/UI/Button/Button";

import classes from "./CurrentPolicy.module.scss";

export interface CurrentPolicyProps {
	isPolicyChanged: boolean,
	updatePolicy: (policy: Policy) => void,
	cancelChanges: () => void,
	saveChanges: () => void
}

const CurrentPolicy = (props: CurrentPolicyProps) => {
	const {
		currentPolicy,
	} = useContext(PolicyContext);

	const [isLoading, setIsLoading] = useState(true);

	const updateContentManagementFlags = (newContentFlags: ContentFlags) => {
		// setPolicy((prev: Policy) => {
		// 	return {
		// 		...prev,
		// 		adaptionPolicy: { ...prev.adaptionPolicy, contentManagementFlags: newContentFlags }
		// 	}
		// });
	}

	useEffect(() => {
		if (currentPolicy !== null) {
			setIsLoading(false);
		}
	}, [currentPolicy]);

	return (
		<div className={classes.Current}>
			{isLoading &&
				<div>Loading...</div>
			}

			{!isLoading &&
				<>
					<div className={classes.header}>
						<div className={classes.tableContainer}>
							<Table className={classes.table} id={currentPolicy.id}>
								<TableHead>
									<TableRow>
										<TableCell>Timestamp</TableCell>
										<TableCell>Updated By</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className={classes.tbody}>
									<TableRow>
										<TableCell>
											{new Date(currentPolicy.published).toLocaleTimeString()}
										</TableCell>
										<TableCell>
											{currentPolicy.updatedBy ? currentPolicy.updatedBy : "N/A"}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>

						{props.isPolicyChanged && (
							<div className={classes.buttons}>
								<Button
									externalStyles={classes.buttons}
									onButtonClick={props.cancelChanges}
									buttonType="button">Cancel Changes</Button>

								<Button
									externalStyles={classes.buttons}
									onButtonClick={props.saveChanges}
									buttonType="button">Save Changes</Button>
							</div>
						)}
					</div>

					<div className={classes.innerContent}>
						<ContentManagementFlags
							contentManagementFlags={currentPolicy.adaptionPolicy.contentManagementFlags}
							updateContentFlags={updateContentManagementFlags}
							disabled={true} />

						{/* <RoutesForNonCompliantFiles
					userDomain={userDomain}
					changeInput={setUserDomain} />

					<PolicyForNonCompliantFiles /> */}
					</div>
				</>
			}
		</div>
	);
}

export default CurrentPolicy;