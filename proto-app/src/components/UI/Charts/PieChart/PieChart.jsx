import React, { useState, useEffect } from "react";

import { Pie } from "react-chartjs-2";

const PieChart = () => {
	const [chartData, setChartData] = useState({});

	const chart = () => {
		setChartData({
			labels: ["Sales"],
			datasets: [
				{
					label: ["Sales"],
					data: [100],
					backgroundColor: ["#7394ca"],
					borderColor: "transparent",
				},
			],
		});
	};

	useEffect(() => {
		chart();
	}, []);

	return (
		<div
			style={{
				width: "50rem",

				position: "relative",
				padding: "3rem 3rem 6rem 3rem",
			}}
		>
			<Pie
				type="pie"
				data={chartData}
				options={{
					legend: {
						position: "right",

						labels: {
							padding: 10,
							boxWidth: 10,
						},
					},
					scales: {
						yAxes: [
							{
								ticks: {
									min: 0,
									max: 1,
									maxTicksLimit: 1,
									autoSkip: true,
									beginAtZero: true,
								},
							},
						],
					},
				}}
			/>
		</div>
	);
};

export default PieChart;
