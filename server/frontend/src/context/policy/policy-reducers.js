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

const updateContentManagementFlag = (state, contentFlag) => {

	return updateObject(state, {
		isPolicyChanged: true,
	});
};

const cancelChangesPolicy = (state) => {
	return updateObject(state, {


		isPolicyChanged: false,
	});
};

const saveChangesPolicy = (state) => {
	for (let key in state.policyFlagList) {
		state.policyFlagList[key].map((it) => {
			it.touched = false;
			return it.touched;
		});
	}

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
		case actionTypes.UPDATE_CONTENT_MANAGEMENT_FLAG:
			return updateContentManagementFlag(state, action.contentFlag);
		case actionTypes.SAVE_POLICY_CHANGES:
			return saveChangesPolicy(state);
		case actionTypes.CANCEL_POLICY_CHANGES:
			return cancelChangesPolicy(state);
		default:
			return state;
	}
};
