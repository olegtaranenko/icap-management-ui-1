import { TransactionLogFilters } from "../../types/TransactionLogFilter";

export interface GlobalStore {
    title: String,
    fileFilter: Array<TransactionLogFilters>,
    outcomeFilter: Array<TransactionLogFilters>,
    selectedFilters: Array<any>,
    userfiles: Array<any>,
    navExpanded: boolean,
    changePageTitleHandler: Function,
    addFilterCheckbox: Function,
    addFilterInput: Function,
    removeFilter: Function,
    toggleNavExpanded: Function
};

