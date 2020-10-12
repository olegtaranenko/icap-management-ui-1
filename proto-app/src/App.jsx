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
import Toolbar from "./components/Navigation/Toolbar.jsx/Toolbar";
import Login from "./components/Login/Login";
import PassReminder from "./components/PassReminder/PassReminder";
import Users from "./containers/Users/Users";
import Config from "./containers/Config/Config";
import RequestHistory from "./containers/RequestHistory/RequestHistory";
import Policy from "./containers/Policy/Policy";
import Dashboard from "./containers/Dashboard/Dashboard";
import FileDrop from "./containers/FileDrop/FileDrop";

// TODO: Remove from production, for prototype only
import Sow from "./components/Sow/Sow";

const App = () => {
	const [navExpanded, setNavExpanded] = useState(true);
	const { isAuth } = useContext(AuthContext);
	const { title } = useContext(GlobalStoreContext);

	let routes = (
		<Switch>
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/request-history" component={RequestHistory} />
			<Route path="/request-history">
				<div>Request history</div>
			</Route>
			<Route path="/file-drop" component={FileDrop} />
			<Route path="/policy" component={Policy} />

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
							{/* // TODO: Remove from production, for prototype only */}
							<Route path="/sow" component={Sow} />

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
