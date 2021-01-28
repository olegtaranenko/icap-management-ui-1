import User from "../../../../src/common/models/IdentityManagementService/User/User";
import { updateObject } from "../../helpers/updateObject";

import * as actionTypes from "../actionTypes";
import { TUserState } from "./UserContext";

const setStatus = (state: TUserState, status: "LOADING" | "ERROR" | "LOADED") => {
	return updateObject(state, {
		status
	})
}

const setCurrentUser = (state: TUserState, user: User) => {
	return updateObject(state, {
		currentUser: user
	});
}

export const authReducer = (state: TUserState, action: { [actionName: string]: any }) => {
	switch (action.type) {
		case actionTypes.SET_STATUS:
			return setStatus(state, action.status);
		case actionTypes.SET_CURRENT_USER:
			return setCurrentUser(state, action.user);
		default:
			return state;
	}
};