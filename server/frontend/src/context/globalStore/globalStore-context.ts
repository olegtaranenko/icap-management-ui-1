import { createContext } from "react";
import { RequestHistoryTimeFilter } from "../../data/filters/RequestHistory/requestHistoryTimeFilter";

export interface GlobalStoreContextProps {
	title: string,
	userfiles: any[],
	fileFilterList: any[],
	outcomeFilterList: any[],
	requestHistoryTimeFilter: RequestHistoryTimeFilter,
	selectedFilters: any[],
	navExpanded: boolean
}

export const GlobalStoreContext = createContext<Partial<GlobalStoreContextProps>>({});