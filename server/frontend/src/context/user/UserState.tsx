import React, { useReducer } from "react";
import { CancelToken } from "axios";
import { ToastContainer, toast } from 'react-toastify';

import { UserContext } from "./UserContext";
import { userReducer } from "./user-reducers";
import * as actionTypes from "../actionTypes";

import User from "../../../../src/common/models/IdentityManagementService/User/User";

import IdentityManagementService from "../../service/IdentityManagementService/IdentityManagementService";

interface InitialUserState {
	currentUser: User | null,
	status: "LOADING" | "ERROR" | "LOADED",
	usersHaveChanges: boolean,
	users: User[]
}

export const UserState = (props: { children: React.ReactNode }) => {
	const identityManagementService = new IdentityManagementService();

	const initialState: InitialUserState = {
		currentUser: JSON.parse(localStorage.getItem("currentUser")),
		status: "LOADED",
		usersHaveChanges: false,
		users: []
	};

	const [userState, dispatch] = useReducer(userReducer, initialState);

	const setStatus = (status: "LOADING" | "ERROR" | "LOADED") => {
		dispatch({ type: actionTypes.SET_STATUS, status });
	}

	const setCurrentUser = (user: User) => {
		dispatch({ type: actionTypes.SET_CURRENT_USER, user });
	}

	const setUsers = (users: User[]) => {
		dispatch({type: actionTypes.SET_USERS, users})
	}

	const getUsers = async (cancellationToken: CancelToken) => {
		setStatus("LOADING");

		try {
			const response = await identityManagementService.getUsers(cancellationToken);
			setUsers(response);
			setStatus("LOADED");
		}
		catch(error) {
			setStatus("ERROR");
		}
	}

	const login = (username: string, password: string, cancellationToken: CancelToken) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				const user = await identityManagementService.login(
					username, password, cancellationToken);

				setCurrentUser(user);
				localStorage.setItem("currentUser", JSON.stringify(user));
				status = "LOADED";
			}
			catch (error) {
				status = "ERROR";
				if (error.response) {
					if (error.response.data) {
						toast.error(error.response.data, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					}
				}
			}
			finally {
				setStatus(status);
			}
		})();
	}

	const logout = () => {
		setCurrentUser(null);
		localStorage.removeItem("currentUser");
	}

	return (
		<UserContext.Provider value={{
			currentUser: userState.currentUser,
			status: userState.status,
			usersHaveChanges: userState.usersHaveChanges,
			users: userState.users,
			getUsers,
			login,
			logout
		}}>
			<ToastContainer />
			{ props.children}
		</UserContext.Provider>
	);
}