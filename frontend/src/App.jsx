import React, { useState, useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { GlobalStoreContext } from "./context/globalStore/globalStore-context";
import { AuthContext } from "./context/auth/auth-context";

import Auth from "./hoc/Auth/Auth";
import Main from "./hoc/Main/Main";

import styles from "./App.module.scss";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Login from "./components/Login/Login";
import PassReminder from "./components/PassReminder/PassReminder";
import RequestHistory from "./views/RequestHistory/RequestHistory";


const App = () => {
	const [navExpanded, setNavExpanded] = useState(true);
	const { isAuth } = useContext(AuthContext);
	const { title } = useContext(GlobalStoreContext);

	let routes = (
		<Switch>
			<Route path="/dashboard">
				<div>Dashboard</div>
			</Route>

			<Route path="/request-history" component={RequestHistory} />

			<Route path="/policy">
				<div>Policy</div>
			</Route>

			<Route path="/users">
				<div>Users</div>
			</Route>

			<Route path="/file-drop">
				<div>File Drop</div>
			</Route>

			<Redirect to="/" />
		</Switch>
	);

	return (
		<div className={styles.app}>
			<Router>
				{!isAuth && (
					<Auth>
						<Switch>
							<Route path="/pass-reminder" component={PassReminder} />
							<Route path="/" component={Login} exact />
							<Redirect to="/" />
						</Switch>
					</Auth>
				)}

				{isAuth && (
					<div className={styles.mainContainer}>
						<Main showTitle title={title} expanded={navExpanded}>
							{routes}
						</Main>
						<Toolbar
							expanded={navExpanded}
							navExpandedHandler={() => setNavExpanded(!navExpanded)}
						/>
					</div>
				)}
			</Router>
		</div>
	);
};

export default App;
