import React from "react";

import classes from "./UserList.module.scss";
import UsersIcon from "../../assets/users-icon-selected.svg";

import User from "./User/User";

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

const UserList = () => {
	const userList = users.map((u) => {
		return (
			<User key={u.id} name={u.name} email={u.email} groupList={groups} />
		);
	});
	return (
		<section className={classes.wrap}>
			<div className={classes.title}>
				<img src={UsersIcon} alt="Users icons" />
				<p>Users</p>
			</div>
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
		</section>
	);
};

export default UserList;
