import React, { useState } from "react";
import classes from "./RadioButton.module.scss";

const RadioButton = ({ buttonName, buttonId }) => {
	const [selectedId, setSlectedId] = useState(0);

	return (
		<div className={classes.RadioButton}>
			<span>{buttonName}</span>
			<div className={classes.button}>
				<input
					checked={selectedId === 0}
					onChange={() => setSlectedId(0)}
					type="radio"
					id={buttonId + "Allow"}
					value="0"
					name={buttonId + "control"}
					tabIndex="-1"
				/>
				<label htmlFor={buttonId + "Allow"}>Allow</label>
				<input
					checked={selectedId === 1}
					onChange={() => setSlectedId(1)}
					type="radio"
					id={buttonId + "Sanitise"}
					value="1"
					name={buttonId + "control"}
					tabIndex="-1"
				/>
				<label htmlFor={buttonId + "Sanitise"}>Sanitise</label>
			</div>
		</div>
	);
};

export default RadioButton;
