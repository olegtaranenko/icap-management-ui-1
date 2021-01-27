import { AuthenticateResponse } from "../../../../src/common/models/IdentityManagementService/Authenticate";
import { ForgotPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { NewUserResponse } from "../../../../src/common/models/IdentityManagementService/NewUser";
import { ValidateResetTokenResponse } from "../../../../src/common/models/IdentityManagementService/ValidateResetToken";
import IIdentityManagmentService from "./IIdentityManagementService";
import { CancelToken } from "axios";
import Routes, { IRoutes } from "../../Routes";
import axiosRequestHelper from "../../helpers/axiosRequestHelper";
import { ResetPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ResetPassword";

export default class IdentityManagementService implements IIdentityManagmentService {
    routes: IRoutes["usersRoutes"];

    constructor() {
        this.routes = new Routes().usersRoutes;
    }

    login: () => Promise<AuthenticateResponse>;
    register: () => Promise<NewUserResponse>;
    forgotPassword: () => Promise<ForgotPasswordResponse>;

    confirm = async (token: string, cancellationToken: CancelToken) => {
        const response = await axiosRequestHelper(
            this.routes.validateResetToken, "POST", { token }, cancellationToken);

        const confirmResponse = new ValidateResetTokenResponse(response.message);

        return confirmResponse;
    }

    resetPassword = async (token: string, password: string, cancellationToken: CancelToken) => {
        const response = await axiosRequestHelper(
            this.routes.resetPassword, "POST", { token, password }, cancellationToken);

        const resetResponse = new ResetPasswordResponse(response.message);

        return resetResponse;
    }
}