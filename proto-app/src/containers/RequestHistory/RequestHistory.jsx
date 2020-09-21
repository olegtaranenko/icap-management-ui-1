import React, { useState } from "react";

import classes from "./RequestHistory.module.scss";

import FileRow from "./FileRow/FileRow";
import Modal from "../../components/Modal/Modal";

const userfiles = [
	{
		id: "file-01",
		timestamp: new Date().toUTCString(),
		fileId: "00000000 - 0000 - 0000 - 0000 - 00000000000",
		type: "PNG",
		name: "test.png",
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
		timestamp: new Date().toUTCString(),
		fileId: "11111111 - 1111 - 1111 - 1111 - 11111111111",
		type: "DOCX",
		name: "test.docx",
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
	const [isOpen, setIsOpen] = useState(false);
	const [rowId, setRowId] = useState(null);

	const openModal = (id) => {
		setIsOpen(true);
		setRowId(id);
	};

	const closeModal = () => {
		setIsOpen(false);
		setRowId(null);
	};

	const rowInfo = userfiles.find((it) => it.id === rowId);

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
				onRowClickHandler={(evt) => openModal(evt.target.id)}
			/>
		);
	});

	return (
		<>
			<div className={classes.RequestHistory}>
				<div className={classes.table}>
					<div className={classes.tr}>
						<div className={classes.th}>
							<p>Timestamp</p>
							<p>File ID</p>
							<p>Filename</p>
							<p>File Type</p>
							<p>Outcome</p>
						</div>
					</div>
					<div className={classes.wrap}>{files}</div>
				</div>
			</div>
			{isOpen && (
				<Modal fileName={rowInfo.name} onButtonCloseClick={closeModal}>
					<p className={classes.head}>
						Timestamp
						<span>{rowInfo.timestamp}</span>
					</p>
					<p className={classes.head}>
						URL <span>{rowInfo.url}</span>
					</p>
					<p className={classes.head}>
						HOST <span>{rowInfo.host}</span>
					</p>
					<p className={classes.head}>
						Client Address <span>{rowInfo.clientAddress}</span>
					</p>
					<p className={classes.head}>
						Proxy Address <span>{rowInfo.proxyAddress}</span>
					</p>
					<p className={classes.head}>
						Analysis Report{" "}
						<span>
							<a href={rowInfo.report}>Download</a>
						</span>
					</p>
					<p className={classes.head}>
						Request Time <span>{rowInfo.reqTime}</span>
					</p>
					<p className={classes.head}>
						Rebuild Time <span>{rowInfo.rebTime}</span>
					</p>
				</Modal>
			)}
		</>
	);
};

export default RequestHistory;
