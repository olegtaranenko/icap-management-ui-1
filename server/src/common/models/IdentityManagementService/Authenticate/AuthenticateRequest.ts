import validatePassword from "../ValidatePassword";
import { ArgumentNullException } from "../../errors/errors";

export class AuthenticateRequest {
    url: string;
    username: string;
    password: string;

    constructor(url: string, username: string, password: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!username) {
            throw new ArgumentNullException("username");
        }

        validatePassword(password);
    }
}