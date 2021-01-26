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
	onChange: React.ChangeEventHandler,
	placeholder: string,
	autofocus?: boolean,
	disabled?: boolean,
	loading?: boolean,
	required?: boolean,
	minLength?: number
}

const Input = (props: InputProps) => {
	return (
		<div className={[classes.Input, props.externalStyles].join(" ")}>
			<div className={`${classes.inputContainer} ${props.touched ? classes.changed : ""}`} style={props.style}>
				<label htmlFor={props.name}>{props.label}</label>
				<input
					data-test-id={props.testId}
					className={classes.input}
					style={props.loading ? {width: "90%"} : {width: "100%"}}
					type={props.type}
					name={props.name}
					onChange={props.onChange}
					placeholder={props.placeholder}
					autoFocus={props.autofocus}
					required={props.required}
					disabled={props.disabled}
					minLength={props.minLength}
				/>

				{props.loading &&
					<div className={classes.iconContainer}>
						<i className={classes.loader}></i>
					</div>
				}
			</div>
		</div>
	);
};

export default Input;
