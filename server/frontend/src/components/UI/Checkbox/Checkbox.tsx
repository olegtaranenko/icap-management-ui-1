import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

export interface CheckboxProps {
	id?: string,
	label?: string,
	onHandleChange: React.ChangeEventHandler,
	isChecked?: boolean,
	filter?: string,
	backgroundColor?: string,
	checkboxIcon?: React.ReactNode,
	checkedIcon?: React.ReactNode
}

const Checkbox = (props: CheckboxProps) => {
	let checkbox = null;

	if (props.filter === "Risk") {
		checkbox = (
			<MuiCheckbox
				id={props.id}
				disableRipple
				onChange={props.onHandleChange}
				checkedIcon={<span className={classes.icon} />}
				icon={<span className={classes.icon} />}
			/>
		);
	} else {
		checkbox = (
			<MuiCheckbox
				id={props.id}
				disableRipple
				onChange={props.onHandleChange}
				checked={props.isChecked}
				color="primary"
				checkedIcon={props.checkedIcon}
				icon={props.checkboxIcon}
			/>
		);
	}

	return (
		<FormControlLabel
			style={{ background: props.backgroundColor }}
			className={
				props.filter !== "Risk"
					? classes.Checkbox
					: [classes.Checkbox, classes.risk].join(" ")
			}
			label={props.label}
			labelPlacement={props.filter !== "Risk" ? "start" : "end"}
			control={checkbox}
		/>
	);
};

export default Checkbox;
