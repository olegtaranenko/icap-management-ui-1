import React from "react";
import classes from "./Auth.module.scss";

export interface AuthProps { 
	children?: React.ReactNode	
};

const Auth = (props: AuthProps) => {
	return <section className={classes.Auth}>{props.children}</section>;
};

export default Auth;
