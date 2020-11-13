import React, { useEffect, useReducer } from "react";

import { PolicyContext } from "./policy-context";
import { policyReducer } from "./policy-reducers";

import { getCurrentPolicy } from "./api";

import * as actionTypes from "../actionTypes";

export const PolicyState = ({ children }) => {
	const initialState = {
		currentPolicy: null,
		draftPolicy: null,
		policyHistory: [],
		isPolicyChanged: false,
	};

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const setCurrentPolicy = () => {
		getCurrentPolicy()
			.then(response =>
				dispatch({ type: actionTypes.SET_CURRENT_POLICY, currentPolicy: response }));
	};

	const updateContentManagementFlag = (contentFlag) => {
		dispatch({ type: actionTypes.UPDATE_CONTENT_MANAGEMENT_FLAG, contentFlag });
	};

	const saveChanges = () => {
		dispatch({ type: actionTypes.SAVE_POLICY_CHANGES });
	};

	const cancelChanges = () => {
		dispatch({ type: actionTypes.CANCEL_POLICY_CHANGES });
	};

	useEffect(() => {
		setCurrentPolicy();
	}, [initialState.currentPolicy]);

	return (
		<PolicyContext.Provider
			value={{
				currentPolicy: policyState.currentPolicy,
				draftPolicy: policyState.draftPolicy,
				policyHistory: policyState.policyHistory,
				isPolicyChanged: policyState.isPolicyChanged,
				updateContentManagementFlag,
				saveChanges,
				cancelChanges,
			}}
		>
			{children}
		</PolicyContext.Provider>
	);
};
