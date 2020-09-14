import classes from "./Button.module.scss";
import React from "react";

const Button = ({ onButtonClick, buttonId, buttonType, children }) => (
	<button
		onClick={onButtonClick}
		className={classes.button}
		type={buttonType}
		id={buttonId}
	>
		{children}
	</button>
);

export default Button;
