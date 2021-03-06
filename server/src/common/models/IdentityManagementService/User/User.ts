import { UserStatus } from "../../enums/UserStatus";
import { ArgumentNullException } from "../../errors/errors";
import NewUser from "../NewUser/NewUser";

export default class User extends NewUser {
    id: string;
    status?: UserStatus;
    token?: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        status?: UserStatus,
        token?: string
    ) {
        super(firstName, lastName, username, email);

        if (!id) {
            throw new ArgumentNullException("id");
        }
        this.id = id;
        this.status = status;
        this.token = token;
    }
}