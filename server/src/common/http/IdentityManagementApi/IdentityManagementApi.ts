import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";
import { NewUserRequest, NewUserResponse } from "../../../common/models/IdentityManagementService/NewUser";
import User from "../../../common/models/IdentityManagementService/User/User";
import NewUser from "../../../common/models/IdentityManagementService/NewUser/NewUser";
import { ValidateResetTokenResponse } from "src/common/models/IdentityManagementService/ValidateResetToken";

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

    static newUser = async (
        newUserUrl: string,
        newUser: NewUser,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<NewUserResponse> => {

        const body = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            email: newUser.email
        };

        const response = await axios.post(
            newUserUrl,
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

    static forgotPassword = async (
        forgotPasswordUrl: string,
        username: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<ForgotPasswordResponse> => {

        const body = {
            username
        };

        const response = await axios.post(
            forgotPasswordUrl,
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

    static validateResetToken = async (
        validateResetTokenUrl: string,
        token: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<ValidateResetTokenResponse> => {

        const body = {
            token
        };

        const response = await axios.post(
            validateResetTokenUrl,
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