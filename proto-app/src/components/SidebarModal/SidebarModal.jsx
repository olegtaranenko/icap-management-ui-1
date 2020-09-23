import React from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import classes from "./SidebarModal.module.scss";

const SidebarModal = ({ head, onClose, children }) => {
	return (
		<>
			<Backdrop onClickOutside={onClose} />
			<article className={classes.Modal}>
				<header>
					<span>{head}</span>
					<button
						className={classes.buttonClose}
						onClick={onClose}
					>
						X
					</button>
				</header>
				<section className={classes.inner}>{children}</section>
			</article>
		</>
	);
};

export default SidebarModal;
