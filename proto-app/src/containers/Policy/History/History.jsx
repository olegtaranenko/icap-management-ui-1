import React from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./History.module.scss";

import HistoryRow from "./HistoryRow/HistoryRow";
import Pagination from "../../../components/UI/Pagination/Pagination";

const historyfiles = [
	{
		id: "history-01",
		timestamp: new Date("05.11.19").toUTCString(),
		updatedBy: "test@test-user.com",
	},
];

const History = () => {
	const rows = historyfiles.map(({ id, timestamp, updatedBy }) => {
		return (
			<HistoryRow
				key={id}
				id={id}
				timestamp={timestamp}
				updatedBy={updatedBy}
			/>
		);
	});
	return (
		<div className={classes.History}>
			<div>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Timestamp</TableCell>
							<TableCell>Updated By</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tbody}>{rows}</TableBody>
				</Table>{" "}
				<Pagination />
			</div>
		</div>
	);
};

export default History;
