import React, { useState, useContext } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import { PolicyContext } from "../../context/policy/policy-context";

import prevPolicy from "../../data/prevPolicy.json";

import Current from "./Current/Current";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import classes from "./Policy.module.scss";
import Button from "../../components/UI/Button/Button";

const Policy = () => {
	const {
		id,
		email,
		policyFlags,
		timestamp,
		isPolicyChanged,
		changeToggle,
		cancelChanges,
		saveChanges,
	} = useContext(PolicyContext);

	const policy = prevPolicy.find(
		(it) => it.id === "prev-Adam2-20092020165445"
	);

	const [currentPolicy, setCurrentPolicy] = useState(true);
	const [selectedTab, setSelectedTab] = useState("Current");

	const tabs = [{ name: "Current" }, { name: "History" }];

	return (
		<article className={classes.Policy}>
			<TabNav
				tabs={tabs}
				isSelectedTab={selectedTab}
				onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
			>
				<Tab isSelected={selectedTab === "Current"}>
					<div className={classes.header}>
						<div className={classes.table}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Timestamp</TableCell>
										<TableCell>Updated By</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className={classes.tbody}>
									<TableRow>
										<TableCell
											component="th"
											scope="row"
											id={currentPolicy ? id : policy.id}
										>
											{currentPolicy ? timestamp : policy.timestamp}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											id={currentPolicy ? id : policy.id}
										>
											{currentPolicy ? email : policy.userEmail}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
						{isPolicyChanged && (
							<div className={classes.buttons}>
								<Button onButtonClick={cancelChanges}>Cancel Changes</Button>
								<Button onButtonClick={saveChanges}>Save Changes</Button>
							</div>
						)}
					</div>
					<Current
						policyFlags={currentPolicy ? policyFlags : policy.policyFlagList}
						changeToggle={changeToggle}
					/>
				</Tab>
				<Tab isSelected={selectedTab === "History"}>
					<History
						setPrevPolicy={() => setCurrentPolicy(false)}
						isCurrent={currentPolicy}
					/>
				</Tab>
			</TabNav>
		</article>
	);
};

export default Policy;
