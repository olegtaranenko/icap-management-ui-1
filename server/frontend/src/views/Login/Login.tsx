import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth/auth-context";

import classes from "./Login.module.scss";

import iconUser from "../../assets/user-icon.svg";
import iconPass from "../../assets/password-icon.svg";

import Button from "../../components/UI/Button/Button";
import GlasswallLogo from "../../components/GlasswallLogo/GlasswallLogo";
import Input from "../../components/UI/Input/Input";

const Login = () => {
	const { login } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login();
	};

	return (
		<section className={classes.login}>
			<GlasswallLogo className={classes.logo} />
			<div className={classes.loginContainer}>
				<form onSubmit={submitHandler}>
					<Input
						data-test-id="inputEmail"
						type="email"
						name="email"
						placeholder="Email address"
						style={{
							backgroundImage: `url(${iconUser})`,
						}}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setEmail(event.currentTarget.value);
						}} />

					<Input
						data-test-id="inputPassword"
						type="password"
						name="password"
						placeholder="Password"
						style={{
							backgroundImage: `url(${iconPass})`,
						}}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setPassword(event.currentTarget.value);
						}} />

					<p className={classes.linkTerms}>
						By logging in your agree to the &nbsp;
						<a href="/">terms of use</a>
					</p>

					<Button data-test-id="buttonLogin" buttonType={"submit"}>Log In</Button>
				</form>
				<p className={classes.rePassLink}>
					<Link data-test-id="linkForgottenPassword" to={"/pass-reminder"}>Forgotten password?</Link>
				</p>
			</div>
		</section>
	);
};

export default Login;
