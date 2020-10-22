import React, { useReducer } from "react";

import { GlobalStoreContext } from "./globalStore-context";
import { globalStoreReducer } from "./globalStore-reducers";

import * as actionTypes from "../actionTypes";

import userfiles from "../../data/userfiles.json";
import fileFilter from "../../data/filters/RequestHistory/fileFilter.json";
import outcomeFilter from "../../data/filters/RequestHistory/outcomeFilter.json";
import requestHistoryTimeFilter from "../../data/filters/RequestHistory/requestHistoryTimeFilter";

const userfileList = userfiles;

export const GlobalStoreState = ({ children }) => {
	const initialState = {
		title: "Glasswall React App",
		userfiles: userfileList,
		fileFilter: fileFilter,
		outcomeFilter: outcomeFilter,
		requestHistoryTimeFilter: requestHistoryTimeFilter,
		isCurrentPolicy: true,
		selectedFilters: [],
		navExpanded: true
	};

	const [globalStoreState, dispatch] = useReducer(
		globalStoreReducer,
		initialState
	);

	const changePageTitleHandler = (pageTitle) => {
		dispatch({ type: actionTypes.CHANGE_PAGE_TITLE, title: pageTitle });
	};

	const addFilterCheckbox = (filter) => {
		dispatch({ type: actionTypes.ADD_FILTER_FROM_CHECKBOXES, filter });
	};

	const addFilterInput = (filter) => {
		dispatch({ type: actionTypes.ADD_FILTER_FROM_INPUT, filter });
	};

	const removeFilter = (filter) => {
		dispatch({ type: actionTypes.REMOVE_FILTER, filter });
	};

	const updateRequestHistoryTimeFilter = (timeDateFilter) => {
		dispatch({type: actionTypes.UPDATE_REQUEST_HISTORY_TIME_FILTER, timeDateFilter});
	};

	const toggleNavExpanded = () => {
		dispatch({ type: actionTypes.TOGGLE_NAV_EXPANDED });
	}

	return (
		<GlobalStoreContext.Provider
			value={{
				state: globalStoreState,
				title: globalStoreState.title,
				userfiles: globalStoreState.userfiles,
				fileFilter: globalStoreState.fileFilter,
				outcomeFilter: globalStoreState.outcomeFilter,
				selectedFilters: globalStoreState.selectedFilters,
				isCurrentPolicy: globalStoreState.isCurrentPolicy,
				requestHistoryTimeFilter: globalStoreState.requestHistoryTimeFilter,
				navExpanded: globalStoreState.navExpanded,
				changePageTitleHandler,
				addFilterCheckbox,
				addFilterInput,
				removeFilter,
				updateRequestHistoryTimeFilter,
				toggleNavExpanded
			}}
		>
			{children}
		</GlobalStoreContext.Provider>
	);
};
