import React, { useState, useContext } from "react";

import classes from "./Toolbar.module.scss";

import { AuthContext } from "../../../context/auth/auth-context";

import { GlobalStoreContext } from "../../../context/globalStore/globalStore-context";

import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ExpandButton } from "../../GlasswallNav/GlasswallNav";
import UserLink from "../../UI/UserLink/UserLink";
import Popup, { PopupButton } from "../../UI/Popup/Popup";

import usersIcon from "../../../assets/menu-icons/icon-users.svg";
import releaseIcon from "../../../assets/menu-icons/icon-release.svg";
import policy from "../../../assets/menu-icons/icon-policies.svg";
import transactionIcon from "../../../assets/menu-icons/icon-transactions.svg";
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
	{ link: "/users", name: "Users", icon: usersIcon, id: "id-6" },
];

const Toolbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const {
		logout,
		isChangePass,
		openChangePass,
		closeChangePass,
	} = useContext(AuthContext);

	const { navExpanded, toggleNavExpanded } = useContext(GlobalStoreContext);

	const cls = [classes.Toolbar];
	const clsNav = [classes.nav];
	if (navExpanded) {
		cls.push(classes.expanded);
		clsNav.push(classes.expanded);
	}

	const accountLinks: Array<PopupButton> = [
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
				<NavigationItems expanded={navExpanded} items={navLinks} />
				<UserLink
					username={"usertest@glasswallsolutions.com"}
					expanded={navExpanded}
					openPopup={() => setIsOpen(true)}
					closePopup={() => setIsOpen(false)}
				/>
				<ExpandButton expanded={navExpanded} clickHandler={toggleNavExpanded} />
			</section>
			{isOpen && (
				<Popup
					popupButtons={accountLinks}
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
