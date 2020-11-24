export interface TransactionLogFilter {
    id: string,
    name?: string,
    format?: string,
    isChecked: boolean,
    value?: string,
    filter?: string,
    type?: string,
    titleColor?: string,
    fileTypeEnum?: number,
    riskEnum?: string
}

export interface TransactionLogFilters {
    id: string,
    filterName: string,
    checkboxList: TransactionLogFilter[]
}