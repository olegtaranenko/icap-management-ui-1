import { AuthenticateResponse } from "../../../../src/common/models/IdentityManagementService/Authenticate";
import { ForgotPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { NewUserResponse } from "../../../../src/common/models/IdentityManagementService/NewUser";
import { ValidateResetTokenResponse } from "../../../../src/common/models/IdentityManagementService/ValidateResetToken";
import IIdentityManagmentService from "./IIdentityManagementService";
import { CancelToken } from "axios";
import Routes, { IRoutes } from "../../Routes";
import axiosRequestHelper from "../../helpers/axiosRequestHelper";

export default class IdentityManagementService implements IIdentityManagmentService {
    routes: IRoutes["usersRoutes"];

    constructor() {
        this.routes = new Routes().usersRoutes;
    }

    login: () => AuthenticateResponse;
    register: () => NewUserResponse;
    forgotPassword: () => ForgotPasswordResponse;

    confirm = async (token: string, cancellationToken: CancelToken): Promise<ValidateResetTokenResponse> => {
        try {
            const response = await axiosRequestHelper(
                this.routes.validateResetToken, "POST", { token: token }, cancellationToken);

            const confirmResponse = new ValidateResetTokenResponse(response.message);

            return confirmResponse;
        }
        catch (error) {
            console.error(error);
        }
    }
}