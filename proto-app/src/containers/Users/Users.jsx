import React, { useState } from "react";

import classes from "./Users.module.scss";
import UsersIcon from "../../assets/users-icon.svg";
import UsersIconSelected from "../../assets/users-icon-selected.svg";
// import RolesIcon from "../../assets/roles-icon.svg";
// import RolesIconSelected from "../../assets/roles-icon-selected.svg";

import User from "./User/User";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";

const users = [
	{
		name: "Adam2",
		id: "Adam2",
		email: "ahewitt@glasswallsolutions.com",
	},
];

const userTypes = ["Administrator", "User"];

const tabs = [
	{ name: "Users", icon: UsersIcon, iconSelected: UsersIconSelected },
];

const Users = () => {
	const [selectedTab, setSelectedTab] = useState("Users");

	const userFields = users.map((u) => {
		return (
			<User key={u.id} name={u.name} email={u.email} groupList={userTypes} />
		);
	});
	return (
		<section className={classes.Users}>
			<TabNav
				tabs={tabs}
				isSelectedTab={selectedTab}
				onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
			>
				<Tab isSelected={selectedTab === "Users"}>
					<div className={classes.header}>
						<p>Users</p>
						<button>+</button>
					</div>
					<div className={classes.table}>
						<div className={classes.tr}>
							<div className={classes.th}>
								<p>Name</p>
								<p>Email</p>
								<p>User Group</p>
								<p>Confirmed&nbsp;&nbsp;&nbsp;Status</p>
							</div>
						</div>
						{userFields}
					</div>
				</Tab>
			</TabNav>
		</section>
	);
};

export default Users;
