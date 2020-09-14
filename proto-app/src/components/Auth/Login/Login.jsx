import React from "react";
import classes from "./Login.module.scss";
import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";
import Form from "../Form/Form";

const login = ({ onCloseAction }) => {
	return (
		<section className={classes.login} target="_blank">
			<GlasswallLogo className={classes.logo} />
			<Form />
			<button onClick={onCloseAction}>Close page</button>
		</section>
	);
};

export default login;
