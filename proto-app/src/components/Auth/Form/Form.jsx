import React, { useState } from "react";
import Button from "../../UI/Button/Button";

import classes from "./Form.module.scss";
import iconUser from "../../../assets/user-icon.svg";
import iconPass from "../../../assets/password-icon.svg";

const Form = () => {
	const [emailValue, setEmailValue] = useState("");
	const [passValue, setPassValue] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		console.log("Submitted");
	};
	return (
		<section className={classes.form}>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="email" />
					<input
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
				</div>
				<div>
					<label htmlFor="password" />
					<input
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
				</div>
				<p className={classes.linkTerms}>
					By logging in your agree to the &nbsp;
					<a href="#">terms of use</a>
				</p>
				<Button btnType={"submit"}>Log In</Button>
			</form>
			<p className={classes.rePassLink}>
				<a href="#">Forgotten your password?</a>
			</p>
		</section>
	);
};

export default Form;
