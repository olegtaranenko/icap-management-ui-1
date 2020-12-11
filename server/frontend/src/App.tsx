import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { AuthContext } from "./context/auth/auth-context";

import Auth from "./hoc/Auth/Auth";

import Login from "./components/Login/Login";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import PassReminder from "./components/PassReminder/PassReminder";
import RequestHistory from "./views/RequestHistory/RequestHistory";
import Policy from "./views/Policy/Policy";

import classes from "./App.module.scss";

const App = () => {
	const { isAuth } = useContext(AuthContext);

	return (
		<div className={classes.app}>
			<Router>
				{!isAuth && (
					<Route
						render={({ location }) => (
							<TransitionGroup>
								<CSSTransition
									key={location.key}
									// animation time
									timeout={500}
									mountOnEnter
									unmountOnExit
									classNames={{
										enter: classes.authEnter,
										enterActive: classes.authEnterActive,
										enterDone: classes.authEnterDone,
										exit: classes.authExit,
										exitActive: classes.authExitActive,
										exitDone: classes.authExitDone,
									}}
								>
									<Auth>
										<Switch location={location}>
											<Route path="/pass-reminder" component={PassReminder} />
											<Route path="/" component={Login} exact />
											<Redirect to="/" />
										</Switch>
									</Auth>
								</CSSTransition>
							</TransitionGroup>
						)}
					/>
				)}

				{isAuth && (
					<div className={classes.mainContainer}>
						<Route
							render={({ location }) => (
								<TransitionGroup>
									<CSSTransition
										key={location.key}
										timeout={800}
										mountOnEnter
										unmountOnExit
										classNames={{
											enterActive: classes.fadeEnterActive,
											exitActive: classes.fadeExitActive,
										}}
									>
										<Switch location={location}>
											<Route path="/request-history" component={RequestHistory} />

											<Route path="/policy" component={Policy} />

											<Route path="/users">
												<div>test</div>
											</Route>

											<Route path="/">
												<div>Home</div>
											</Route>

											<Redirect to="/" />
										</Switch>
									</CSSTransition>
								</TransitionGroup>
							)}
						/>
						<Toolbar />
					</div>
				)}
			</Router>
		</div>
	);
};

export default App;
