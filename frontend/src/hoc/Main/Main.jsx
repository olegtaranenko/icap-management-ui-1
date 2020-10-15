import React, { useContext } from "react";
import styles from "./Main.module.scss";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

const Main = ({ children }) => {
	const { navExpanded } = useContext(GlobalStoreContext);

	return (
		<>
			<div
				className={`${styles.main} ${navExpanded ? styles.expanded : ""}`}>
				<div className={styles.content}>{children}</div>
			</div>
		</>
	);
};

export default Main;
