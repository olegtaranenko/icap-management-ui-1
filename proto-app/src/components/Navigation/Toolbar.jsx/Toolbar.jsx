import React, { useState, useContext } from "react";

import classes from "./Toolbar.module.scss";

import { AuthContext } from "../../../context/auth/auth-context";

import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ExpandButton } from "../../GlasswallNav/GlasswallNav";
import UserLink from "../../UI/UserLink/UserLink";
import Popup from "../../UI/Popup/Popup";

import usersIcon from "../../../assets/menu-icons/icon-users.svg";
import releaseIcon from "../../../assets/menu-icons/icon-release.svg";
import policy from "../../../assets/menu-icons/icon-policies.svg";
import transactionIcon from "../../../assets/menu-icons/icon-transactions.svg";
import configIcon from "../../../assets/menu-icons/icon-config.svg";
import dashIcon from "../../../assets/menu-icons/icon-dashboard.svg";

import logoutIcon from "../../../assets/svg/account-icons/logout-icon.svg";
import changePassIcon from "../../../assets/svg/account-icons/change-password-icon.svg";
import ChangePassword from "../../ChangePassword/ChangePassword";

const navLinks = [
	{
		link: "/dashboard",
		name: "Dashboard",
		icon: dashIcon,
		id: "id-1",
		exact: true,
	},
	{
		link: "/request-history",
		name: "Request history",
		icon: transactionIcon,
		id: "id-2",
		exact: true,
	},
	{
		link: "/file-drop",
		name: "File drop",
		icon: releaseIcon,
		id: "id-3",
	},
	{
		link: "/policy",
		name: "Policy",
		icon: policy,
		id: "id-4",
	},
	{
		link: "/configuration",
		name: "Configuration",
		icon: configIcon,
		id: "id-5",
	},
	{ link: "/users", name: "Users", icon: usersIcon, id: "id-6" },
];

const Toolbar = ({ expanded, navExpandedHandler }) => {
	const [isOpen, setIsOpen] = useState(false);
	const {
		logout,
		isChangePass,
		openChangePass,
		closeChangePass,
	} = useContext(AuthContext);

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
			onClickButtonHandler: () => openChangePass(),
		},
	];

	return (
		<>
			<section className={cls.join(" ")}>
				<GlasswallLogo className={classes.logo} />
				<NavigationItems expanded={expanded} items={navLinks} />
				<UserLink
					username={"usertest@glasswallsolutions.com"}
					expanded={expanded}
					openPopup={() => setIsOpen(true)}
					closePopup={() => setIsOpen(false)}
				/>
				<ExpandButton expanded={expanded} clickHandler={navExpandedHandler} />
			</section>
			{isOpen && (
				<Popup
					links={accountLinks}
					externalStyles={classes.popup}
					openPopupHover={() => setIsOpen(true)}
					closePopupHover={() => setIsOpen(false)}
				/>
			)}
			{isChangePass && <ChangePassword closeModal={closeChangePass} />}
		</>
	);
};

export default Toolbar;
