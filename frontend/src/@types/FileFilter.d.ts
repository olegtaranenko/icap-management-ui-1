import { TransactionLogFilter } from "./TransactionLogFilter";

export interface FileFilters {
    id: string,
    filterName: string,
    checkboxList: Array<TransactionLogFilter>
};