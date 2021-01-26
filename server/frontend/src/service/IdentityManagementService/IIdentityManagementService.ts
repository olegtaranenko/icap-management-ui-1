import { CancelToken } from "axios";
import { AuthenticateResponse } from "../../../../src/common/models/IdentityManagementService/Authenticate";
import { ForgotPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { NewUserResponse } from "../../../../src/common/models/IdentityManagementService/NewUser";
import { ValidateResetTokenResponse } from "../../../../src/common/models/IdentityManagementService/ValidateResetToken";

export default interface IIdentityManagmentService {
    login: () => AuthenticateResponse;
    register: () => NewUserResponse;
    forgotPassword: () => ForgotPasswordResponse;
    confirm: (token: string, cancellationToken: CancelToken) => Promise<ValidateResetTokenResponse>;

}