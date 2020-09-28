import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

const Checkbox = ({
	label,
	onHandleChange,
	checked,
	filter,
	backgroundColor,
}) => {
	let checkbox = null;

	if (filter === "Outcome") {
		checkbox = (
			<MuiCheckbox
				disableRipple
				onChange={onHandleChange}
				checkedIcon={<span className={classes.icon} />}
				icon={<span className={classes.icon} />}
			/>
		);
	} else {
		checkbox = (
			<MuiCheckbox
				disableRipple
				onChange={onHandleChange}
				checked={checked}
				color="primary"
			/>
		);
	}

	return (
		<FormControlLabel
			style={{ background: backgroundColor }}
			className={
				filter !== "Outcome"
					? classes.Checkbox
					: [classes.Checkbox, classes.outcome].join(" ")
			}
			label={label}
			labelPlacement={filter !== "Outcome" ? "start" : "end"}
			control={checkbox}
		/>
	);
};

export default Checkbox;
