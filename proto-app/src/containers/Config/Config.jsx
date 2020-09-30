import React, { useState } from "react";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import classes from "./Config.module.scss";

import AllowedIcon from "../../assets/allowed-domains-icon.svg";
import AllowedIconSelected from "../../assets/allowed-domains-icon-selected.svg";
import SystemSettingsSelected from "../../assets/system-settings-icon-selected.svg";
import SystemSettings from "../../assets/system-settings-icon.svg";

import DomainField from "./DomainField/DomainField";

const Config = () => {
	const [selected, setSelected] = useState("Non Compliant Files");
	const [userDomain, setUserDomain] = useState("glasswallsolutions.com");

	const changeInput = (domain) => {
		setUserDomain(domain);
	};

	const tabs = [
		{
			name: "Non Compliant Files",
			icon: AllowedIcon,
			iconSelected: AllowedIconSelected,
		},
		{
			name: "System Settings",
			icon: SystemSettings,
			iconSelected: SystemSettingsSelected,
		},
	];

	return (
		<article className={classes.Config}>
			<TabNav
				tabs={tabs}
				isSelectedTab={selected}
				onSetActiveTabHandler={(tab) => setSelected(tab)}
			>
				<Tab isSelected={selected === "Non Compliant Files"}>
					<div className={classes.header}>
						<p>Routes for non compliant Files</p>
						<button>+</button>
					</div>
					<div className={classes.table}>
						<div className={classes.tr}>
							<div className={classes.th}>
								<p>Domain Name</p>
								<p>Validated</p>
							</div>
						</div>
						<DomainField
							name={userDomain}
							onChangeInputHandler={(evt) => changeInput(evt.target.value)}
						/>
					</div>
				</Tab>
				<Tab isSelected={selected === "System Settings"}>System Settings</Tab>
			</TabNav>
		</article>
	);
};

export default Config;
