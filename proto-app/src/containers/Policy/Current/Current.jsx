import React from "react";

import classes from "./Current.module.scss";

import CurrentRow from "./CurrentRow/CurrentRow";

const Current = ({ policyFlags, changeToggle }) => {
	return (
		<div className={classes.Current}>
			<div className={classes.header}>
				<p>Content Flags</p>
			</div>
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
					<h2>Exel</h2>
					<CurrentRow
						block="exel"
						itemList={policyFlags.exel}
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
	);
};

export default Current;
