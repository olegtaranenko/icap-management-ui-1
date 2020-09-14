import classes from "./Button.module.scss";
import React from "react";

const button = ({ onButtonClick, buttonId, btnType, children }) => (
	<button
		onClick={onButtonClick}
		className={classes.button}
		type={btnType}
		id={buttonId}
	>
		{children}
	</button>
);

export default button;
