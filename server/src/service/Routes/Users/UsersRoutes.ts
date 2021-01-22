import { Express } from "express";
import { Logger } from "winston";
import axios from "axios";
import IConfig from "../../../common/models/IConfig";
import handleCancellation from "../../../common/helpers/HandleCancellation";
import IdentityManagementService from "../../../business/services/IdentityManagementService/IdentityManagementService";
import { AuthenticateRequest } from "../../../common/models/IdentityManagementService/Authenticate";
import { NewUserRequest } from "../../../common/models/IdentityManagementService/NewUser";

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
        this.app.post("/users/login", async (req, res) => {
            const requestUrl = this.identityManagementServiceBaseUrl + this.authenticatePath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const authenticateRequest = new AuthenticateRequest(
                    requestUrl, req.body.username, req.body.password);

                const response = await this.identityManagementService.authenticate(
                    authenticateRequest, cancellationTokenSource.token);

                res.json(response);
            }
            catch(error) {
                if (error.stack) {
                    const message = `Error Authenticating User: ${req.body.username}`;
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Register
        this.app.post("/users/register", async (req, res) => {
            const requestUrl = this.identityManagementServiceBaseUrl + this.newUserPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const newUserRequest = new NewUserRequest(requestUrl, req.body);

                const response = await this.identityManagementService.newUser(
                    newUserRequest, cancellationTokenSource.token);

                res.json(response);
            }
            catch(error) {
                if (error.stack) {
                    const message = `Error Registering New User: ${req.body.username}`;
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        })
    }
}

export default UsersRoutes;