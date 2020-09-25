import React from "react";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

import classes from "./CurrentRow.module.scss";

const CurrentRow = ({ itemList }) => {
	const content = itemList.map((it) => {
		return <RadioButton key={it.id} buttonName={it.name} buttonId={it.id} />;
	});

	return <div className={classes.CurrentRow}>{content}</div>;
};

export default CurrentRow;
