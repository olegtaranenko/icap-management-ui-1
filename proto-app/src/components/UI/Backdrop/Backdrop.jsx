import React from "react";

import classes from "./Backdrop.module.scss";

const Backdrop = ({ onClickOutside }) => (
	<div className={classes.Backdrop} onClick={onClickOutside}></div>
);

export default Backdrop;
