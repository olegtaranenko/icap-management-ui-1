import React from "react";
import classes from "./Badge.module.scss";

export interface BadgeProps {
	value: string,
	externalStyles: string
}

const Badge = (props: BadgeProps) => {
	const cls = [classes.Badge, props.externalStyles];
	return <span className={cls.join(" ")}>{props.value}</span>;
};

export default Badge;
