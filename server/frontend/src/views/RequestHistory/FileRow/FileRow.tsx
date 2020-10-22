import React, { MouseEventHandler } from "react";
import classes from "./FileRow.module.scss";
import { TableRow, TableCell } from "@material-ui/core";
import { FileType } from "../../../enums/FileType";
import { Risk } from "../../../enums/Risk";

export interface FileRowProps {
	id: string,
	timestamp: string,
	fileId: string,
	type: number,
	outcome: number,
	onRowClickHandler: MouseEventHandler<HTMLTableRowElement>
}

const FileRow = (props: FileRowProps) => {

	const formattedType = props.type as FileType;
	const formattedOutcome = props.outcome as Risk;

	return (
		<TableRow className={classes.FileRow} id={props.id} onClick={props.onRowClickHandler}>
			<TableCell component="th" scope="row" id={props.id}>
				{new Date(props.timestamp).toLocaleString()}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{props.fileId}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{FileType[formattedType]}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{Risk[formattedOutcome]}
			</TableCell>
		</TableRow>
	);
};

export default FileRow;
