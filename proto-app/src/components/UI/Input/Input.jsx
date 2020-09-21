import React from "react";

import classes from "./Input.module.scss";

const Input = ({
	type,
	name,
	value,
	style,
	onChange,
	placeholder,
	htmlFor,
}) => {
	const cls = [classes.Input];
	return (
		<>
			<label htmlFor={htmlFor}></label>
			<input
				className={cls.join(" ")}
				style={style}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</>
	);
};

export default Input;
