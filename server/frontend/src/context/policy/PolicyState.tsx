import React, { useEffect, useReducer } from "react";
import { Guid } from "guid-typescript";
import { PolicyContext } from "./PolicyContext";
import { policyReducer } from "./policy-reducers";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";
import * as actionTypes from "../actionTypes";
import { getCurrentPolicy, getDraftPolicy, saveDraftPolicy, publishPolicy as publish, deleteDraftPolicy as deleteDraft } from "./api";

interface InitialPolicyState {
	currentPolicy: Policy,
	draftPolicy: Policy,
	newDraftPolicy: Policy,
	policyHistory: Policy[],
	isPolicyChanged: boolean,
	status: "LOADING" | "ERROR" | "LOADED",
	policyErrorMessage: ""
}

export const PolicyState = (props: { children: React.ReactNode }) => {
	const initialState: InitialPolicyState = {
		currentPolicy: null,
		draftPolicy: null,
		newDraftPolicy: null,
		policyHistory: [],
		isPolicyChanged: false,
		status: "LOADING",
		policyErrorMessage: ""
	}

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const setPolicyError = (error: string) => {
		dispatch({ type: actionTypes.SET_POLICY_ERROR, error });
	}

	const setStatus = (status: "LOADING" | "ERROR" | "LOADED") => {
		dispatch({ type: actionTypes.SET_STATUS, status });
	}

	const setIsPolicyChanged = (changed: boolean) => {
		dispatch({ type: actionTypes.SET_IS_POLICY_CHANGED, changed });
	}

	const setCurrentPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_CURRENT_POLICY, currentPolicy: policy });
	}

	const setDraftPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_DRAFT_POLICY, draftPolicy: policy });
	}



	const setNewDraftPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_NEW_DRAFT_POLICY, newPolicy: policy });
	}

	const saveDraftChanges = () => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await saveDraftPolicy(policyState.newDraftPolicy);
				setDraftPolicy(policyState.newDraftPolicy);
				setIsPolicyChanged(false);
				status = "LOADED";
			}
			catch (error) {
				status = "ERROR";
				setPolicyError(error);
			}
			finally {
				setStatus(status);
			}
		})();
	}

	const cancelDraftChanges = () => {
		dispatch({ type: actionTypes.CANCEL_DRAFT_CHANGES });
	}

	const publishPolicy = (policyId: Guid) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await publish(policyId);

				const currentPolicy = await getCurrentPolicy();
				setCurrentPolicy(currentPolicy);

				const draftPolicy = await getDraftPolicy();
				setDraftPolicy(draftPolicy);
				setNewDraftPolicy(draftPolicy);

				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();
	}

	const deleteDraftPolicy = (policyId: Guid) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await deleteDraft(policyId);

				const currentPolicy = await getCurrentPolicy();
				setCurrentPolicy(currentPolicy);

				const draftPolicy = await getDraftPolicy();
				setDraftPolicy(draftPolicy);
				setNewDraftPolicy(draftPolicy);

				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();
	}

	useEffect(() => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				const currentPolicy = await getCurrentPolicy();
				setCurrentPolicy(currentPolicy);

				const draftPolicy = await getDraftPolicy();
				setDraftPolicy(draftPolicy);
				setNewDraftPolicy(draftPolicy);

				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();
	}, []);

	return (
		<PolicyContext.Provider value={{
			currentPolicy: policyState.currentPolicy,
			draftPolicy: policyState.draftPolicy,
			newDraftPolicy: policyState.newDraftPolicy,
			setNewDraftPolicy,
			saveDraftChanges,
			cancelDraftChanges,
			publishPolicy,
			deleteDraftPolicy,
			policyHistory: policyState.policyHistory,
			isPolicyChanged: policyState.isPolicyChanged,
			status: policyState.status,
			policyErrorMessage: policyState.policyErrorMessage
		}}>
			{ props.children}
		</PolicyContext.Provider>
	);
}