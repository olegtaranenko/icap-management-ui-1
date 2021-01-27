import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { AuthContext } from "./context/auth/auth-context";

import Auth from "./hoc/Auth/Auth";
import Main from "./hoc/Main/Main";
import MainTitle from "./hoc/MainTitle/MainTitle";

import styles from "./App.module.scss";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Login from "./components/Login/Login";
// import PassReminder from "./components/PassReminder/PassReminder";
import RequestHistory from "./views/RequestHistory/RequestHistory";
import Policy from "./views/Policy/Policy";
import Confirm from "./views/Confirm/Confirm";
import ResetPassword from "./views/ResetPassword/ResetPassword";

const App = () => {
	const { isAuth } = useContext(AuthContext);

	const routes = (
		<Switch>
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

			<Redirect to="/" />
		</Switch>
	);

	return (
		<div className={styles.app}>
			<Router>
				{!isAuth && (
					<Auth>
						<Switch>
							<Route path="/confirm" component={Confirm} />
							{/* <Route path="/pass-reminder" component={PassReminder} /> */}
							<Route path="/reset" component={ResetPassword} />
							<Route path="/" component={Login} exact />
							<Redirect to="/" />
						</Switch>
					</Auth>
				)}

				{isAuth && (
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
