import React, { useState, useContext } from "react";

import { PolicyContext } from "../../context/policy/policy-context";

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

import { Policy as PolicyType } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { PolicyState } from "../../context/policy/PolicyState";

const Policy = () => {
	const {
		isPolicyChanged,
		cancelChanges,
		saveChanges,
	} = useContext(PolicyContext);

	const [selectedTab, setSelectedTab] = useState("Current");

	const tabs = [
		{ testId: "buttonPolicyDraftTab", name: "Draft", icon: draftPolicyIcon, disabled: true },
		{ testId: "buttonPolicyCurrentTab", name: "Current", icon: currentPolicyIcon },
		{ testId: "buttonPolicyHistoryTab", name: "History", icon: previousPolicyIcon, disabled: true }
	];

	const updatePolicy = (po: PolicyType) => {
		// tslint:disable-next-line: no-console
		console.info(po);
	}

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
							<CurrentPolicy
								isPolicyChanged={isPolicyChanged}
								updatePolicy={updatePolicy}
								cancelChanges={cancelChanges}
								saveChanges={saveChanges} />
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
