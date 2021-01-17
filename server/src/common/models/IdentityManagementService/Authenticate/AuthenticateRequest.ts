import validatePassword from "../ValidatePassword";
import ArgumentNullException from "../../errors/ArgumentNullException";

export class AuthenticateRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        if (!username) {
            throw new ArgumentNullException("username");
        }

        validatePassword(password);
    }
}