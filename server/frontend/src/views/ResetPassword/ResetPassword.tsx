import React, { ChangeEvent, useState } from "react";
import { RouteProps } from "react-router-dom";

import passwordIcon, { ReactComponent as PasswordIcon } from "../../assets/password-icon.svg";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import classes from "./ResetPassword.module.scss";

const ResetPassword = (props: RouteProps) => {
    const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
    const [token] = useState<string>(new URLSearchParams(props.location.search).get("token"));
    const [message, setMessage] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const resetPassword = async () => {
        setStatus("LOADING");

        
    };

    return (
        <div className={classes.wrapper}>
            <h2 className={classes.heading}>
                <PasswordIcon className={classes.icon} viewBox={"0 0 44 44"} />
                New Password
            </h2>

            <p className={classes.message}>
                Please enter a new password in order to login to your account. 
                If you do not set a password now, you can follow the link from the registration email again to get back here.
			</p>

            <form onSubmit={resetPassword}>
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={{
                        backgroundImage: `url(${passwordIcon})`,
                    }}
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }}
                    loading={status === "LOADING"}
                />
                <div className={classes.sendButton}>
                    <Button data-test-id="buttonSendLink" buttonType={"submit"}>Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;