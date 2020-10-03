import React, { useState, useContext } from "react";
import { PolicyContext } from "../../context/policy/policy-context";

import Current from "./Current/Current";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import classes from "./Policy.module.scss";
import Button from "../../components/UI/Button/Button";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

const Policy = () => {
	const {
		id,
		email,
		//currentTime,
		policyFlags,
		isPolicyChanged,
		changeToggle,
		cancelChanges,
		saveChanges,
	} = useContext(PolicyContext);

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
										<TableCell component="th" scope="row" id={id}>
											{new Date().toUTCString()}
										</TableCell>
										<TableCell component="th" scope="row" id={id}>
											{email}
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
					<Current policyFlags={policyFlags} changeToggle={changeToggle} />
				</Tab>
				<Tab isSelected={selectedTab === "History"}>
					<History />
				</Tab>
			</TabNav>
		</article>
	);
};

export default Policy;
