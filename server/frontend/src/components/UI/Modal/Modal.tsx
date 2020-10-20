import React from "react";

import classes from "./Modal.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";
import Backdrop from "../Backdrop/Backdrop";

export interface ModalProps {
	onCloseHandler: React.MouseEventHandler<HTMLButtonElement>,
	children?: React.ReactNode,
	externalStyles?: string
};

const Modal = (props: ModalProps) => {
	return (
		<>
			<section className={[classes.Modal, props.externalStyles].join(" ")}>
				<ButtonClose
					externalStyles={classes.buttonClose}
					onButtonClick={props.onCloseHandler}
				/>
				{props.children}
			</section>
			<Backdrop onClickOutside={props.onCloseHandler} />
		</>
	);
};

export default Modal;
