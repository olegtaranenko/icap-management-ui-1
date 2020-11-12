import { Express } from "express";
import { Logger } from "winston";
import TransactionEventService from "../../../business/services/TransactionEventService/TransactionEventService";
import { GetTransactionsRequest } from "../../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest } from "../../../common/models/TransactionEventService/GetTransactionDetails";
import IConfig from "../../../common/models/IConfig";

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

            try {
                const transactionRequest = new GetTransactionsRequest(requestUrl, req.body, { "Content-Type": "application/json" });

                const transactions = await this.transactionEventService.getTransactions(transactionRequest);

                res.json(transactions);
            }
            catch (error) {
                const message = "Error Retrieving Transactions ";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        this.app.get("/request-history/transactionDetails/:transactionFilePath", async (req, res) => {
            const requestUrl = this.transactionEventServiceBaseUrl + this.getTransactionDetailsPath;

            try {
                const transactionDetailsRequest = new GetTransactionDetailsRequest(requestUrl, req.params.transactionFilePath, { "Content-Type": "application/json" });

                const transactionDetails = await this.transactionEventService.getTransactionDetails(transactionDetailsRequest);

                res.json(transactionDetails);
            }
            catch (error) {
                const message = `Error Retrieving Transaction Details for file: ${req.params.transactionFilePath} `
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });
    }
}

export default RequestHistoryRoutes;