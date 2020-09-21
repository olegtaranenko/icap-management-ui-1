import React from "react";
import classes from "./FileRow.module.scss";

const FileRow = ({
	id,
	timestamp,
	fileId,
	name,
	type,
	outcome,
	onRowClickHandler,
}) => {
	return (
		<div className={classes.FileRow} id={id} onClick={onRowClickHandler}>
			<div id={id}>{timestamp}</div>
			<div id={id}>{fileId}</div>
			<div id={id}>{name}</div>
			<div id={id}>{type}</div>
			<div id={id}>{outcome}</div>
		</div>
	);
};

export default FileRow;
