import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/modal-close.svg";

import classes from "./ButtonClose.module.scss";

const ButtonClose = ({ onButtonClick, externalStyles }) => {
	return (
		<button
			type="button"
			onClick={onButtonClick}
			className={[classes.ButtonClose, externalStyles].join(" ")}
		>
			<CloseIcon className={classes.icon} />
		</button>
	);
};

export default ButtonClose;
