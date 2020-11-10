import React, { useState } from "react";

import classes from "./HistoryInfo.module.scss";

import CurrentRow from "../../Current/CurrentRow/CurrentRow";
import DomainField from "../../DomainField/DomainField";
import { Policy } from "../../../../context/policy/models";

export interface HistoryInfoProps {
	previousPolicy: Policy[]
}

const HistoryInfo = (props: HistoryInfoProps) => {
	const [userDomain, setUserDomain] = useState("glasswallsolutions.com");

	const historyInfoModal = props.previousPolicy.map(({ timestamp, policyFlagList }) => {
		return (
			<div className={classes.policy} key={new Date().toLocaleDateString()}>
				<header className={classes.header}>
					<h2>Policy - {timestamp}</h2>
				</header>
				<div className={classes.innerContent}>
					<section className={classes.flags}>
						<h3>Content Flags</h3>
						<div className={classes.rowList}>
							<section>
								<h2>Word</h2>
								<CurrentRow
									block="word"
									itemList={policyFlagList.word}
									disabled
								/>
							</section>
							<section>
								<h2>Excel</h2>
								<CurrentRow
									block="excel"
									itemList={policyFlagList.excel}
									disabled
								/>
							</section>
							<section>
								<h2>Powerpoint</h2>
								<CurrentRow
									block="powerpoint"
									itemList={policyFlagList.powerpoint}
									disabled
								/>
							</section>
							<section>
								<h2>PDF</h2>
								<CurrentRow
									block="pdf"
									itemList={policyFlagList.pdf}
									disabled
								/>
							</section>
						</div>
					</section>
					<section className={classes.routes}>
						<h3>Routes for non-compliant files</h3>
						<p>
							We will route that do not comply with the current for passage
							onto separate file systems.Specified file systems and routing
							mechanism(s) will be determined at the
						</p>
						<DomainField
							name={userDomain}
							disabled
							onChangeInputHandler={(event: any) => setUserDomain(event.target.value)}
						/>
					</section>
				</div>
			</div>
		);
	});

	return (
		<section className={classes.HistoryInfo}>{historyInfoModal}</section>
	);
};

export default HistoryInfo;