import React from "react";

import classes from "./Modal.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ onCloseHandler, children, externalStyles }) => {
	return (
		<>
			<section className={[classes.Modal, externalStyles].join(" ")}>
				<ButtonClose
					externalStyles={classes.buttonClose}
					onButtonClick={onCloseHandler}
				/>
				{children}
			</section>
			<Backdrop onClickOutside={onCloseHandler} />
		</>
	);
};

export default Modal;
