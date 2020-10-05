import React from "react";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";

import classes from "./CurrentRow.module.scss";

const CurrentRow = ({ itemList, block, onChangeHandler, disabled }) => {
	const content = itemList.map((it) => {
		return (
			<RadioButton
				key={it.id}
				changed={it.touched}
				block={block}
				buttonName={it.name}
				buttonId={it.id}
				position={it.pos}
				onChangeHandler={onChangeHandler}
				disabled={disabled}
			/>
		);
	});

	return <div className={classes.CurrentRow}>{content}</div>;
};

export default CurrentRow;
