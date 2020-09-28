import React from "react";

import styles from "./TitleBar.module.scss";

export interface TitleBarProps {
    title: string
};

const TitleBar = (props: TitleBarProps) => {
    return <header className={styles["title-bar"]}>{props.title}</header>
};

export default TitleBar;