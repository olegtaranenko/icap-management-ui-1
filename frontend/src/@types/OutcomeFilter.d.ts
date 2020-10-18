import { TransactionLogFilter } from "./TransactionLogFilter";

export interface OutcomeFilter extends TransactionLogFilter {
    titleColor?: string,
};

export interface OutcomeFilters {
    id: string,
    filterName: string,
    checkboxList: Array<OutcomeFilter>
};