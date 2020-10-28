import { Express } from "express";
import { Logger } from "winston";
import TransactionEventService from "../../business/services/TransactionEventService/TransactionEventService";
import { GetTransactionsRequest } from "../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest } from "../../common/models/TransactionEventService/GetTransactionDetails";
import IConfig from "../../common/models/IConfig";

const setupRequestHistory = (config: IConfig, app: Express, logger: Logger) => {
    const transactionEventServiceBaseUrl = config.transactionEventServiceBaseUrl;
    const getTransactionsPath = config.getTransactionsPath;
    const getTransactionDetailsPath = config.getTransactionDetailsPath;

    const transactionEventService = new TransactionEventService(logger);

    app.post("/request-history/transactions", async (req, res) => {
        const requestUrl = transactionEventServiceBaseUrl + getTransactionsPath;

        try {
            const transactionRequest = new GetTransactionsRequest(requestUrl, req.body);

            const transactions = await transactionEventService.getTransactions(transactionRequest);

            res.json(transactions);
        }
        catch (error) {
            logger.error("Error Retrieving Transactions: " + error.stack);
        }
    });

    app.get("/request-history/transactionDetails/:transactionFilePath", async (req, res) => {
        const requestUrl = transactionEventServiceBaseUrl + getTransactionDetailsPath;

        try {
            const transactionDetailsRequest = new GetTransactionDetailsRequest(requestUrl, req.params.transactionFilePath);

            const transactionDetails = await transactionEventService.getTransactionDetails(transactionDetailsRequest);

            res.json(transactionDetails);
        }
        catch (error) {
            const message = `Error Retrieving Transaction Details for file: ${req.params.transactionFilePath} `
            logger.error(message + error.stack);
            res.status(500).json(message);
        }
    });
};

export default setupRequestHistory;