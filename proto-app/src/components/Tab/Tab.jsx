import React from "react";
import classes from "./Tab.module.scss";

const Tab = ({ isSelected, children }) => {
	if (isSelected) {
		return <div className={classes.Tab}>{children}</div>;
	} else {
		return null;
	}
};

export default Tab;
