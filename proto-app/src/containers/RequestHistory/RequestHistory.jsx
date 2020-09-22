import React, { useState } from "react";

import classes from "./RequestHistory.module.scss";

import FileRow from "./FileRow/FileRow";
import Modal from "../../components/Modal/Modal";
import FileInfo from "./FileRow/FileInfo/FileInfo";
import Filter from "./Filter/Filter";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
} from "@material-ui/core";

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

const fileTypeList = [
	{
		id: "microsoftword",
		filterName: "Microsoft Word",
		checkboxList: [
			{ type: "radio", head: "doc", name: "docType", id: "doc" },
			{ type: "radio", head: "dot", name: "docType", id: "dot" },
			{ type: "radio", head: "docx", name: "docType", id: "docx" },
			{ type: "radio", head: "docm", name: "docType", id: "docm" },
		],
	},
	{
		id: "microsoftexcel",
		filterName: "Microsoft Excel",
		checkboxList: [
			{ type: "radio", head: "xlsx", name: "xlsType", id: "xlsx" },
			{ type: "radio", head: "xls", name: "xlsType", id: "xls" },
			{ type: "radio", head: "xlsm", name: "xlsType", id: "xlsm" },
		],
	},
	{
		id: "microsoftpowerpoint",
		filterName: "Microsoft Powerpoint",
		checkboxList: [
			{ type: "radio", head: "ppt", name: "pptType", id: "ppt" },
			{ type: "radio", head: "pptx", name: "pptType", id: "pptx" },
		],
	},
	{
		id: "images",
		filterName: "Images",
		checkboxList: [
			{ type: "radio", head: "jpeg", name: "imgType", id: "jpeg" },
			{ type: "radio", head: "png", name: "imgType", id: "png" },
			{ type: "radio", head: "gif", name: "imgType", id: "gif" },
		],
	},
	{
		id: "pdf",
		filterName: "",
		checkboxList: [
			{ type: "radio", head: "pdf", name: "pdfType", id: "pdf" },
		],
	},
];

const outcomeList = [
	{
		id: "outcome",
		checkboxList: [
			{ type: "checkbox", head: "Safe", name: "docType", id: "doc" },
			{ type: "checkbox", head: "Blocked", name: "docType", id: "dot" },
			{ type: "checkbox", head: "docx", name: "docType", id: "docx" },
			{ type: "checkbox", head: "docm", name: "docType", id: "docm" },
		],
	},
];

const RequestHistory = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [headModal, setHeadModal] = useState("");

	const [sortedRows, setSortedRows] = useState(null);

	const files = userfiles.map((file) => {
		return (
			<FileRow
				key={file.id}
				id={file.id}
				timestamp={file.timestamp}
				fileId={file.fileId}
				name={file.name}
				type={file.type}
				outcome={file.outcome}
				onRowClickHandler={(evt) => openModalInfo(evt.target.id)}
			/>
		);
	});

	const openModalInfo = (id) => {
		setIsOpen(true);
		setRowId(id);
	};

	const openModalFileType = () => {
		setIsOpen(true);
		setHeadModal("Filter: File Type");
	};

	const openModalOutcome = () => {
		setIsOpen(true);
		setHeadModal("Filter: Outcome");
	};

	const closeModal = () => {
		setIsOpen(false);
		setRowId(null);
		setHeadModal("");
	};

	const getSortedRows = (rows, sortLabel) => {
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
					})
				);
				break;
			case "filename":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.name < b.props.name) return -1;
						if (a.props.name > b.props.name) return 1;
					})
				);
				break;
			case "fileType":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.type < b.props.type) return -1;
						if (a.props.type > b.props.type) return 1;
					})
				);
				break;

			case sortLabel.DEFAULT:
				sortedRows = rows;
				break;
		}

		return sortedRows;
	};

	const fileInfo = userfiles.find((it) => it.id === rowId);

	let innerContent = null;

	if (headModal === "Filter: File Type") {
		innerContent = fileTypeList.map((filter) => {
			return (
				<Filter
					key={filter.id}
					type={filter.type}
					filterName={filter.filterName}
					checkboxList={filter.checkboxList}
				/>
			);
		});
	} else if (headModal === "Filter: Outcome") {
		innerContent = outcomeList.map((filter) => {
			return (
				<Filter
					key={filter.id}
					type={filter.type}
					filterName={filter.filterName}
					checkboxList={filter.checkboxList}
				/>
			);
		});
	} else if (fileInfo) {
		innerContent = <FileInfo row={fileInfo} />;
	} else {
		innerContent = null;
	}

	return (
		<>
			<div className={classes.RequestHistory}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(files, "timestamp")}
								>
									Timestamp
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(files, "fileId")}
								>
									File ID
								</TableSortLabel>
							</TableCell>

							{/*<TableCell onClick={openModalFileType}>*/}
							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(files, "filename")}
								>
									Filename
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(files, "fileType")}
								>
									File Type
								</TableSortLabel>
							</TableCell>

							<TableCell onClick={openModalOutcome}>
								<p>Outcome</p>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tbody}>
						{sortedRows || files}
					</TableBody>
				</Table>
			</div>
			{isOpen && (
				<Modal
					head={headModal || fileInfo.name}
					onButtonCloseClick={closeModal}
				>
					{innerContent}
				</Modal>
			)}
		</>
	);
};

export default RequestHistory;
