import React, { useEffect, useReducer, useCallback } from "react";

import { PolicyContext } from "./policy-context";
import { policyReducer } from "./policy-reducers";

import { getCurrentPolicy, getDraftPolicy } from "./api";

import * as actionTypes from "../actionTypes";

export const PolicyState = ({ children }) => {
	const initialState = {
		currentPolicy: null,
		draftPolicy: null,
		newDraftPolicy: null,
		policyHistory: [],
		isPolicyChanged: false,
		policyContextHasError: false
	};

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const setpolicyContextHasError = useCallback((error) => {
		dispatch({ type: actionTypes.SET_POLICY_CONTEXT_ERROR, error });
	}, []);

	const setCurrentPolicy = useCallback(() => {
		getCurrentPolicy()
			.then(response =>
				dispatch({ type: actionTypes.SET_CURRENT_POLICY, currentPolicy: response }))
			.catch(error => {
				dispatch({ type: actionTypes.SET_CURRENT_POLICY, currentPolicy: error })
				setpolicyContextHasError(true)
			});
	}, [setpolicyContextHasError]);

	const setDraftPolicy = useCallback(() => {
		getDraftPolicy()
			.then(response => {
				dispatch({ type: actionTypes.SET_DRAFT_POLICY, draftPolicy: response });
				dispatch({ type: actionTypes.UPDATE_NEW_DRAFT_POLICY, newPolicy: response });
			})
			.catch(error => {
				dispatch({ type: actionTypes.SET_DRAFT_POLICY, draftPolicy: error });
				setpolicyContextHasError(true);
			})
	}, [setpolicyContextHasError]);

	const updateNewDraftPolicy = (newPolicy) => {
		dispatch({ type: actionTypes.UPDATE_NEW_DRAFT_POLICY, newPolicy: newPolicy });
	};

	const saveChanges = () => {
		dispatch({ type: actionTypes.SAVE_POLICY_CHANGES });
	};

	const cancelChanges = () => {
		dispatch({ type: actionTypes.CANCEL_POLICY_CHANGES });
	};

	useEffect(() => {
		setCurrentPolicy();
		setDraftPolicy();
	}, [initialState.currentPolicy, setCurrentPolicy, initialState.draftPolicy, setDraftPolicy, initialState.newDraftPolicy]);

	return (
		<PolicyContext.Provider
			value={{
				currentPolicy: policyState.currentPolicy,
				draftPolicy: policyState.draftPolicy,
				newDraftPolicy: policyState.newDraftPolicy,
				updateNewDraftPolicy,
				policyHistory: policyState.policyHistory,
				isPolicyChanged: policyState.isPolicyChanged,
				policyContextHasError: policyState.policyContextHasError,
				saveChanges,
				cancelChanges
			}}
		>
			{children}
		</PolicyContext.Provider>
	);
};
