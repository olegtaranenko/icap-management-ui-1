import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import { AuthenticateRequest, AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";
import { NewUserRequest, NewUserResponse } from "../../../common/models/IdentityManagementService/NewUser";

export default class IdentityManagementApi {
    static authenticate = async (
        request: AuthenticateRequest,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<AuthenticateResponse> => {

        const body = {
            username: request.username,
            password: request.password
        };

        const response = await axios.post(
            request.url,
            JSON.stringify(body),
            {
                headers,
                cancelToken: cancellationToken
            }
        );

        if (response.statusText !== "OK") {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static newUser = async (
        request: NewUserRequest,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<NewUserResponse> => {

        const body = {
            firstName: request.newUser.firstName,
            lastName: request.newUser.lastName,
            username: request.newUser.username,
            email: request.newUser.email
        };

        const response = await axios.post(
            request.url,
            JSON.stringify(body),
            {
                headers,
                cancelToken: cancellationToken
            }
        );

        if (response.statusText !== "OK") {
            throw new Error(response.statusText);
        }

        return response.data;
    }
}