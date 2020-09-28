import { createContext } from "react";

const GlobalStoreContext = createContext({
	title: "",
	fileFilterList: [],
	userfiles: [],
	outcomeFilterList: [],
	selectedFilters: [],
});

export default GlobalStoreContext;
