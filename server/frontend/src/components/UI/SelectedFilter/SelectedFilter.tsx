import React from "react";

import classes from "./SelectedFilter.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

export interface SelectedFilterProps {
	id: string,
	filter: string,
	value: string,
	titleColor?: string,
	remove: Function
}

const SelectedFilter = (props: SelectedFilterProps) => {
	const clsFooter = [classes.footer];

	if (props.filter === "Outcome") {
		clsFooter.push(classes.outcome);
	}

	return (
		<div className={classes.SelectedFilter}>
			<div className={classes.header}>
				<h3>{props.filter}</h3>
				<ButtonClose
					color={"#b6bfc9"}
					externalStyles={classes.buttonClose}
					onButtonClick={() => props.remove({id: props.id, filter: props.filter})}
				/>
			</div>
			<div className={clsFooter.join(" ")}>
				<span style={{ backgroundColor: props.titleColor }}>{props.value}</span>
			</div>
		</div>
	);
};

export default SelectedFilter;
