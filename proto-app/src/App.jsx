import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";

import {
	NavBar,
	Nav,
	NavButton,
	ExpandButton,
	NavSpacer,
} from "./components/GlasswallNav/GlasswallNav";
import Main from "./components/Main/Main";
import SplashScreenView from "./views/SplashScreenView/SplashScreenView";
import GlasswallModal from "./components/GlasswallModal/GlasswallModal";
import Login from "./components/Auth/Login/Login";

import styles from "./App.module.scss";

const App = () => {
	const [showSplashScreen, setShowSplashScreen] = useState(true);

	const [navExpanded, setNavExpanded] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [loginPageIsOpen, setLoginPageIsOpen] = useState(false);

	return (
		<div className={styles.app}>
			<div className={styles.mainContainer}>
				{showSplashScreen && (
					<SplashScreenView
						hideSplashScreen={() => setShowSplashScreen(false)}
					/>
				)}

				{loginPageIsOpen && (
					<Login onCloseAction={() => setLoginPageIsOpen(false)} />
				)}

				{!showSplashScreen && !loginPageIsOpen && (
					<Router>
						<NavBar expanded={navExpanded} logo>
							<Nav expanded={navExpanded}>
								<Link to="/">
									<NavButton>Home</NavButton>
								</Link>

								<NavSpacer />

								<Link to="/about">
									<NavButton>About</NavButton>
								</Link>

								<Link to="/contact">
									<NavButton>Contact</NavButton>
								</Link>
							</Nav>

							<Nav expanded={navExpanded} bottom>
								<NavButton clickHandler={() => setModalIsOpen(true)}>
									Modal
								</NavButton>

								<NavButton clickHandler={() => setShowSplashScreen(true)}>
									Back
								</NavButton>

								<NavButton clickHandler={() => setLoginPageIsOpen(true)}>
									Login
								</NavButton>
							</Nav>

							<ExpandButton
								expanded={navExpanded}
								clickHandler={() => setNavExpanded(!navExpanded)}
							/>
						</NavBar>

						<Main
							expanded={navExpanded}
							showTitle
							title="Glasswall React App"
						>
							<Switch>
								<Route exact path="/">
									<div>Home</div>
								</Route>

								<Route path="/about">
									<div>About</div>
								</Route>

								<Route path="/contact">
									<div>Contact</div>
								</Route>
							</Switch>
						</Main>

						<GlasswallModal
							isOpen={modalIsOpen}
							onCloseAction={() => setModalIsOpen(false)}
						/>
					</Router>
				)}
			</div>
		</div>
	);
};

export default App;
