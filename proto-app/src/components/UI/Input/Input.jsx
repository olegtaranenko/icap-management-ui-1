import React from "react";

import classes from "./Input.module.scss";

const Input = ({
	type,
	name,
	value,
	style,
	externalStyles,
	onChange,
	placeholder,
	autofocus,
}) => {
	const cls = [classes.Input, externalStyles];
	return (
		<>
			<label htmlFor={name}></label>
			<input
				className={cls.join(" ")}
				style={style}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				autoFocus={autofocus}
			/>
		</>
	);
};

export default Input;
