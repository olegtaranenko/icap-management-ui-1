export interface TransactionLogFilter {
    id: string,
    name?: string,
    format?: string,
    isChecked: boolean,
    value?: string,
    filter?: string,
    type?: string,
    titleColor: string
};

export interface TransactionLogFilters {
    id: string,
    filterName: string,
    checkboxList: Array<TransactionLogFilter>
};