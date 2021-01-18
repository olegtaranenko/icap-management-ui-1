import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import { AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";

export default class IdentityManagementApi {
    static authenticate = async (
        authenticateUrl: string,
        username: string,
        password: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<AuthenticateResponse> => {
        const body = {
            username,
            password
        };

        const response = await axios.post(
            authenticateUrl,
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