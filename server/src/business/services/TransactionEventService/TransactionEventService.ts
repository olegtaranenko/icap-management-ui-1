import ITransactionEventService from "../../../common/services/ITransactionEventService";
import TransactionEventApi from "../../../common/http/TransactionEventApi";
import { Logger } from "winston";
import GetTransactionsRequest from "../../../common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import GetTransactionsResponse from "../../../common/models/TransactionEventService/GetTransactions/GetTransactionsResponse";
import ArgumentNullException from "../../../common/models/erros/ArgumentNullException";

class TransactionEventService implements ITransactionEventService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    };

    getTransactions = async (request: GetTransactionsRequest) => {
        if (!request.url) {
            this.logger.error("No Url Supplied",);
            throw new ArgumentNullException("request.url");
        }
        const transactionEventApi = new TransactionEventApi();
        let transactions: GetTransactionsResponse;

        try {
            const transactionsResponse = await transactionEventApi.getTransactions(request.url,  request.body);
            transactions = JSON.parse(transactionsResponse);

            if (transactions) {
                this.logger.log("info", `Retrieved Transactions: ${transactionsResponse}`);
            }
        }
        catch (err) {
            this.logger.error(`Could not get Transactions: ${err} ${err.stack}`);
        }

        return transactions;
    };
};

export default TransactionEventService;