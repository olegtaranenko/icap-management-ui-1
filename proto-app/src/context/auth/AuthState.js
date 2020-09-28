import React, { useReducer } from "react";

import AuthContext from "./auth-context";
import { authReducer } from "./auth-reducers";

import * as actionTypes from "../actionTypes";

export const AuthState = ({ children }) => {
	const initialState = {
		isAuthenticated: false,
		isSignin: false,
	};

	const [authState, dispatch] = useReducer(authReducer, initialState);

	const switchAuthMode = () => {
		dispatch({ type: actionTypes.SWITCH_AUTH_MODE });
	};

	const login = () => {
		dispatch({ type: actionTypes.AUTH_LOGIN });
	};
	const logout = () => {
		dispatch({ type: actionTypes.AUTH_LOGOUT });
	};

	return (
		<AuthContext.Provider
			value={{
				isAuth: authState.isAuthenticated,
				login,
				logout,
				switchAuthMode,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
