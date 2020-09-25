import React from "react";
import classes from "./PopupFilter.module.scss";

const PopupFilter = ({
	children,
	stylePopup,
	openPopupHover,
	closePopupHover,
}) => {
	return (
		<section
			className={classes.PopupFilter}
			style={stylePopup}
			onMouseEnter={openPopupHover}
			onMouseLeave={closePopupHover}
		>
			<div className={classes.inner}>{children}</div>
		</section>
	);
};

export default PopupFilter;
