import { Guid } from "guid-typescript";
import ArgumentNullException from "../../errors/ArgumentNullException";

export class AuthenticateResponse {
    id: Guid;
    username: string;
    firstName: string;
    lastName: string;
    token: string;

    constructor(id: Guid, username: string, firstName: string, lastName: string, token: string) {
        if (!id) {
            throw new ArgumentNullException("id");
        }

        if (!username) {
            throw new ArgumentNullException("username");
        }

        if (!firstName) {
            throw new ArgumentNullException("firstName");
        }

        if (!lastName) {
            throw new ArgumentNullException("lastName");
        }

        if (!token) {
            throw new ArgumentNullException("token");
        }

        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }
}