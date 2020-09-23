import React from "react";

import classes from "./FileInfo.module.scss";

const FileInfo = ({ row }) => {
	return (
		<>
			<p className={classes.head}>
				Timestamp
				<span>{row.timestamp}</span>
			</p>
			<p className={classes.head}>
				URL <span>{row.url}</span>
			</p>
			<p className={classes.head}>
				HOST <span>{row.host}</span>
			</p>
			<p className={classes.head}>
				Client Address <span>{row.clientAddress}</span>
			</p>
			<p className={classes.head}>
				Proxy Address <span>{row.proxyAddress}</span>
			</p>
			<p className={classes.head}>
				Analysis Report
				<span>
					<a href={row.report}>Download</a>
				</span>
			</p>
			<p className={classes.head}>
				Request Time <span>{row.reqTime}</span>
			</p>
			<p className={classes.head}>
				Rebuild Time <span>{row.rebTime}</span>
			</p>
		</>
	);
};

export default FileInfo;
