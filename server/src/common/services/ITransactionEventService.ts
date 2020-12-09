import { Logger } from "winston";
import { GetTransactionsRequest, GetTransactionsResponse } from "../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "../../common/models/TransactionEventService/GetTransactionDetails";
import { CancelToken } from "axios";

export default interface ITransactionEventService {
    logger: Logger,
    getTransactions: (request: GetTransactionsRequest, cancellationToken: CancelToken) => Promise<GetTransactionsResponse>,
    getTransactionDetails: (request: GetTransactionDetailsRequest, cancellationToken: CancelToken) => Promise<GetTransactionDetailsResponse>
}