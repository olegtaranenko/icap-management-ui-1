import React, { useState } from "react";
import TabNav from "../TabNav/TabNav";
import Tab from "../Tab/Tab";
import classes from "./Config.module.scss";

import { ReactComponent as TickIcon } from "../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon-white.svg";
import AllowedIcon from "../../assets/allowed-domains-icon.svg";
import AllowedIconSelected from "../../assets/allowed-domains-icon-selected.svg";
import SystemSettingsSelected from "../../assets/system-settings-icon-selected.svg";
import SystemSettings from "../../assets/system-settings-icon.svg";

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
		<div className={classes.Config}>
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
						<table>
							<tbody>
								<tr>
									<th width="95%">Domain Name</th>
									<th width="5%">Validated</th>
								</tr>
								<tr>
									<td>
										<input
											type="text"
											value={userDomain}
											onChange={(evt) => changeInput(evt.target.value)}
										/>
									</td>
									<td>
										<TickIcon stroke="#73AE6F" />
										<DeleteIcon stroke="#D69598" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Tab>
				<Tab isSelected={selected === "System Settings"}>System Settings</Tab>
			</TabNav>
		</div>
	);
};

export default Config;
