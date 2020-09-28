import React from "react";
import classes from "./Modal.module.scss";

const Modal = ({ children, styleModal }) => {
	return (
		<section className={classes.Modal} style={styleModal}>
			<div className={classes.inner}>{children}</div>
		</section>
	);
};

export default Modal;
