import React, { useState } from "react";

import classes from "./User.module.scss";
import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";

import { ReactComponent as PadlockBodyIcon } from "../../../assets/padlock-body.svg";

import { ReactComponent as PadlockBarIcon } from "../../../assets/padlock-bar.svg";
import { ReactComponent as PadlockLockedIcon } from "../../../assets/padlock-body-locked.svg";

const User = ({ name, email, groupList }) => {
	const [userName, setUserName] = useState(name);
	const [padlockOpen, setPadlockOpen] = useState(false);

	const changeInput = (name) => {
		setUserName(name);
	};

	const options = groupList.map((g, i) => {
		return <option key={g + i}>{g}</option>;
	});

	let padlock = (
		<div className={classes.padlockClose}>
			<PadlockBarIcon />
			<PadlockLockedIcon onClick={() => setPadlockOpen(true)} />
		</div>
	);
	if (padlockOpen) {
		padlock = (
			<div className={classes.padlockOpen}>
				<PadlockBarIcon />
				<PadlockBodyIcon onClick={() => setPadlockOpen(false)} />
			</div>
		);
	}

	return (
		<tr className={classes.user}>
			<td>
				<input
					type="text"
					value={userName}
					onChange={(evt) => changeInput(evt.target.value)}
				/>
			</td>
			<td>{email}</td>
			<td>
				<select>{options}</select>
			</td>
			<td>
				<TickIcon stroke="#73AE6F" />
				{padlock}
				<DeleteIcon stroke="#D69598" />
			</td>
		</tr>
	);
};

export default User;
