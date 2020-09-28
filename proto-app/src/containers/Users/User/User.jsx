import React, { useState } from "react";

import classes from "./User.module.scss";
import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";

/*
import { ReactComponent as PadlockBodyIcon } from "../../../assets/padlock-body.svg";
import { ReactComponent as PadlockBarIcon } from "../../../assets/padlock-bar.svg";
import { ReactComponent as PadlockLockedIcon } from "../../../assets/padlock-body-locked.svg";
*/
import Input from "../../../components/UI/Input/Input";

const User = ({ name, email, groupList }) => {
	const [userName, setUserName] = useState(name);

	const changeInput = (name) => {
		setUserName(name);
	};

	const options = groupList.map((group, i) => {
		return <option key={group + i}>{group}</option>;
	});

	return (
		<div className={classes.User}>
			<div className={classes.tr}>
				<div className={classes.td}>
					<Input
						type="text"
						value={userName}
						onChange={(evt) => changeInput(evt.target.value)}
					/>
				</div>
				<div className={classes.td}>
					<p>{email}</p>
				</div>
				<div className={classes.td}>
					<select>{options}</select>
				</div>
				<div className={classes.td}>
					<TickIcon stroke="#73AE6F" />
					<div className={classes.padlock} />
					{/*
					<div className={classes.padlock}>{padlockOpen ?
						<div onClick={() => setPadlockOpen(false)} className={classes.open}>
							<PadlockBarIcon />
							<PadlockBodyIcon />
						</div>
						:
						<div className={classes.close} onClick={() => setPadlockOpen(true)}>
							<PadlockBarIcon />
							<PadlockLockedIcon />
						</div>
					}</div>
*/}
					<DeleteIcon stroke="#D69598" />
				</div>
			</div>
		</div>
	);
};

export default User;
