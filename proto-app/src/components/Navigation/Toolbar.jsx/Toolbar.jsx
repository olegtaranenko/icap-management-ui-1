import React, { useState } from "react";

import classes from "./Toolbar.module.scss";

import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ExpandButton } from "../../GlasswallNav/GlasswallNav";
import UserLink from "../../UI/UserLink/UserLink";
import Popup from "../../UI/Popup/Popup";

const navLinksTop = [
	{
		link: "/transaction-log",
		name: "Transaction log",
		id: "id-1",
		exact: true,
	},
	{
		link: "/file-release-request",
		name: "File release requests",
		id: "id-2",
	},
	{ link: "/configuration", name: "Configuration", id: "id-3" },
	{ link: "/users", name: "Users", id: "id-4" },
];

const Toolbar = ({ expanded, navExpandedHandler }) => {
	const [isOpen, setIsOpen] = useState(false);

	const cls = [classes.Toolbar];
	const clsNav = [classes.nav];
	if (expanded) {
		cls.push(classes.expanded);
		clsNav.push(classes.expanded);
	}

	return (
		<>
			<section className={cls.join(" ")}>
				<GlasswallLogo className={classes.logo} />
				<NavigationItems expanded={expanded} items={navLinksTop} />
				<UserLink
					username={"usertest@test.com"}
					expanded={expanded}
					openPopup={() => setIsOpen(true)}
					closePopup={() => setIsOpen(false)}
				/>
				<ExpandButton expanded={expanded} clickHandler={navExpandedHandler} />
			</section>
			{isOpen && (
				<Popup
					openPopup={() => setIsOpen(true)}
					closePopup={() => setIsOpen(false)}
				/>
			)}
		</>
	);
};

export default Toolbar;
