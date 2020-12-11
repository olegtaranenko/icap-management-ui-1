import React from "react";

import classes from "./NavigationItem.module.scss";
import { NavLink } from "react-router-dom";

const NavigationItem = ({
	testId,
	path,
	icon,
	exact,
	disabled,
	clicked,
	children,
}) => {

	const clickHandler = (event) => {
		if (disabled) {
			event.preventDefault();
		}

		if (!disabled) {
			clicked();
		}
	}

	let link = (
		<NavLink
			to={path}
			activeClassName={classes.active}
			exact={exact}
			onClick={clickHandler}
			style={{
				backgroundImage: `url(${icon})`,
			}}
		>
			{children}
		</NavLink>
	);

	return <li data-test-id={testId} className={classes.NavigationItem}>{link}</li>;
};

export default NavigationItem;
