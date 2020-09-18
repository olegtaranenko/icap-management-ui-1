import React, { useState } from "react";

import classes from "./UserList.module.scss";
import UsersIcon from "../../assets/users-icon.svg";
import UsersIconSelected from "../../assets/users-icon-selected.svg";
import RolesIcon from "../../assets/roles-icon.svg";
import RolesIconSelected from "../../assets/roles-icon-selected.svg";

import User from "./User/User";
import TabNav from "../TabNav/TabNav";
import Tab from "../Tab/Tab";

const users = [
	{
		name: "Adam2",
		id: "Adam2",
		email: "ahewitt@glasswallsolutions.com",
	},
	{
		name: "Tim1",
		id: "Tim1",
		email: "ahewitt@glasswallsolutions.com",
	},
	{
		name: "Elly5",
		id: "Elly5",
		email: "ahewitt@glasswallsolutions.com",
	},
];

const groups = [
	"Administration Group",
	"Another Group",
	"Another Group",
	"Another Group",
];

const tabs = [
	{ name: "Users", icon: UsersIcon, iconSelected: UsersIconSelected },
	{ name: "Permissions", icon: RolesIcon, iconSelected: RolesIconSelected },
];

const UserList = () => {
	const [selected, setSelected] = useState("Users");

	const userList = users.map((u) => {
		return (
			<User key={u.id} name={u.name} email={u.email} groupList={groups} />
		);
	});
	return (
		<section className={classes.wrap}>
			<TabNav
				tabs={tabs}
				isSelectedTab={selected}
				onSetActiveTabHandler={(tab) => setSelected(tab)}
			>
				<Tab isSelected={selected === "Users"}>
					<div className={classes.userList}>
						<div className={classes.header}>
							<p>Users</p>
							<button>+</button>
						</div>
						<div className={classes.table}>
							<table>
								<tbody>
									<tr>
										<th width="30%">Name</th>
										<th width="30%">Email</th>
										<th width="30%">User Group</th>
										<th>Confirmed Status</th>
									</tr>
									{userList}
								</tbody>
							</table>
						</div>
					</div>
				</Tab>
				<Tab isSelected={selected === "Permissions"}></Tab>
			</TabNav>
		</section>
	);
};

export default UserList;
