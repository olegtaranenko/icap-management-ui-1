import { Logger } from "winston";
import { GetTransactionsRequest, GetTransactionsResponse } from "../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "../../common/models/TransactionEventService/GetTransactionDetails";

export default interface ITransactionEventService {
    logger: Logger,
    getTransactions: (request: GetTransactionsRequest) => Promise<GetTransactionsResponse>,
    getTransactionDetails: (request: GetTransactionDetailsRequest) => Promise<GetTransactionDetailsResponse>
}