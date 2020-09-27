import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

const Checkbox = ({ label, onHandleChange, value, checked }) => {
	return (
		<FormControlLabel
			className={classes.Checkbox}
			label={label}
			value={value}
			checked={checked}
			labelPlacement="start"
			control={<MuiCheckbox color="primary" onChange={onHandleChange} />}
		/>
	);
};

export default Checkbox;
