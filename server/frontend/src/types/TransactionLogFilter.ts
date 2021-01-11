import { Risk } from "../../../src/common/models/enums/Risk";

export interface TransactionLogFilter {
    id: string,
    isChecked: boolean,
    title?: string,
    filterName?: string,
    type?: string,
    titleColor?: string,
    fileTypeEnum?: number,
    riskEnum?: Risk
}

export interface TransactionLogFilters {
    id: string,
    filterName: string,
    checkboxList: TransactionLogFilter[]
}