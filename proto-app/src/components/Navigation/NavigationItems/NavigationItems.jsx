import React from "react";

import classes from "./NavigationItems.module.scss";

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ bottom, expanded, items }) => {
	const cls = [classes.NavigationItems];
	if (expanded) {
		cls.push(classes.menuExpanded);
	}
	if (bottom) {
		cls.push(classes.bottom);
	}

	const links = items.map((it) => {
		return (
			<NavigationItem
				key={it.id}
				link={it.link}
				exact={it.exact}
				notActive={it.notActive}
			>
				{it.name}
			</NavigationItem>
		);
	});

	return (
		<nav className={cls.join(" ")}>
			<ul>{links}</ul>
		</nav>
	);
};

export default NavigationItems;
