import React, { useReducer } from "react";

import { PolicyContext } from "./policy-context";
import { policyReducer } from "./policy-reducers";

import * as actionTypes from "../actionTypes";
import store from "../../store/store.json";

export const PolicyState = ({ children }) => {
	const initialState = {
		id: store.id,
		username: store.username,
		userEmail: store.userEmail,
		timestamp: store.timestamp,
		policyFlags: store.policyFlagList,
		isPolicyChanged: false,
	};

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const changeToggle = (toggle) => {
		dispatch({ type: actionTypes.CHANGE_TOGGLE_POSITION, toggle });
	};

	const saveChanges = () => {
		dispatch({ type: actionTypes.SAVE_CHANGES_POLISY });
	};

	const cancelChanges = () => {
		dispatch({ type: actionTypes.CANCEL_CHANGES_POLISY });
	};

	return (
		<PolicyContext.Provider
			value={{
				id: policyState.id,
				user: policyState.username,
				email: policyState.userEmail,
				currentTime: policyState.timestamp,
				policyFlags: policyState.policyFlags,
				isPolicyChanged: policyState.isPolicyChanged,
				changeToggle,
				saveChanges,
				cancelChanges,
			}}
		>
			{children}
		</PolicyContext.Provider>
	);
};
