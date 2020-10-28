import { Logger } from "winston";
import ITransactionEventService from "../../../common/services/ITransactionEventService";
import { GetTransactionsRequest, GetTransactionsResponse } from "../../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "../../../common/models/TransactionEventService/GetTransactionDetails";
import TransactionEventApi from "../../../common/http/TransactionEventApi/TransactionEventApi";

class TransactionEventService implements ITransactionEventService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    getTransactions = async (request: GetTransactionsRequest) => {
        let transactions: GetTransactionsResponse;

        try {
            this.logger.info("Retrieving Transactions from the TransactionEventService");

            const transactionsResponse = await TransactionEventApi.getTransactions(request.url, request.body);
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

    getTransactionDetails = async (request: GetTransactionDetailsRequest) => {
        let transactionDetails: GetTransactionDetailsResponse;

        try {
            this.logger.info(`Retrieving Transaction Details from the TransactionEventService - Directory: ${request.transactionFileDirectory}`);

            const response = await TransactionEventApi.getTransactionDetails(request.url, request.transactionFileDirectory);
            const responseJSON = JSON.parse(response);
            transactionDetails = new GetTransactionDetailsResponse(responseJSON.status, responseJSON.analysisReport);

            if (transactionDetails) {
                this.logger.info(`Retrieved Transaction Details from file: ${request.transactionFileDirectory}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Transaction Details from file: ${request.transactionFileDirectory}`);
        }

        return transactionDetails;
    }
}

export default TransactionEventService;