import React from "react";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";
import { PolicyToggle } from "../../../../context/policy/models";

import classes from "./CurrentRow.module.scss";

export interface CurrentRowProps {
	testId?: string,
	itemList: PolicyToggle[],
	block: "word" | "excel" | "powerpoint" | "pdf",
	onChangeHandler?: (toggle: PolicyToggle) => void,
	disabled?: boolean
}

const CurrentRow = (props: CurrentRowProps) => {
	const content = props.itemList.map((it) => {
		return (
			<RadioButton
				key={it.id}
				changed={it.touched}
				block={props.block}
				buttonName={it.name}
				buttonId={it.id}
				position={it.pos}
				onChangeHandler={props.onChangeHandler}
				disabled={props.disabled}
			/>
		);
	});

	return <div data-test-id={props.testId} className={classes.CurrentRow}>{content}</div>;
};

export default CurrentRow;
