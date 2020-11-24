import React from "react";

import classes from "./Input.module.scss";

export interface InputProps {
	testId?: string,
	label?: string,
	name?: string,
	style?: React.CSSProperties,
	externalStyles?: string,
	valid?: boolean,
	touched?: boolean
	type: string,
	value: string,
	onChange: React.ChangeEventHandler,
	placeholder: string,
	autofocus?: boolean,
	disabled: boolean,
}

const Input = (props: InputProps) => {
	return (
		<div className={[classes.Input, props.externalStyles].join(" ")}>
			<label htmlFor={props.name}>{props.label}</label>
			<input
				className={props.touched ? classes.changed : ""}
				data-test-id={props.testId}
				style={props.style}
				type={props.type}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				autoFocus={props.autofocus}
				disabled={props.disabled}
			/>
		</div>
	);
};

export default Input;
