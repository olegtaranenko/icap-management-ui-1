import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";

import classes from "./Login.module.scss";
import iconUser from "../../../assets/user-icon.svg";
import iconPass from "../../../assets/password-icon.svg";
import Input from "../../UI/Input/Input";

const Login = ({ onLoginHandler }) => {
	const [emailValue, setEmailValue] = useState("");
	const [passValue, setPassValue] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		console.log("Submitted");
	};
	return (
		<section className={classes.login}>
			<GlasswallLogo className={classes.logo} />
			<div className={classes.wrapForm}>
				<form onSubmit={submitHandler}>
					<Input
						type="email"
						name="email"
						placeholder="Email address"
						style={{
							backgroundImage: `url(${iconUser})`,
						}}
						value={emailValue}
						onChange={(evt) => {
							setEmailValue(evt.target.value);
						}}
					/>
					<Input
						type="password"
						name="password"
						placeholder="Password"
						style={{
							backgroundImage: `url(${iconPass})`,
						}}
						value={passValue}
						onChange={(evt) => {
							setPassValue(evt.target.value);
						}}
					/>
					<p className={classes.linkTerms}>
						By logging in your agree to the &nbsp;
						<a href="#">terms of use</a>
					</p>
					<Button buttonType={"submit"}>Log In</Button>
				</form>
				<p className={classes.rePassLink}>
					<a href="#" onClick={onLoginHandler}>
						Forgotten your password?
					</a>
				</p>
			</div>
		</section>
	);
};

export default Login;
