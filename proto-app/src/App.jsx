import React, { useState, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SplashScreenView from "./views/SplashScreenView/SplashScreenView";
//import GlasswallModal from "./components/GlasswallModal/GlasswallModal";
import Auth from "./hoc/Auth/Auth";
import Main from "./hoc/Main/Main";

import styles from "./App.module.scss";
import AuthContext from "./context/auth/auth-context";
import Toolbar from "./components/Navigation/Toolbar.jsx/Toolbar";
import Login from "./components/Login/Login";
import PassReminder from "./components/PassReminder/PassReminder";
import Users from "./components/UserList/UserList";
import GlobalStoreContext from "./context/globalStore/globalStore-context";

const App = () => {
	//const [showSplashScreen, setShowSplashScreen] = useState(true);
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
			<Route path="/configuration">
				<div>Configuration</div>
			</Route>
			<Route path="/users" component={Users} />
			<Redirect to="/" />
		</Switch>
	);

	return (
		<div className={styles.app}>
			{/*{showSplashScreen && (
				<SplashScreenView
					hideSplashScreen={() => setShowSplashScreen(false)}
				/>
			)}*/}

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
		</div>
	);
};

export default App;
