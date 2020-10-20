import { Express } from "express";
import { Logger } from "winston";
import TransactionEventService from "../../business/services/TransactionEventService/TransactionEventService";
import GetTransactionsRequest from "../../common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";

const setupRequestHistory = (app: Express, logger: Logger) => {
    const transactionEventServiceBaseUrl = process.env.TRANSACTION_EVENT_SERVICE_BASE_URL;
    const getTransactionsPath = process.env.TRANSACTION_EVENT_SERVICE_GET_TRANSACTIONS_PATH;
    const transactionEventService = new TransactionEventService(logger);

    app.post("/request-history/transactions", async(req, res) => {
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
};

export default setupRequestHistory;