import React from "react";
import classes from "./Popup.module.scss";

export interface PopupButton {
	name: string,
	icon?: string,
	onClickButtonHandler: React.MouseEventHandler<HTMLButtonElement>
}

export interface PopupProps {
	popupButtons: PopupButton[],
	children?: React.ReactNode,
	openPopupHover?: React.MouseEventHandler<HTMLDivElement>,
	closePopupHover: React.MouseEventHandler<HTMLDivElement>,
	externalStyles: string
}

const Popup = (props: PopupProps) => {
	let buttonList: JSX.Element[];

	if (props.popupButtons) {
		buttonList = props.popupButtons.map(({ name, icon, onClickButtonHandler }) => {
			return (
				<button
					key={name}
					onClick={onClickButtonHandler}
					style={{
						backgroundImage: `url(${icon})`,
					}}
				>
					<p>{name}</p>
				</button>
			);
		});
	}

	return (
		<div
			className={[classes.Popup, props.externalStyles].join(" ")}
			onMouseEnter={props.openPopupHover}
			onMouseLeave={props.closePopupHover}
		>
			{buttonList}
			{props.children}
		</div>
	);
};

export default Popup;
