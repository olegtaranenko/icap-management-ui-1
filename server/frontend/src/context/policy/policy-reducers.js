import equal from "deep-equal";

import { updateObject } from "../../helpers/updateObject";

import * as actionTypes from "../actionTypes";

const setpolicyContextHasError = (state, error) => {
	return updateObject(state, {
		policyContextHasError: error
	});
};

const setCurrentPolicy = (state, currentPolicy) => {
	return updateObject(state, {
		currentPolicy: currentPolicy
	});
};

const setDraftPolicy = (state, draftPolicy) => {
	return updateObject(state, {
		draftPolicy: draftPolicy
	});
};

const updateNewDraftPolicy = (state, newPolicy) => {
	const isPolicyEqual = equal(state.draftPolicy, newPolicy);

	return updateObject(state, {
		newDraftPolicy: newPolicy,
		isPolicyChanged: !isPolicyEqual,
	});
};

const cancelChangesPolicy = (state) => {
	return updateObject(state, {
		newDraftPolicy: state.draftPolicy,
		isPolicyChanged: false,
	});
};

const saveChangesPolicy = (state) => {
	

	return updateObject(state, {
		isPolicyChanged: false,
	});
};

export const policyReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_POLICY_CONTEXT_ERROR:
			return setpolicyContextHasError(state, action.error);
		case actionTypes.SET_CURRENT_POLICY:
			return setCurrentPolicy(state, action.currentPolicy);
		case actionTypes.SET_DRAFT_POLICY:
			return setDraftPolicy(state, action.draftPolicy);
		case actionTypes.UPDATE_NEW_DRAFT_POLICY:
			return updateNewDraftPolicy(state, action.newPolicy);
		case actionTypes.SAVE_POLICY_CHANGES:
			return saveChangesPolicy(state);
		case actionTypes.CANCEL_POLICY_CHANGES:
			return cancelChangesPolicy(state);
		default:
			return state;
	}
};
