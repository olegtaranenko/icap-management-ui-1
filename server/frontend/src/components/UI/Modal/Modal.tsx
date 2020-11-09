import React from "react";

import classes from "./Modal.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

export interface ModalProps {
	onCloseHandler: () => void,
	children?: React.ReactNode,
	externalStyles?: string
}

const Modal = (props: ModalProps) => {
	return (
		<section className={[classes.Modal, props.externalStyles].join(" ")}>
			<ButtonClose
				externalStyles={classes.buttonClose}
				onButtonClick={props.onCloseHandler}
			/>
			{props.children}
		</section>
	);
};

export default Modal;
