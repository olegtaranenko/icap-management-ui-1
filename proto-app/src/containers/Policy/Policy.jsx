import React, { useState } from "react";

import Current from "./Current/Current";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import classes from "./Policy.module.scss";
import Button from "../../components/UI/Button/Button";

const Policy = () => {
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
					<Current />
					<div className={classes.buttons}>
						<Button>Cancel Changes</Button>
						<Button>Save Changes</Button>
					</div>
				</Tab>
				<Tab isSelected={selectedTab === "History"}>
					<History />
				</Tab>
			</TabNav>
		</article>
	);
};

export default Policy;
