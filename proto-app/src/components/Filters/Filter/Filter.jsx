import React, { useContext, useState } from "react";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";

import GlobalStoreContext from "../../../context/globalStore/globalStore-context";

import classes from "./Filter.module.scss";

import CheckboxItem from "../../UI/Checkbox/Checkbox";

const Filter = ({ filter, checkboxList }) => {
	const { addFilter } = useContext(GlobalStoreContext);

	const handleChange = (selected) => {
		addFilter(selected);
	};

	const checkboxes = checkboxList.map(
		({ id, type, format, name, isChecked }) => {
			return (
				<CheckboxItem
					key={id}
					type={type}
					label={format}
					name={name}
					value={format}
					checked={isChecked}
					onHandleChange={(evt) =>
						handleChange({
							value: evt.target.value,
							filter: filter,
							id: id,
							checked: evt.target.checked,
						})
					}
				/>
			);
		}
	);

	return (
		<FormControl component="fieldset" className={classes.Filter}>
			<FormLabel component="legend">{filter}</FormLabel>
			<FormGroup
				className={classes.formGroup}
				style={{ flexDirection: "row" }}
			>
				{checkboxes}
			</FormGroup>
		</FormControl>
	);
};

export default Filter;
