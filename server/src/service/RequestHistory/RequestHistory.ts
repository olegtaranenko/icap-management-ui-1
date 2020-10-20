import { Express } from "express";
import { Logger } from "winston";
import TransactionEventService from "../../business/services/TransactionEventService/TransactionEventService";
import GetTransactionsRequest from "../../common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";

const setupRequestHistory = (app: Express, logger: Logger) => {
    const transactionEventServiceBaseUrl = process.env.TRANSACTION_EVENT_SERVICE_BASE_URL;
    const getTransactionsPath = process.env.TRANSACTION_EVENT_SERVICE_GET_TRANSACTIONS_PATH;
    const transactionEventService = new TransactionEventService(logger);

    app.post("/request-history/transactions", (req, res) => {
        const requestUrl = transactionEventServiceBaseUrl + getTransactionsPath;
        const transactionRequest = new GetTransactionsRequest(requestUrl, req.body);

        const transactions = transactionEventService.getTransactions(transactionRequest);

        res.json(transactions);
    });
};

export default setupRequestHistory;