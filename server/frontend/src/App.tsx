import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { UserContext } from "./context/user/UserContext";

import Auth from "./hoc/Auth/Auth";
import Main from "./hoc/Main/Main";
import MainTitle from "./hoc/MainTitle/MainTitle";

import styles from "./App.module.scss";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Login from "./views/Login/Login";
import ForgottenPassword from "./views/ForgottenPassword/ForgottenPassword";
import RequestHistory from "./views/RequestHistory/RequestHistory";
import Policy from "./views/Policy/Policy";
import Confirm from "./views/Confirm/Confirm";
import ResetPassword from "./views/ResetPassword/ResetPassword";

const App = () => {
	const { currentUser } = useContext(UserContext);

	const routes = (
		<Switch>
			<Route exact path="/">
				<Redirect to="/request-history" />
			</Route>

			<Route path="/analytics">
				<MainTitle />
				<Main>
					<div>Analytics</div>
				</Main>
			</Route>

			<Route path="/request-history" component={RequestHistory} />

			<Route path="/policy" component={Policy} />

			<Route path="/users">
				<MainTitle />
				<Main>
					<div>Users</div>
				</Main>
			</Route>

			<Route path="/file-drop">
				<MainTitle />
				<Main>
					<div>File Drop</div>
				</Main>
			</Route>
		</Switch>
	);

	return (
		<div className={styles.app}>
			<Router>
				{!currentUser && (
					<Auth>
						<Switch>
							<Route path="/confirm" component={Confirm} />
							<Route path="/forgot-password" component={ForgottenPassword} />
							<Route path="/reset" component={ResetPassword} />
							<Route path="/" component={Login} exact />
							<Redirect to="/" />
						</Switch>
					</Auth>
				)}

				{currentUser && (
					<div className={styles.mainContainer}>
						{routes}
						<Toolbar />
					</div>
				)}
			</Router>
		</div>
	);
};

export default App;
