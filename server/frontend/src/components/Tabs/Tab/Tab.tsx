import React from "react";
import classes from "./Tab.module.scss";

export interface TabProps {
	isSelected: boolean,
	children: React.ReactNode
}

const Tab = (props: TabProps) => {
	if (props.isSelected) {
		return (
			<div className={classes.Tab}>
				<div className={classes.innerContent}>{props.children}</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Tab;
