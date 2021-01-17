import { Guid } from "guid-typescript";
import { Logger } from "winston";
import { CancelToken } from "axios";
import { AuthenticateRequest, AuthenticateResponse } from "../models/IdentityManagementService/Authenticate";
import { NewUser, NewUserResponse } from "../models/IdentityManagementService/NewUser";
import { ForgotPasswordRequest } from "../models/IdentityManagementService/ForgotPassword/ForgotPasswordRequest";
import { ForgotPasswordResponse } from "../models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { ValidateResetTokenRequest, ValidateResetTokenResponse } from "../models/IdentityManagementService/ValidateResetToken";
import { ResetPasswordRequest, ResetPasswordResponse } from "../models/IdentityManagementService/ResetPassword";

export default interface IIdentityManagementService {
    logger: Logger,
    authenticate: (request: AuthenticateRequest, cancellationToken: CancelToken) => Promise<AuthenticateResponse>,
    newUser: (request: NewUser, cancellationToken: CancelToken) => Promise<NewUserResponse>,
    forgotPassword: (request: ForgotPasswordRequest, cancellationToken: CancelToken) => Promise<ForgotPasswordResponse>,
    validateResetToken: (request: ValidateResetTokenRequest, cancellationToken: CancelToken) => Promise<ValidateResetTokenResponse>,
    resetPassword: (request: ResetPasswordRequest, cancellationToken: CancelToken) => Promise<ResetPasswordResponse>
}