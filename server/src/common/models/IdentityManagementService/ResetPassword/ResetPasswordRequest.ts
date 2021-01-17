import ArgumentException from "../../errors/ArgumentException";
import ArgumentNullException from "../../errors/ArgumentNullException";

export class ResetPasswordRequest {
    url: string;
    token: string;
    password: string;

    constructor(url: string, token: string, password: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!token) {
            throw new ArgumentNullException("token");
        }

        if (!password) {
            throw new ArgumentNullException("password");
        }

        if (password.length < 6) {
            throw new ArgumentException("password", "The new password cannot be less than 6 characters.");
        }

        this.token = token;
        this.password = password;
    }
}