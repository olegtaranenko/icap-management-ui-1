import { CancelToken } from "axios";
import axiosHelper from "../../helpers/AxiosHelper";
import User from "../../../common/models/IdentityManagementService/User/User";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { NewUserResponse } from "../../../common/models/IdentityManagementService/NewUser";
import NewUser from "../../../common/models/IdentityManagementService/NewUser/NewUser";
import { ValidateResetTokenResponse } from "../../../common/models/IdentityManagementService/ValidateResetToken";
import { ResetPasswordResponse } from "../../../common/models/IdentityManagementService/ResetPassword";

export default class IdentityManagementApi {
    static authenticate = async (
        authenticateUrl: string,
        username: string,
        password: string,
        cancellationToken: CancelToken,
    ): Promise<User> => {
        return await axiosHelper(authenticateUrl, "POST", { username, password }, cancellationToken);
    }

    static newUser = async (
        newUserUrl: string,
        newUser: NewUser,
        cancellationToken: CancelToken
    ): Promise<NewUserResponse> => {
        return await axiosHelper(newUserUrl, "POST", newUser, cancellationToken);
    }

    static forgotPassword = async (
        forgotPasswordUrl: string,
        username: string,
        cancellationToken: CancelToken,
    ): Promise<ForgotPasswordResponse> => {
        return await axiosHelper(forgotPasswordUrl, "POST", { username }, cancellationToken);
    }

    static validateResetToken = async (
        validateResetTokenUrl: string,
        token: string,
        cancellationToken: CancelToken,
    ): Promise<ValidateResetTokenResponse> => {
        return await axiosHelper(validateResetTokenUrl, "POST", { token }, cancellationToken);
    }

    static resetPassword = async (
        resetPasswordUrl: string,
        token: string,
        password: string,
        cancellationToken: CancelToken
    ): Promise<ResetPasswordResponse> => {
        return await axiosHelper(resetPasswordUrl, "POST", { token, password }, cancellationToken);
    }
}