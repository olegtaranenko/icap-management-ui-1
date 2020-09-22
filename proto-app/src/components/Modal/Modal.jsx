import React from "react";
import Backdrop from "../UI/Backdrop/Backdrop";

import classes from "./Modal.module.scss";

const Modal = ({ head, onButtonCloseClick, children }) => {
	return (
		<>
			<Backdrop onClickOutside={onButtonCloseClick} />
			<article className={classes.Modal}>
				<header>
					<span>{head}</span>
					<button
						className={classes.buttonClose}
						onClick={onButtonCloseClick}
					>
						X
					</button>
				</header>
				<section className={classes.inner}>{children}</section>
			</article>
		</>
	);
};

export default Modal;
