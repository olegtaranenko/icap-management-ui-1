import React from "react";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./DomainField.module.scss";
import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";

import Input from "../../../components/UI/Input/Input";

export interface DomainFieldProps {
	value: string,
	onChangeInputHandler: (event: any) => void,
	disabled?: boolean
}

const DomainField = (props: DomainFieldProps) => {
	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>API URL</TableCell>
					<TableCell>Validated</TableCell>
				</TableRow>
			</TableHead>
			<TableBody className={classes.tbody}>
				<TableRow className={`${classes.domainRow} ${props.disabled ? classes.disabled : ""}`}>
					<TableCell>
						<Input
							testId="inputApiUrl"
							type="text"
							value={props.value}
							placeholder="API URL"
							onChange={props.onChangeInputHandler}
							disabled={props.disabled}
						/>
					</TableCell>
					<TableCell>
						<TickIcon stroke="#73AE6F" />
						{!props.disabled &&
							<DeleteIcon stroke="#D69598" />
						}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default DomainField;
