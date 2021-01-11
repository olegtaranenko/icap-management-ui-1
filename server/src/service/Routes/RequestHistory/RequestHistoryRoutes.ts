import { Express, Request } from "express";
import { Logger } from "winston";
import axios, { CancelTokenSource } from "axios";
import TransactionEventService from "../../../business/services/TransactionEventService/TransactionEventService";
import { GetTransactionsRequest } from "../../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest } from "../../../common/models/TransactionEventService/GetTransactionDetails";
import IConfig from "../../../common/models/IConfig";

const _handleCancellation = (req: Request, cancellationTokenSource: CancelTokenSource) => {
    req.connection.on("close", () => {
        cancellationTokenSource.cancel("Request Cancelled by the Client");
    });
}

class RequestHistoryRoutes {
    transactionEventServiceBaseUrl: string;
    getTransactionsPath: string;
    getTransactionDetailsPath: string;

    transactionEventService: TransactionEventService;

    app: Express;
    logger: Logger;

    constructor(config: IConfig, app: Express, logger: Logger) {
        this.transactionEventServiceBaseUrl = config.requestHistory.transactionEventServiceBaseUrl;
        this.getTransactionsPath = config.requestHistory.getTransactionsPath;
        this.getTransactionDetailsPath = config.requestHistory.getTransactionDetailsPath;
        this.transactionEventService = new TransactionEventService(logger);
        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        this.app.post("/request-history/transactions", async (req, res) => {
            const requestUrl = this.transactionEventServiceBaseUrl + this.getTransactionsPath;

            const cancellationTokenSource = axios.CancelToken.source();
            _handleCancellation(req, cancellationTokenSource);

            try {
                const transactionRequest = new GetTransactionsRequest(requestUrl, req.body);

                const transactions = await this.transactionEventService.getTransactions(
                    transactionRequest, cancellationTokenSource.token);

                res.json(transactions);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Retrieving Transactions ";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        this.app.get("/request-history/transactionDetails/:transactionFilePath", async (req, res) => {
            const requestUrl = this.transactionEventServiceBaseUrl + this.getTransactionDetailsPath;

            const cancellationTokenSource = axios.CancelToken.source();
            _handleCancellation(req, cancellationTokenSource);

            try {
                const transactionDetailsRequest = new GetTransactionDetailsRequest(requestUrl, req.params.transactionFilePath);

                const transactionDetails = await this.transactionEventService.getTransactionDetails(
                    transactionDetailsRequest, cancellationTokenSource.token);

                res.json(transactionDetails);
            }
            catch (error) {
                if (error.stack) {
                    const message = `Error Retrieving Transaction Details for file: ${req.params.transactionFilePath} `
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });
    }
}

export default RequestHistoryRoutes;