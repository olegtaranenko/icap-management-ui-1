import { Express } from "express";
import { Logger } from "winston";
import axios from "axios";
import IConfig from "../../../common/models/IConfig";
import handleCancellation from "../../../common/helpers/HandleCancellation";
import handleError from "../../../common/helpers/HandleError";
import IdentityManagementService from "../../../business/services/IdentityManagementService/IdentityManagementService";
import { AuthenticateRequest } from "../../../common/models/IdentityManagementService/Authenticate";
import { NewUserRequest } from "../../../common/models/IdentityManagementService/NewUser";
import { ForgotPasswordRequest } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordRequest";
import { ValidateResetTokenRequest } from "../../../common/models/IdentityManagementService/ValidateResetToken";

class UsersRoutes {
    cancellationMessage: string = "Request Cancelled by the Client";

    identityManagementServiceBaseUrl: string;
    authenticatePath: string;
    newUserPath: string;
    forgotPasswordPath: string;
    validateResetTokenPath: string;
    resetPasswordPath: string;
    getUsersPath: string;
    getUserPath: string;
    updateUserPath: string;
    deleteUserPath: string;

    identityManagementService: IdentityManagementService;

    app: Express;
    logger: Logger;

    constructor(config: IConfig, app: Express, logger: Logger) {
        this.identityManagementServiceBaseUrl = config.identityManagement.identityManagementServiceBaseUrl;
        this.authenticatePath = config.identityManagement.authenticatePath;
        this.newUserPath = config.identityManagement.newUserPath;
        this.forgotPasswordPath = config.identityManagement.forgotPasswordPath;
        this.validateResetTokenPath = config.identityManagement.validateResetTokenPath;
        this.resetPasswordPath = config.identityManagement.resetPasswordPath;
        this.getUsersPath = config.identityManagement.getUsersPath;
        this.getUserPath = config.identityManagement.getUserPath;
        this.updateUserPath = config.identityManagement.updateUserPath;
        this.deleteUserPath = config.identityManagement.deleteUserPath;
        this.identityManagementService = new IdentityManagementService(logger);
        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        // Login
        this.app.post("/login", async (req, res) => {
            const requestUrl = this.identityManagementServiceBaseUrl + this.authenticatePath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage, this.logger);

            try {
                const authenticateRequest = new AuthenticateRequest(
                    requestUrl, req.body.username, req.body.password);

                const response = await this.identityManagementService.authenticate(
                    authenticateRequest, cancellationTokenSource.token);

                res.json(response);
            }
            catch (error) {
                handleError(
                    res,
                    500,
                    error,
                    `Error Authenticating User: ${req.body.username}`,
                    this.logger);
            }
        });

        // Register
        this.app.post("/register", async (req, res) => {
            const requestUrl = this.identityManagementServiceBaseUrl + this.newUserPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage, this.logger);

            try {
                const newUserRequest = new NewUserRequest(requestUrl, req.body);

                const response = await this.identityManagementService.newUser(
                    newUserRequest, cancellationTokenSource.token);

                res.json(response);
            }
            catch (error) {
                handleError(
                    res,
                    500,
                    error,
                    `Error Registering New User: ${req.body.username}`,
                    this.logger);
            }
        });

        // Forgot Password
        this.app.post("/forgot-password", async (req, res) => {
            const requestUrl = this.identityManagementServiceBaseUrl + this.forgotPasswordPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage, this.logger);

            try {
                const forgotPasswordRequest = new ForgotPasswordRequest(requestUrl, req.body.username);

                const response = await this.identityManagementService.forgotPassword(
                    forgotPasswordRequest, cancellationTokenSource.token);

                res.json(response);
            }
            catch (error) {
                handleError(
                    res,
                    500,
                    error,
                    `Error in Forgot Password for User: ${req.body.username}`,
                    this.logger);
            }
        });

        // Validate Reset Token
        this.app.post("/validate-reset-token", async (req, res) => {


            res.json({message: "yay"});

            // const requestUrl = this.identityManagementServiceBaseUrl + this.validateResetTokenPath;

            // const cancellationTokenSource = axios.CancelToken.source();
            // handleCancellation(req, cancellationTokenSource, this.cancellationMessage, this.logger);

            // try {
            //     const validateResetTokenRequest = new ValidateResetTokenRequest(requestUrl, req.body.token);

            //     const response = await this.identityManagementService.validateResetToken(
            //         validateResetTokenRequest, cancellationTokenSource.token);

            //     res.json(response);
            // }
            // catch (error) {
            //     handleError(res, 500, error, "Error Confirming User", this.logger);
            // }
        });
    }
}

export default UsersRoutes;