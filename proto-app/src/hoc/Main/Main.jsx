import React from "react";
import styles from "./Main.module.scss";

const Main = ({ title, showTitle, children, expanded }) => {
	if (showTitle && (title === undefined || title === null)) {
		console.error(
			"showTitle is set to true, but no title was supplied to <Main>."
		);
	}
	return (
		<>
			{showTitle && (
				<h1
					className={`${styles.pageHeading} ${
						expanded ? styles.expanded : ""
					}`}
				>
					{title}
				</h1>
			)}

			<div
				className={`${styles.main} ${expanded ? styles.expanded : ""} ${
					showTitle ? styles.showTitle : ""
				}`}
			>
				<div className={styles.content}>{children}</div>
			</div>
		</>
	);
};

export default Main;
