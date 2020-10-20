import { createContext } from "react";

export interface AuthStore {
	email: string,
	password: string,
	isAuth: boolean,
	isChangePass: boolean,
	login: Function,
	logout: Function,
	switchAuthMode: Function,
	openChangePass: Function,
	closeChangePass: Function
};

export const AuthContext = createContext<Partial<AuthStore>>({});