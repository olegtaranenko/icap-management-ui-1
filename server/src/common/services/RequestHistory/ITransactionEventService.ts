import { Logger } from "winston";
import GetTransactionsRequest from "../../models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import GetTransactionsResponse from "../../models/TransactionEventService/GetTransactions/GetTransactionsResponse";
import GetTransactionDetailsRequest from "../../models/TransactionEventService/GetTransactionDetails/GetTransactionDetailsRequest";
// import GetTransactionDetailsResponse from "../../models/TransactionEventService/GetTransactionDetails/GetTransactionDetailsResponse";

export default interface ITransactionEventService {
    logger: Logger,
    getTransactions: (request: GetTransactionsRequest) => Promise<GetTransactionsResponse>,
    getTransactionDetails: (request: GetTransactionDetailsRequest) => Promise<string> // TODO add GetTransactionDetailsRequest and GetTransactionDetailsResponse
}

