import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const authLogin = (state) => {
	return updateObject(state, { isAuthenticated: true });
};

const switchAuthMode = (state) => {
	return updateObject(state, { isSignin: !state.isSignin });
};

export const authReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.AUTH_LOGIN:
			return authLogin(state);
		case actionTypes.SWITCH_AUTH_MODE:
			return switchAuthMode(state);
		default:
			return state;
	}
};
