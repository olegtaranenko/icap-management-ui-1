import { FileFilters } from "../../@types/FileFilter";
import { OutcomeFilters } from "../../@types/OutcomeFilter";

export interface GlobalStore {
    title: String,
    fileFilter: Array<FileFilters>,
    outcomeFilter: Array<OutcomeFilters>,
    selectedFilters: Array<any>,
    userfiles: Array<any>,
    navExpanded: boolean,
    changePageTitleHandler: Function,
    addFilterCheckbox: Function,
    addFilterInput: Function,
    removeFilter: Function,
    toggleNavExpanded: Function
};

