import React from "react";

import classes from "./RequestHistory.module.scss";

const RequestHistory = () => {
	return (
		<div className={classes.RequestHistory}>
			<div className={classes.table}>
				<div className={classes.tr}>
					<div className={classes.th}>
						<p>Timestamp</p>
						<p>File ID</p>
						<p>Filename</p>
						<p>Outcome</p>
					</div>
				</div>
				{/*{userFields}*/}
			</div>
		</div>
	);
};

export default RequestHistory;
