import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/modal-close.svg";

import classes from "./ButtonClose.module.scss";

export interface ButtonCloseProps {
	onButtonClick: React.MouseEventHandler<HTMLButtonElement>,
	externalStyles: string,
	color?: string
};

const ButtonClose = (props: ButtonCloseProps) => {
	return (
		<button
			type="button"
			onClick={props.onButtonClick}
			className={[classes.ButtonClose, props.externalStyles].join(" ")}>
			<CloseIcon />
		</button>
	);
};

export default ButtonClose;
