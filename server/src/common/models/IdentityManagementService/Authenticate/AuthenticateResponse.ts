import { Guid } from "guid-typescript";

export class AuthenticateResponse {
    id: Guid;
    username: string;
    firstName: string;
    lastName: string;
}