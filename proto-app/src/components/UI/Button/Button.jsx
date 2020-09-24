import React from "react";
import classes from "./Button.module.scss";

const Button = ({
	onButtonClick,
	buttonId,
	buttonType,
	buttonClasses,
	buttonStyle,
	children,
}) => {
	const cls = [classes.button, buttonClasses];
	return (
		<button
			onClick={onButtonClick}
			className={cls.join(" ")}
			style={buttonStyle}
			type={buttonType}
			id={buttonId}
		>
			{children}
		</button>
	);
};

export default Button;
