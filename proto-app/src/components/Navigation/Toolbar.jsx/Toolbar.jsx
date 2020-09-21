import React, { useState, useContext } from "react";

import classes from "./Toolbar.module.scss";

import AuthContext from "../../../context/auth/auth-context";

import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ExpandButton } from "../../GlasswallNav/GlasswallNav";
import UserLink from "../../UI/UserLink/UserLink";
import Popup from "../../UI/Popup/Popup";

import UsersIcon from "../../../assets/menu-icons/icon-users.svg";
import ReleaseIcon from "../../../assets/menu-icons/icon-release.svg";
import Polisy from "../../../assets/menu-icons/icon-policies.svg";
import TransactionIcon from "../../../assets/menu-icons/icon-transactions.svg";
import ConfigIcon from "../../../assets/menu-icons/icon-config.svg";

import logoutIcon from "../../../assets/svg/account-icons/logout-icon.svg";
import changePassIcon from "../../../assets/svg/account-icons/change-password-icon.svg";

const navLinks = [
	{
		link: "/transaction-log",
		name: "Transaction log",
		icon: TransactionIcon,
		id: "id-1",
		exact: true,
	},
	{
		link: "/file-release-request",
		name: "File release requests",
		icon: ReleaseIcon,
		id: "id-2",
	},
	{
		link: "/policy",
		name: "Policy",
		icon: Polisy,
		id: "id-3",
	},
	{
		link: "/configuration",
		name: "Configuration",
		icon: ConfigIcon,
		id: "id-4",
	},
	{ link: "/users", name: "Users", icon: UsersIcon, id: "id-5" },
];

const Toolbar = ({ expanded, navExpandedHandler }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useContext(AuthContext);

	const cls = [classes.Toolbar];
	const clsNav = [classes.nav];
	if (expanded) {
		cls.push(classes.expanded);
		clsNav.push(classes.expanded);
	}

	const accountLinks = [
		{
			name: "Log out",
			icon: logoutIcon,
			onClickButtonHandler: () => logout(),
		},
		{
			name: "Change password",
			icon: changePassIcon,
			onClickButtonHandler: () => alert("Change password"),
		},
	];

	return (
		<>
			<section className={cls.join(" ")}>
				<GlasswallLogo className={classes.logo} />
				<NavigationItems expanded={expanded} items={navLinks} />
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
					links={accountLinks}
					openPopupHover={() => setIsOpen(true)}
					closePopupHover={() => setIsOpen(false)}
				/>
			)}
		</>
	);
};

export default Toolbar;
