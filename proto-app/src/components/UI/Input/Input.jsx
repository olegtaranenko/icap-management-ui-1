import React from "react";

import classes from "./Input.module.scss";

const input = ({
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
		<div>
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
		</div>
	);
};

export default input;
