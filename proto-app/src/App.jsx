import React, { useState, useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import Auth from "./hoc/Auth/Auth";
import Main from "./hoc/Main/Main";

import styles from "./App.module.scss";
import AuthContext from "./context/auth/auth-context";
import Toolbar from "./components/Navigation/Toolbar.jsx/Toolbar";
import Login from "./components/Login/Login";
import PassReminder from "./components/PassReminder/PassReminder";
import Users from "./components/Users/Users";
import GlobalStoreContext from "./context/globalStore/globalStore-context";
import Config from "./components/Config/Config";

const App = () => {
	const [navExpanded, setNavExpanded] = useState(true);
	const { isAuth } = useContext(AuthContext);
	const { title } = useContext(GlobalStoreContext);

	let routes = (
		<Switch>
			<Route path="/transaction-log">
				<div>Transaction log</div>
			</Route>
			<Route path="/file-release-request">
				<div>File release requests</div>
			</Route>
			<Route path="/policy">
				<div>Policy</div>
			</Route>
			<Route path="/configuration" component={Config} />
			<Route path="/users" component={Users} />
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
