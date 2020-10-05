import React from "react";

import classes from "./InfoBlock.module.scss";

const InfoBlock = ({ headline, sum }) => {
	return (
		<div className={classes.InfoBlock}>
			<header>{headline}</header>
			<span>{sum}</span>
		</div>
	);
};

export default InfoBlock;
