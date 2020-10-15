import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
const LineChart = () => {
	const [chartData, setChartData] = useState({});

	const chart = () => {
		setChartData({
			labels: [
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
			],
			datasets: [
				{
					label: "Unclassified",

					data: [
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						300,
						200,
						300,
						200,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					],
					lineTension: 0,
					backgroundColor: ["transparent"],
					borderColor: "#818787",
					borderWidth: 4,
				},
				{
					label: "Dangerous",
					data: [
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					],
					lineTension: 0,
					backgroundColor: ["transparent"],
					borderColor: "#e1974e",
					borderWidth: 4,
				},
				{
					label: "Checked",
					data: [
						0,
						0,
						0,
						0,
						0,
						0,
						500,
						12000,
						18000,
						21000,
						10000,
						20000,
						18000,
						16000,
						10000,
						3000,
						500,
						0,
						0,
						0,
						0,
						0,
					],
					lineTension: 0,
					backgroundColor: ["transparent"],
					borderColor: "#d9d9d9",
					borderWidth: 4,
				},
				{
					label: "Blocked",
					data: [
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						5000,
						6000,
						7000,
						2000,
						8000,
						8000,
						7000,
						1000,
						0,
						0,
						0,
						0,
						0,
						0,
					],
					lineTension: 0,
					backgroundColor: ["transparent"],
					borderColor: "#e1974e",
					borderWidth: 4,
				},
				{
					label: "Safe",
					data: [
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						500,
						8000,
						11000,
						13000,
						7000,
						11000,
						10000,
						9000,
						8000,
						4000,
						1000,
						0,
						0,
						0,
						0,
					],
					lineTension: 0,
					backgroundColor: ["transparent"],
					borderColor: "#7394ca",
					borderWidth: 4,
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
				width: "100%",
				position: "relative",
			}}
		>
			<Line
				type="line"
				data={chartData}
				height={100}
				options={{
					legend: {
						position: "bottom",

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
									max: 25000,
									autoSkip: true,
									maxTicksLimit: 6,
									beginAtZero: true,
								},
							},
						],
					},
					layout: {
						padding: {
							left: 50,
							right: 50,
							top: 50,
							bottom: 50,
						},
					},
				}}
			/>
		</div>
	);
};

export default LineChart;
