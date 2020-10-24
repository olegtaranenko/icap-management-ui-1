import { Logger } from "winston";
import GetTransactionsRequest from "../../models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import GetTransactionsResponse from "../../models/TransactionEventService/GetTransactions/GetTransactionsResponse";

export default interface ITransactionEventService {
    logger: Logger,
    getTransactions: (request: GetTransactionsRequest) => Promise<GetTransactionsResponse>
}

