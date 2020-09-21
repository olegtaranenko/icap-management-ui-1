import React from "react";

import classes from "./DomainField.module.scss";
import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";

import Input from "../../UI/Input/Input";

const DomainField = ({ name, onChangeInputHandler }) => {
	return (
		<div className={classes.DomainField}>
			<div className={classes.td}>
				<Input type="text" value={name} onChange={onChangeInputHandler} />
				<div className={classes.validated}>
					<TickIcon stroke="#73AE6F" />
					<DeleteIcon stroke="#D69598" />
				</div>
			</div>
		</div>
	);
};

export default DomainField;
