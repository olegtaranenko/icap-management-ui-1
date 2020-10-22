import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField as MuiTextField } from "@material-ui/core";

import classes from "./DateAndTimePickers.module.scss";
import Popup from "../Popup/Popup";

interface DateAndTimePickersProps {
	initialStartTimestamp: Date,
	initialEndTimestamp: Date,
	onChangeStartTimestamp: (dateTime: Date) => void,
	onChangeEndTimestamp: (dateTime: Date) => void,
	externalStyles: string
}

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


const DateAndTimePickers = (props: DateAndTimePickersProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const classesTextField = useStyles();

	const handleInterval = (name: string) => {
		const now = new Date();
		const then = new Date();

		switch (name) {
			case "1 Hour":
				then.setHours(then.getHours() - 1);
				props.onChangeStartTimestamp(then);
				props.onChangeEndTimestamp(now);
				break;
			case "12 Hours":
				then.setHours(then.getHours() - 12);
				props.onChangeStartTimestamp(then);
				props.onChangeEndTimestamp(now);
				break;
			case "24 Hours":
				then.setHours(then.getHours() - 24);
				props.onChangeStartTimestamp(then);
				props.onChangeEndTimestamp(now);
				break;
		}
	};

	const timeIntervalList = [
		{ name: "1 Hour", onClickButtonHandler: () => handleInterval("1 Hour") },
		{ name: "12 Hours", onClickButtonHandler: () => handleInterval("12 Hours") },
		{ name: "24 Hours", onClickButtonHandler: () => handleInterval("24 Hours") },
	];

	return (
		<div className={[classes.DateAndTimePickers, props.externalStyles].join(" ")}>
			<button
				className={classes.intervalButton}
				onClick={() => setIsOpen((prevState) => !prevState)}>
				Date/Time
			</button>
			<form className={classesTextField.container} noValidate>
				<MuiTextField
					id="datetime-local-left"
					margin="none"
					type="datetime-local"
					value={props.initialStartTimestamp.toISOString().substr(0, 19)}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={event => props.onChangeStartTimestamp(new Date(event.target.value))}
				/>
			</form>
			<p>-</p>
			<form className={classesTextField.container} noValidate>
				<MuiTextField
					id="datetime-local-right"
					margin="none"
					type="datetime-local"
					value={props.initialEndTimestamp.toISOString().substr(0, 19)}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={event => props.onChangeEndTimestamp(new Date(event.target.value))}
				/>
			</form>
			{isOpen && (
				<Popup
					popupButtons={timeIntervalList}
					externalStyles={classes.popup}
					closePopupHover={() => setIsOpen((prevState) => !prevState)}
				/>
			)}
		</div>
	);
};

export default DateAndTimePickers;
