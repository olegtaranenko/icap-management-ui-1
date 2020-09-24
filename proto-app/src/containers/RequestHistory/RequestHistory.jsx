import React, { useState } from "react";

import classes from "./RequestHistory.module.scss";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
} from "@material-ui/core";

import FileRow from "./FileRow/FileRow";
import Filters from "../../components/Filters/Filters";

const userfiles = [
	{
		id: "file-01",
		timestamp: new Date("05.11.19").toUTCString(),
		fileId: "66666666 - 6666 - 6666 - 6666 - 66666666666",
		type: "PNG",
		name: "y-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-02",
		timestamp: new Date("08.1.19").toUTCString(),
		fileId: "44444444 - 4444 - 4444 - 4444 - 44444444444",

		type: "DOCX",
		name: "f-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-03",
		timestamp: new Date("05.11.17").toUTCString(),
		fileId: "88888888 - 8888 - 8888 - 8888 - 88888888888",

		type: "PNG",
		name: "a-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-04",
		timestamp: new Date("01.23.17").toUTCString(),
		fileId: "11111111 - 1111 - 1111 - 1111 - 11111111111",

		type: "DOCX",
		name: "c-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-05",
		timestamp: new Date().toUTCString(),
		fileId: "55555555 - 5555 - 5555 - 5555 - 55555555555",
		type: "PNG",
		name: "l-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-06",
		timestamp: new Date().toUTCString(),

		fileId: "00000000 - 0000 - 0000 - 0000 - 00000000000",
		type: "DOCX",
		name: "s-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-07",
		timestamp: new Date().toUTCString(),
		fileId: "77777777 - 7777 - 7777 - 7777 - 77777777777",
		type: "PNG",
		name: "d-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-08",
		timestamp: new Date().toUTCString(),
		fileId: "33333333 - 3333 - 3333 - 3333 - 33333333333",
		type: "DOCX",
		name: "m-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-09",
		timestamp: new Date().toUTCString(),
		fileId: "99999999 - 9999 - 9999 - 9999 - 99999999999",
		type: "PNG",
		name: "b-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
	{
		id: "file-10",
		timestamp: new Date().toUTCString(),
		fileId: "10101010 - 1010 - 1010 - 1010 - 10101010101",
		type: "DOCX",
		name: "q-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
	},
];

const RequestHistory = () => {
	const [sortedRows, setSortedRows] = useState(null);

	const getSortedRows = (rows, sortLabel) => {
		let sortedRows;
		switch (sortLabel) {
			case "timestamp":
				setSortedRows(
					rows.sort(
						(a, b) =>
							new Date(a.props.timestamp).getTime() -
							new Date(b.props.timestamp).getTime()
					)
				);
				break;
			case "fileId":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.fileId < b.props.fileId) return -1;
						if (a.props.fileId > b.props.fileId) return 1;
						return 0;
					})
				);
				break;
			case "filename":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.name < b.props.name) return -1;
						if (a.props.name > b.props.name) return 1;
						return 0;
					})
				);
				break;
			case "fileType":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.type < b.props.type) return -1;
						if (a.props.type > b.props.type) return 1;
						return 0;
					})
				);
				break;

			case "outcome":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.type < b.props.type) return -1;
						if (a.props.type > b.props.type) return 1;
						return 0;
					})
				);
				break;

			default:
				sortedRows = rows;
				break;
		}

		return sortedRows;
	};

	//const fileInfo = userfiles.find((it) => it.id === rowId);

	const rows = userfiles.map(
		({ id, timestamp, fileId, name, type, outcome }) => {
			return (
				<FileRow
					key={id}
					id={id}
					timestamp={timestamp}
					fileId={fileId}
					name={name}
					type={type}
					outcome={outcome}
					//onRowClickHandler={(evt) => openInfoModal(evt.target.id)}
				/>
			);
		}
	);

	return (
		<article className={classes.RequestHistory}>
			<Filters />
			<div className={classes.wrapTable}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(rows, "timestamp")}
								>
									Timestamp
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel onClick={() => getSortedRows(rows, "fileId")}>
									File ID
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(rows, "filename")}
								>
									Filename
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(rows, "fileType")}
								>
									File Type
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(rows, "outcome")}
								>
									Outcome
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tbody}>
						{sortedRows || rows}
					</TableBody>
				</Table>
			</div>
			{/*{isOpen && (
				<Modal head={headModal || fileInfo.name}>
					{innerContent}
				</Modal>
			)}*/}
		</article>
	);
};

export default RequestHistory;
