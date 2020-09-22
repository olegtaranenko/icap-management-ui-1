import React from "react";
import classes from "./FileRow.module.scss";
import { TableRow, TableCell } from "@material-ui/core";

const FileRow = ({
	id,
	timestamp,
	fileId,
	name,
	type,
	outcome,
	onRowClickHandler,
}) => {
	return (
		<TableRow className={classes.FileRow} id={id} onClick={onRowClickHandler}>
			<TableCell component="th" scope="row" id={id}>
				{timestamp}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				{fileId}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				{name}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				{type}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				{outcome}
			</TableCell>
		</TableRow>
	);
};

export default FileRow;
