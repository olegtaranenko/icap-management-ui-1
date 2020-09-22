import React from "react";

import { FormControlLabel, Checkbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

const CheckboxItem = ({ type, head, selectedValue, onHandleChange, id }) => {
	return (
		<FormControlLabel
			className={classes.Checkbox}
			label={head}
			labelPlacement="start"
			control={
				type === "checkbox" ? (
					<Checkbox color="primary" />
				) : (
					<Checkbox
						value={head}
						color="primary"
						checked={selectedValue === head}
						onChange={onHandleChange}
					/>
				)
			}
		/>
	);
};

export default CheckboxItem;
