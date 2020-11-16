import React, { useState } from "react";

import classes from "./Policy.module.scss";

import draftPolicyIcon from "../../assets/svg/policy/draft-policy-icon.svg";
import currentPolicyIcon from "../../assets/svg/policy/current-policy-icon.svg";
import previousPolicyIcon from "../../assets/svg/policy/previous-policy-icon.svg";

import CurrentPolicy from "./CurrentPolicy/CurrentPolicy";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";

import { PolicyState } from "../../context/policy/PolicyState";

const Policy = () => {
	const [selectedTab, setSelectedTab] = useState("Current");

	const tabs = [
		{ testId: "buttonPolicyDraftTab", name: "Draft", icon: draftPolicyIcon, disabled: true },
		{ testId: "buttonPolicyCurrentTab", name: "Current", icon: currentPolicyIcon },
		{ testId: "buttonPolicyHistoryTab", name: "History", icon: previousPolicyIcon, disabled: true }
	];

	return (
		<PolicyState>
			<MainTitle />

			<Main>
				<article className={classes.Policy}>
					<TabNav
						tabs={tabs}
						selectedTabName={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

						<Tab isSelected={selectedTab === "Draft"}>
							<div>draft</div>
						</Tab>

						<Tab isSelected={selectedTab === "Current"}>
							<CurrentPolicy />
						</Tab>

						<Tab isSelected={selectedTab === "History"}>
							<History
								setPrevPolicy={() => { return true }}
								isCurrent={false} />
						</Tab>
					</TabNav>
				</article>
			</Main>
		</PolicyState>
	);
};

export default Policy;
