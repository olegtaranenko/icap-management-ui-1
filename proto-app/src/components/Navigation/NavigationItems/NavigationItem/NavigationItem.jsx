import React from "react";

import classes from "./NavigationItem.module.scss";
import { NavLink, Link } from "react-router-dom";

const NavigationItem = (props) => {
	let link = (
		<NavLink
			to={props.link}
			activeClassName={classes.active}
			exact={props.exact}
			onClick={props.clicked}
		>
			{props.children}
		</NavLink>
	);

	if (props.notActive) {
		link = (
			<Link to={props.link} className={classes.notActive}>
				{props.children}
			</Link>
		);
	}

	return <li className={classes.NavigationItem}>{link}</li>;
};

export default NavigationItem;
