import { Logger } from "winston";
import { GetTransactionsRequest, GetTransactionsResponse } from "../../models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "../../models/TransactionEventService/GetTransactionDetails";

export default interface ITransactionEventService {
    logger: Logger,
    getTransactions: (request: GetTransactionsRequest) => Promise<GetTransactionsResponse>,
    getTransactionDetails: (request: GetTransactionDetailsRequest) => Promise<GetTransactionDetailsResponse>
}

