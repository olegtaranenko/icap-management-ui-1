import { createContext } from "react";
import { RequestHistoryTimeFilter } from "../../data/filters/RequestHistory/requestHistoryTimeFilter";

export interface GlobalStoreContextProps {
	title: string,
	version: string,
	userfiles: any[],
	fileFilterList: any[],
	riskFilterList: any[],
	requestHistoryTimeFilter: RequestHistoryTimeFilter,
	selectedFilters: any[],
	navExpanded: boolean
}

export const GlobalStoreContext = createContext<Partial<GlobalStoreContextProps>>({});