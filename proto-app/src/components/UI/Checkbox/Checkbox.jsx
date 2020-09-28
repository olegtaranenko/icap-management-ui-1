import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

const Checkbox = ({
	label,
	onHandleChange,
	value,
	checked,
	filter,
	backgroundColor,
}) => {
	let checkbox = null;

	if (filter === "Outcome") {
		checkbox = (
			<MuiCheckbox
				disableRipple
				checkedIcon={<span className={classes.icon} />}
				icon={<span className={classes.icon} />}
				//color="primary"
				onChange={onHandleChange}
			/>
		);
	} else {
		checkbox = (
			<MuiCheckbox disableRipple color="primary" onChange={onHandleChange} />
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
			value={value}
			checked={checked}
			labelPlacement={filter !== "Outcome" ? "start" : "end"}
			control={checkbox}
		/>
	);
};

export default Checkbox;
