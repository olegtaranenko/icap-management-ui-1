import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

const Checkbox = ({ type, label, selectedValue, onHandleChange, id }) => {
	return (
		<FormControlLabel
			className={classes.Checkbox}
			label={label}
			labelPlacement="start"
			control={
				type === "checkbox" ? (
					<MuiCheckbox color="primary" />
				) : (
					<MuiCheckbox
						value={label}
						color="primary"
						checked={selectedValue === label}
						onChange={onHandleChange}
					/>
				)
			}
		/>
	);
};

export default Checkbox;
