import {Container} from "inversify";

import SERVICE_IDENTIFIERS from "./ServiceIdentifiers";

import ITransactionEventService from "../common/services/RequestHistory/ITransactionEventService";
import TransactionEventService from "../business/services/TransactionEventService/TransactionEventService";

const container = new Container();

container.bind<ITransactionEventService>(SERVICE_IDENTIFIERS.TRANSACTION_EVENT_SERVICE).to(TransactionEventService);

export default container;