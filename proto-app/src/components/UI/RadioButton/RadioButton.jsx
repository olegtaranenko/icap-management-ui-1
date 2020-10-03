import React from "react";
import classes from "./RadioButton.module.scss";

const RadioButton = ({
	block,
	buttonName,
	buttonId,
	position,
	changed,
	onChangeHandler,
}) => {
	const cls = [classes.button];
	if (changed) {
		cls.push(classes.changed);
	}

	return (
		<div className={classes.RadioButton}>
			<span>{buttonName}</span>
			<div className={cls.join(" ")}>
				<input
					checked={position === "disallow"}
					onChange={() =>
						onChangeHandler({ id: buttonId, block: block, pos: "disallow" })
					}
					type="radio"
					id={buttonId + "disallow"}
					value="0"
					name={buttonId + "disallow"}
					tabIndex="-1"
				/>
				<label htmlFor={buttonId + "disallow"}>Disallow</label>
				<input
					checked={position === "sanitise"}
					onChange={() =>
						onChangeHandler({ id: buttonId, block: block, pos: "sanitise" })
					}
					type="radio"
					id={buttonId + "sanitise"}
					value="1"
					name={buttonId + "sanitise"}
					tabIndex="-1"
				/>
				<label htmlFor={buttonId + "sanitise"}>Sanitise</label>
			</div>
		</div>
	);
};

export default RadioButton;
