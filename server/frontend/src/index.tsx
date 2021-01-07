import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";

import "./index.scss";
import "./normalize.css";

import { AuthState } from "./context/auth/AuthState";
import { GlobalStoreState } from "./context/globalStore/GlobalStoreState";

import * as serviceWorker from "./serviceWorker";

// TODO: Remove fake-backend when integrating with the identity-management-api
import { configureFakeBackend } from "./fake-backend";
configureFakeBackend();

ReactDOM.render(
	// <React.StrictMode>
	<GlobalStoreState>
		<AuthState>
			<ToastProvider>
				<App />
			</ToastProvider>
		</AuthState>
	</GlobalStoreState>,
	// </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
