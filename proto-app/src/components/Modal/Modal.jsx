import React from "react";
import Backdrop from "../UI/Backdrop/Backdrop";

import classes from "./Modal.module.scss";

const Modal = ({ fileName, onButtonCloseClick, children }) => {
	return (
		<>
			<Backdrop onClickOutside={onButtonCloseClick} />
			<article className={classes.Modal}>
				<header>
					<span>{fileName}</span>
					<button
						className={classes.buttonClose}
						onClick={onButtonCloseClick}
					>
						X
					</button>
				</header>
				<div className={classes.inner}>{children}</div>
			</article>
		</>
	);
};

export default Modal;
