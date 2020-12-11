import React, { useContext } from "react";
import styles from "./MainTitle.module.scss";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

const MainTitle = () => {
    const { navExpanded, title } = useContext(GlobalStoreContext);

    return (
        <h1
            id="heading"
            className={`${styles.pageHeading} ${navExpanded ? styles.expanded : ""}`}>
            {title}
        </h1>
    );
};

export default MainTitle;
