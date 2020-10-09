import React from "react";

function SectionTitle({ context, hasIssues, children } = {}) {
	const classNames = ["section-title"];
	context && classNames.push(context + "-title");
	hasIssues && classNames.push("has-issues");
	return <div className={classNames.join(" ")}>{children}</div>;
}

export default SectionTitle;
