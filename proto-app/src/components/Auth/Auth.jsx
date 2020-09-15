import React, { useState } from "react";
import classes from "./Auth.module.scss";
import Login from "./Login/Login";
import PassReminder from "./PassReminder/PassReminder";

const Auth = ({ closePageHandler }) => {
	//const [isLogin, setIsLogin] = useState(true);
	const [isLogin, setIsLogin] = useState(false);

	const loginHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	return (
		<section className={classes.Auth}>
			{isLogin ? (
				<Login
					onLoginHandler={loginHandler}
					onCloseAction={closePageHandler}
				/>
			) : (
				<PassReminder onLoginHandler={loginHandler} />
			)}
		</section>
	);
};

export default Auth;
