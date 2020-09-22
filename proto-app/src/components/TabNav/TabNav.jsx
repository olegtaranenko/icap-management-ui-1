import React from "react";

import classes from "./TabNav.module.scss";

const TabNav = ({ tabs, isSelectedTab, onSetActiveTabHandler, children }) => {
	const tabNav = tabs.map((tab) => {
		const clsButton = [classes.button];
		const clsLink = [classes.link];
		let icon = tab.icon;

		if (tab.name === isSelectedTab) {
			clsLink.push(classes.active);
			clsButton.push(classes.active);
			icon = tab.iconSelected;
		}

		return (
			<li key={tab.name} className={clsLink.join(" ")}>
				<button
					className={clsButton.join(" ")}
					onClick={() => onSetActiveTabHandler(tab.name)}
				>
					<img src={icon} alt="tab.name" />
					{tab.name}
				</button>
			</li>
		);
	});

	return (
		<section className={classes.TabNav}>
			<ul>{tabNav}</ul>
			<div className={classes.tabwrap}>{children}</div>
		</section>
	);
};

export default TabNav;
