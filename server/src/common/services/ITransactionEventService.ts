import { Logger } from "winston";
import TransactionFile from "../models/TransactionEventService/TransactionFile";
import GetTransactionsRequest from "../models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import GetTransactionsResponse from "../../common/models/TransactionEventService/GetTransactions/GetTransactionsResponse";

export default interface ITransactionEventService {
    logger: Logger,
    getTransactions: (request: GetTransactionsRequest) => Promise<GetTransactionsResponse>
}