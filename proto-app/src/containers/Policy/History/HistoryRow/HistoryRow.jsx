import React from "react";
import classes from "./HistoryRow.module.scss";
import { TableRow, TableCell } from "@material-ui/core";
import Button from "../../../../components/UI/Button/Button";

const FileRow = ({ id, timestamp, updatedBy, onRowClickHandler }) => {
	return (
		<TableRow
			className={classes.HistoryRow}
			id={id}
			onClick={onRowClickHandler}
		>
			<TableCell component="th" scope="row" id={id}>
				{timestamp}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				{updatedBy}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				<Button>View</Button>
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				<Button>Activate</Button>
			</TableCell>
		</TableRow>
	);
};

export default FileRow;
