import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/modal-close.svg";

import classes from "./ButtonClose.module.scss";

const ButtonClose = ({
	color = "#fff",
	width = "1rem",
	height = "1rem",
	onButtonClick,
	externalStyles,
}) => {
	return (
		<button
			type="button"
			onClick={onButtonClick}
			className={[classes.ButtonClose, externalStyles].join(" ")}
		>
			<CloseIcon fill={color} width={width} height={height} />
		</button>
	);
};

export default ButtonClose;
