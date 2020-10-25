import { inject } from "inversify"
import SERVICE_IDENTIFIERS from "../ServiceIdentifiers";
import { Express } from "express";
import { Logger } from "winston";
import TransactionEventService from "../../business/services/TransactionEventService/TransactionEventService";
import { GetTransactionsRequest } from "../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest } from "../../common/models/TransactionEventService/GetTransactionDetails";
import IConfig from "../../common/models/IConfig";

class RequestHistory {
    @inject(SERVICE_IDENTIFIERS.TRANSACTION_EVENT_SERVICE) static _transactionEventService: TransactionEventService;

    static setupRequestHistory(config: IConfig, app: Express, logger: Logger) {
        const transactionEventServiceBaseUrl = config.transactionEventServiceBaseUrl;
        const getTransactionsPath = config.getTransactionsPath;
        const getTransactionDetailsPath = config.getTransactionDetailsPath;

        app.post("/request-history/transactions", async (req, res) => {
            const requestUrl = transactionEventServiceBaseUrl + getTransactionsPath;

            try {
                const transactionRequest = new GetTransactionsRequest(requestUrl, req.body);

                const transactions = await this._transactionEventService.getTransactions(transactionRequest);

                res.json(transactions);
            }
            catch (error) {
                logger.error("Error Retrieving Transactions: " + error.stack);
            }
        });

        app.get("/request-history/transactionDetails", async (req, res) => {
            const requestUrl = transactionEventServiceBaseUrl + getTransactionDetailsPath;

            try {
                const transactionDetailsRequest = new GetTransactionDetailsRequest(requestUrl, req.body.transactionFilePath);

                const transactionDetails = await this._transactionEventService.getTransactionDetails(transactionDetailsRequest);

                res.json(transactionDetails);
            }
            catch (error) {
                logger.error(`Error Retrieving Transaction Details for file: ${req.body.transactionFilePath}: ` + error.stack);
            }
        });
    }
}

export default RequestHistory;