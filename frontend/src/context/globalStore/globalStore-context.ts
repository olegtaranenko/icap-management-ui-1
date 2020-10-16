import { createContext } from "react";

export interface GlobalStore {
	title: String,
	fileFilterList: Array<any>,
	userfiles: Array<any>,
	outcomeFilterList: Array<any>,
	selectedFilters: Array<any>,
	navExpanded: Boolean,
	fileFilter: any,
	outcomeFilter: any,
	changePageTitleHandler: Function,
	addFilterCheckbox: Function,
	addFilterInput: Function,
	removeFilter: Function,
	toggleNavExpanded: Function
};

export const GlobalStoreContext = createContext<Partial<GlobalStore>>({});
