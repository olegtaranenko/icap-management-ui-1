import React from "react";

import classes from "./Input.module.scss";

export interface InputProps {
	label?: string,
	type: string,
	name: string,
	value: string,
	style?: React.CSSProperties,
	externalStyles: string,
	onChange: React.ChangeEventHandler,
	placeholder: string,
	autofocus: boolean,
	disabled: boolean,
	valid: boolean,
	touched: boolean
}

const Input = (props: InputProps) => {
	return (
		<div className={[classes.Input, props.externalStyles].join(" ")}>
			<label htmlFor={props.name}>{props.label}</label>
			<input
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
