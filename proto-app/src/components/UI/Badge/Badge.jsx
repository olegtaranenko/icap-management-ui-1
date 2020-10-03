import React from "react";

const Badge = ({ value, externalStyles }) => {
	const cls = [classes.Bage, externalStyles];
	return <span className={cls.join(" ")}>{value}</span>;
};

export default Badge;
