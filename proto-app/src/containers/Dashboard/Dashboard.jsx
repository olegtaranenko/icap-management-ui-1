import React from "react";

import classes from "./Dashboard.module.scss";

import LineChart from "../../components/UI/Charts/LineChart/LineChart";
import PieChart from "../../components/UI/Charts/PieChart/PieChart";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock";
import DateAndTimePickers from "../../components/UI/DateAndTimePickers/DateAndTimePickers";

const Dashboard = () => {
	return (
		<article className={classes.Dashboard}>
			<div className={classes.top}>ICAP requests</div>
			<div className={classes.pickers}>
				<DateAndTimePickers />
			</div>

			<div className={classes.infoBlocks}>
				<InfoBlock headline={"Total files processed"} sum={"134,326"} />
				<InfoBlock headline={"Total ICAP requests"} sum={"213,596"} />
				<InfoBlock
					headline={"Files submitted to non-compliant file service"}
					sum={"30,000"}
				/>
			</div>
			<div className={classes.pieChart}>
				<PieChart />
			</div>
			<div>
				<LineChart className={classes.lineChart} />
			</div>
		</article>
	);
};

export default Dashboard;
