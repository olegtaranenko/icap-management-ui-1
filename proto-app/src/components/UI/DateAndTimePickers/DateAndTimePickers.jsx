import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField as MuiTextField } from "@material-ui/core";

import classes from "./DateAndTimePickers.module.scss";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexWrap: "nowrap",
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}));

const DateAndTimePickers = () => {
	const classesTextField = useStyles();

	const date = new Date();
	const currentDate = date.toISOString().substr(0, 19);

	let earlierDate = new Date();
	earlierDate.setMonth(date.getMonth() - 1);
	earlierDate = earlierDate.toISOString().substr(0, 19);

	return (
		<div className={classes.DateAndTimePickers}>
			<span>Date/Time</span>
			<form className={classesTextField.container} noValidate>
				<MuiTextField
					id="datetime-local"
					margin="none"
					type="datetime-local"
					defaultValue={earlierDate}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</form>
			<p>-</p>
			<form className={classesTextField.container} noValidate>
				<MuiTextField
					id="datetime-local"
					margin="none"
					type="datetime-local"
					defaultValue={currentDate}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</form>
		</div>
	);
};

export default DateAndTimePickers;
