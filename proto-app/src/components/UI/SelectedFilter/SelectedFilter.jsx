import React from "react";

import classes from "./SelectedFilter.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

const SelectedFilter = ({ id, filter, value, remove }) => {
	return (
		<div className={classes.SelectedFilter}>
			<div className={classes.header}>
				<h3>{filter}</h3>
				<ButtonClose
					color={"#b6bfc9"}
					externalStyles={classes.buttonClose}
					onButtonClick={() => remove({ id, filter })}
				/>
			</div>
			<div className={classes.footer}>{value}</div>
		</div>
	);
};

export default SelectedFilter;
