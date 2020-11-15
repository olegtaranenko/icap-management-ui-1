import React, { useContext, useEffect, useState } from "react";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";

import { PolicyContext } from "../../../context/policy/policy-context";

import classes from "./CurrentPolicy.module.scss";

const CurrentPolicy = () => {
	const {
		currentPolicy,
	} = useContext(PolicyContext);

	const [isLoading, setIsLoading] = useState(true);
	const [selectedTab, setSelectedTab] = useState("Adaption Policy");

	const tabs = [
		{ testId: "buttonCurrentAdaptionPolicyTab", name: "Adaption Policy" },
		{ testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
	];

	useEffect(() => {
		if (currentPolicy !== null) {
			setIsLoading(false);
		}
	}, [currentPolicy]);

	return (
		<div className={classes.Current}>
			{isLoading &&
				<div>Loading...</div>
			}

			{!isLoading &&
				<>
					<div className={classes.header}>
						<div className={classes.tableContainer}>
							<Table className={classes.table} id={currentPolicy.id}>
								<TableHead>
									<TableRow>
										<TableCell>Timestamp</TableCell>
										<TableCell>Updated By</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className={classes.tbody}>
									<TableRow>
										<TableCell>
											{new Date(currentPolicy.published).toLocaleTimeString()}
										</TableCell>
										<TableCell>
											{currentPolicy.updatedBy ? currentPolicy.updatedBy : "N/A"}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>

					<TabNav
						tabs={tabs}
						selectedTabName={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

						<div className={classes.innerContent}>
							<Tab isSelected={selectedTab === "Adaption Policy"} externalStyles={classes.Tab}>
								<h2 className={classes.head}>Content Management Flags</h2>
								<ContentManagementFlags
									contentManagementFlags={currentPolicy.adaptionPolicy.contentManagementFlags}
									disabled />
							</Tab>

							<Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab}>
								<div className={classes.ncfsContainer}>
									<h2 className={classes.head}>Config for non-compliant files</h2>
									<section className={classes.info}>
										<div>
											<h3>
												<strong>Un-Processable File Types</strong>{" "}
											</h3>
											<p>
												When the filetype of the original file is identified as one that
												the Glasswall SDK cannot rebuild.
											</p>
										</div>
										<div>
											<h3>
												<strong>Glasswall Blocked Files</strong>
											</h3>
											<p>The original file cannot be rebuilt by the Glasswall SDK</p>
										</div>
									</section>
									<RoutesForNonCompliantFiles
										ncfsRoutingUrl={currentPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl}
										disabled />

									<PolicyForNonCompliantFiles ncfsActions={currentPolicy.adaptionPolicy.ncfsActions} />
								</div>
							</Tab>
						</div>
					</TabNav>
				</>
			}
		</div>
	);
}

export default CurrentPolicy;