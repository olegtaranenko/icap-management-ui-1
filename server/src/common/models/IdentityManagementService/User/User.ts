import { UserStatus } from "../../enums/UserStatus";

export default class User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    status: UserStatus;
}