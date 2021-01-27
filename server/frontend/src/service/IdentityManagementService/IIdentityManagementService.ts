import { CancelToken } from "axios";
import { AuthenticateResponse } from "../../../../src/common/models/IdentityManagementService/Authenticate";
import { ForgotPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { NewUserResponse } from "../../../../src/common/models/IdentityManagementService/NewUser";
import { ResetPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ResetPassword";
import { ValidateResetTokenResponse } from "../../../../src/common/models/IdentityManagementService/ValidateResetToken";

export default interface IIdentityManagmentService {
    login: () => Promise<AuthenticateResponse>;
    register: () => Promise<NewUserResponse>;
    forgotPassword: () => Promise<ForgotPasswordResponse>;
    confirm: (token: string, cancellationToken: CancelToken) => Promise<ValidateResetTokenResponse>;
    resetPassword: (token: string, password: string, cancellationToken: CancelToken) => Promise<ResetPasswordResponse>;
}