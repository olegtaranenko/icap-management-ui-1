import { inject } from "inversify"
import SERVICE_IDENTIFIERS from "../ServiceIdentifiers";
import { Express } from "express";
import { Logger } from "winston";
import TransactionEventService from "../../business/services/TransactionEventService/TransactionEventService";
import GetTransactionsRequest from "../../common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import IConfig from "../../common/models/IConfig";

export default class RequestHistory {
    @inject(SERVICE_IDENTIFIERS.TRANSACTION_EVENT_SERVICE) static _transactionEventService: TransactionEventService;

    static setupRequestHistory(config: IConfig, app: Express, logger: Logger) {
        const transactionEventServiceBaseUrl = config.transactionEventServiceBaseUrl;
        const getTransactionsPath = config.getTransactionsPath;

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
    }
}




// const setupRequestHistory = (config: IConfig, app: Express, logger: Logger) => {
//     const transactionEventServiceBaseUrl = config.transactionEventServiceBaseUrl;

//     // tslint:disable-next-line
//     @inject(SERVICE_IDENTIFIERS.TRANSACTION_EVENT_SERVICE) const transactionEventService: TransactionEventService;
//     // const transactionEventService = new TransactionEventService(logger);
//     const getTransactionsPath = config.getTransactionsPath;

//     app.post("/request-history/transactions", async (req, res) => {
//         const requestUrl = transactionEventServiceBaseUrl + getTransactionsPath;

//         try {
//             const transactionRequest = new GetTransactionsRequest(requestUrl, req.body);

//             const transactions = await transactionEventService.getTransactions(transactionRequest);

//             res.json(transactions);
//         }
//         catch (error) {
//             logger.error("Error Retrieving Transactions: " + error.stack);
//         }
//     });
// };

// export default setupRequestHistory;