import React from "react";
import classes from "./Popup.module.scss";

const Popup = ({ links, openPopupHover, closePopupHover }) => {
	const buttonList = links.map((link) => {
		return (
			<button
				key={link.name}
				onClick={link.onClickButtonHandler}
				style={{
					backgroundImage: `url(${link.icon})`,
				}}
			>
				<p>{link.name}</p>
			</button>
		);
	});
	return (
		<div
			className={classes.popup}
			onMouseEnter={openPopupHover}
			onMouseLeave={closePopupHover}
		>
			{buttonList}
		</div>
	);
};

export default Popup;
