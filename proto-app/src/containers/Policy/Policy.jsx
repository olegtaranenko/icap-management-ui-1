import React, { useState } from "react";
import classes from "./Policy.module.scss";

import Current from "./Current/Current";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";

const Policy = () => {
	const [selectedTab, setSelectedTab] = useState("Current");

	const tabs = [{ name: "Current" }, { name: "History" }];

	return (
		<section>
			<TabNav
				tabs={tabs}
				isSelectedTab={selectedTab}
				onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
			/>
			{selectedTab === "Current" && <Current />}
			{selectedTab === "History" && <History />}
		</section>
	);
};

export default Policy;
