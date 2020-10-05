import React, { useState } from "react";
import DomainField from "../../Config/DomainField/DomainField";

import classes from "./Current.module.scss";

import CurrentRow from "./CurrentRow/CurrentRow";

const Current = ({ policyFlags, changeToggle }) => {
	const [userDomain, setUserDomain] = useState("glasswallsolutions.com");
	return (
		<>
			<div className={classes.Current}>
				<header className={classes.header}>
					<p>Content Flags</p>
				</header>
				<div className={classes.inner}>
					<section>
						<h2>Word</h2>
						<CurrentRow
							block="word"
							itemList={policyFlags.word}
							onChangeHandler={changeToggle}
						/>
					</section>
					<section>
						<h2>Excel</h2>
						<CurrentRow
							block="excel"
							itemList={policyFlags.excel}
							onChangeHandler={changeToggle}
						/>
					</section>
					<section>
						<h2>Powerpoint</h2>
						<CurrentRow
							block="powerpoint"
							itemList={policyFlags.powerpoint}
							onChangeHandler={changeToggle}
						/>
					</section>
					<section>
						<h2>PDF</h2>
						<CurrentRow
							block="pdf"
							itemList={policyFlags.pdf}
							onChangeHandler={changeToggle}
						/>
					</section>
				</div>
			</div>
			<section className={classes.routes}>
				<h3>Routes for non-compliant files</h3>
				<p>
					We will route that do not comply with the current for passage onto
					separate file systems.Specified file systems and routing
					mechanism(s) will be determined at the
				</p>
				<div className={classes.table}>
					<div className={classes.tr}>
						<div className={classes.th}>
							<h3>API URL</h3>
							<h3>Validated</h3>
						</div>
					</div>
					<DomainField
						name={userDomain}
						onChangeInputHandler={(evt) => setUserDomain(evt.target.value)}
					/>
				</div>
			</section>
		</>
	);
};

export default Current;
