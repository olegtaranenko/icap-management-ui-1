import React, { useState } from "react";

import classes from "./ChangePassword.module.scss";

import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const ChangePassword = ({ closeModal }) => {
	const [passValue, setPassValue] = useState("");
	const [newPassValue, setNewPassValue] = useState("");
	const [confirmNewPassValue, setConfirmNewPassValue] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		closeModal();
		console.log(evt.target);
	};

	return (
		<section className={classes.ChangePassword}>
			<Modal externalStyles={classes.modal} onCloseHandler={closeModal}>
				<div className={classes.header}>
					<h2>Change Password</h2>
				</div>
				<form onSubmit={submitHandler}>
					<Input
						label="Current Password"
						type="password"
						name="currentPassword"
						externalStyles={classes.input}
						autofocus
						value={passValue}
						onChange={(evt) => {
							setPassValue(evt.target.value);
						}}
					/>
					<Input
						label="New Password"
						type="password"
						name="newPassword"
						externalStyles={classes.input}
						value={newPassValue}
						onChange={(evt) => {
							setNewPassValue(evt.target.value);
						}}
					/>
					<Input
						label="Confirm New Password"
						type="password"
						name="confirmNewPassword"
						externalStyles={classes.input}
						value={confirmNewPassValue}
						onChange={(evt) => {
							setConfirmNewPassValue(evt.target.value);
						}}
					/>
					<Button buttonType="submit" externalStyles={classes.button}>
						Save
					</Button>
				</form>
				<div className={classes.footer}></div>
			</Modal>
		</section>
	);
};

export default ChangePassword;
