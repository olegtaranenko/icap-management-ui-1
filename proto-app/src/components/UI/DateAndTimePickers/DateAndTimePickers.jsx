import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField as MuiTextField } from "@material-ui/core";

import classes from "./DateAndTimePickers.module.scss";
import Popup from "../Popup/Popup";

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

const timeIntervalList = [
	{ name: "1 Hour" },
	{ name: "12 Hours" },
	{ name: "24 Hours" },
	{ name: "Last 7 Days" },
	{ name: "Custom Range" },
];

const DateAndTimePickers = ({ externalStyles }) => {
	const [isOpen, setIsOpen] = useState(false);
	const classesTextField = useStyles();

	const date = new Date();
	const currentDate = date.toISOString().substr(0, 19);

	let earlierDate = new Date();
	earlierDate.setMonth(date.getMonth() - 1);
	earlierDate = earlierDate.toISOString().substr(0, 19);

	return (
		<div className={[classes.DateAndTimePickers, externalStyles].join(" ")}>
			<button
				className={classes.intervalButton}
				onClick={() => setIsOpen((prevState) => !prevState)}
			>
				Date/Time
			</button>
			<form className={classesTextField.container} noValidate>
				<MuiTextField
					id="datetime-local-left"
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
					id="datetime-local-right"
					margin="none"
					type="datetime-local"
					defaultValue={currentDate}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</form>
			{isOpen && (
				<Popup
					links={timeIntervalList}
					externalStyles={classes.popup}
					closePopupHover={() => setIsOpen((prevState) => !prevState)}
				/>
			)}
		</div>
	);
};

export default DateAndTimePickers;
