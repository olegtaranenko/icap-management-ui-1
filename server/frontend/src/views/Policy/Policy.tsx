import React, { useState, useContext } from "react";

import { PolicyContext } from "../../context/policy/policy-context";

import classes from "./Policy.module.scss";

import currentPolicyIcon from "../../assets/svg/policy/current-policy-icon.svg";
import previousPolicyIcon from "../../assets/svg/policy/previous-policy-icon.svg";

import CurrentPolicy from "./CurrentPolicy/CurrentPolicy";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";

import { Policy as PolicyType } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";


const Policy = () => {
	const {
		currentPolicy,
		draftPolicy,
		isPolicyChanged,
		cancelChanges,
		saveChanges,
	} = useContext(PolicyContext);

	const [selectedTab, setSelectedTab] = useState("Current");

	const tabs = [
		{ testId: "buttonPolicyCurrentTab", name: "Current", icon: currentPolicyIcon },
		{ testId: "buttonPolicyHistoryTab", name: "History", icon: previousPolicyIcon },
	];

	const updatePolicy = (po: PolicyType) => {
		// tslint:disable-next-line: no-console
		console.info(po);
	}

	return (
		<>
			<MainTitle />

			<Main>
				<article className={classes.Policy}>
					<TabNav
						tabs={tabs}
						selectedTabName={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
					>
						<Tab isSelected={selectedTab === "Current"}>
							<CurrentPolicy
								isPolicyChanged={isPolicyChanged}
								updatePolicy={updatePolicy}
								cancelChanges={cancelChanges}
								saveChanges={saveChanges}
							/>
						</Tab>
						<Tab isSelected={selectedTab === "History"}>
							<History
								setPrevPolicy={() => {return true}}
								isCurrent={false}
							/>
						</Tab>
					</TabNav>
				</article>
			</Main>
		</>
	);
};

export default Policy;
