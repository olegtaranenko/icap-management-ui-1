import React, { MouseEventHandler } from "react";
import classes from "./FileRow.module.scss";
import { TableRow, TableCell } from "@material-ui/core";

export interface FileRowProps {
	id: string,
	timestamp: string,
	fileId: string,
	name: string,
	type: string,
	outcome: string,
	onRowClickHandler: MouseEventHandler<HTMLTableRowElement>
};

const FileRow = (props: FileRowProps) => {
	return (
		<TableRow className={classes.FileRow} id={props.id} onClick={props.onRowClickHandler}>
			<TableCell component="th" scope="row" id={props.id}>
				{props.timestamp}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{props.fileId}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{props.type}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{props.outcome}
			</TableCell>
		</TableRow>
	);
};

export default FileRow;
