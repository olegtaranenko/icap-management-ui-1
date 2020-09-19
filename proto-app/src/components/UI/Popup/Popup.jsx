import React from "react";
import classes from "./Popup.module.scss";

const Popup = ({ openPopup, closePopup }) => {
	return (
		<div
			className={classes.popup}
			onMouseEnter={openPopup}
			onMouseLeave={closePopup}
		>
			<button>Log out</button>
			<button>Change password</button>
		</div>
	);
};

export default Popup;
