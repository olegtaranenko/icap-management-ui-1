import React from "react";
import CheckboxItem from "../../../components/UI/Checkbox/Checkbox";

import { FormControl, FormLabel, FormGroup } from "@material-ui/core";

import classes from "./Filter.module.scss";

const Filter = ({ type, filterName, checkboxList, style }) => {
	const [selectedValue, setSelectedValue] = React.useState("");

	const handleChange = (value) => {
		setSelectedValue(value);
	};

	const checkboxes = checkboxList.map((chbox) => {
		return (
			<CheckboxItem
				selectedValue={selectedValue}
				key={chbox.id}
				type={chbox.type}
				head={chbox.head}
				name={chbox.name}
				id={chbox.id}
				onHandleChange={(evt) => handleChange(evt.target.value)}
			/>
		);
	});

	return (
		<FormControl component="fieldset" className={classes.Filter}>
			<FormLabel component="legend">{filterName}</FormLabel>
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
