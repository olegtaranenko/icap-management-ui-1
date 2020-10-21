import ITransactionEventService from "../../../common/services/ITransactionEventService";
import TransactionEventApi from "../../../common/http/TransactionEventApi/TransactionEventApi";
import { Logger } from "winston";
import GetTransactionsRequest from "../../../common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import GetTransactionsResponse from "../../../common/models/TransactionEventService/GetTransactions/GetTransactionsResponse";

class TransactionEventService implements ITransactionEventService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    getTransactions = async (request: GetTransactionsRequest) => {
        let transactions: GetTransactionsResponse;

        try {
            this.logger.info("Retrieving Transactions from the TransactionEventService");

            const transactionsResponse = await TransactionEventApi.getTransactions(request.url,  request.body);
            const responseJSON = JSON.parse(transactionsResponse);
            transactions = new GetTransactionsResponse(responseJSON.count, responseJSON.files);

            if (transactions) {
                this.logger.info(`Retrieved ${transactions.count} Transactions: ${transactionsResponse}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Transactions: ${error} ${error.stack !== undefined ? error.stack : ""}`);
        }

        return transactions;
    };
}

export default TransactionEventService;