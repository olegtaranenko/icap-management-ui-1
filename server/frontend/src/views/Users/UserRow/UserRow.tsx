import React, { ChangeEvent, useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./UserRow.module.scss";

import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";

/*
import { ReactComponent as PadlockBodyIcon } from "../../../assets/padlock-body.svg";
import { ReactComponent as PadlockBarIcon } from "../../../assets/padlock-bar.svg";
import { ReactComponent as PadlockLockedIcon } from "../../../assets/padlock-body-locked.svg";
*/
import Input from "../../../components/UI/Input/Input";
import User from "../../../../../src/common/models/IdentityManagementService/User/User";

export interface UserRowProps {
	user: User
}

const UserRow = (props: UserRowProps) => {
	const [username, setUsername] = useState(props.user.username);

	return (
		<TableRow className={classes.User}>
			<TableCell>
				<Input
					type="text"
					value={username}
					onChange={
						(event: ChangeEvent<HTMLInputElement>) =>
							setUsername(event.target.value)} />
			</TableCell>
			<TableCell>{props.user.email}</TableCell>
			<TableCell>{props.user.status}</TableCell>
			<TableCell>
				<TickIcon stroke="#73AE6F" />
				<DeleteIcon stroke="#D69598" />
			</TableCell>
		</TableRow>
	);
}

export default UserRow;