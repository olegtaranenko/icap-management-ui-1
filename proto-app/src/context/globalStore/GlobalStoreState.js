import React, { useReducer } from "react";

import GlobalStoreContext from "./globalStore-context";
import { globalStoreReducer } from "./globalStore-reducers";

import * as actionTypes from "../actionTypes";

export const GlobalStoreState = ({ children }) => {
	const initialState = {
		title: "Glasswall React App",
	};

	const [globalStoreState, dispatch] = useReducer(
		globalStoreReducer,
		initialState
	);

	const changePageTitleHandler = (pageTitle) => {
		dispatch({ type: actionTypes.CHANGE_PAGE_TITLE, title: pageTitle });
	};

	return (
		<GlobalStoreContext.Provider
			value={{ title: globalStoreState.title, changePageTitleHandler }}
		>
			{children}
		</GlobalStoreContext.Provider>
	);
};
