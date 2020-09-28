import React from "react";
import classes from "./Modal.module.scss";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import Backdrop from "../UI/Backdrop/Backdrop";

const Modal = ({ data, onClose, styleModal }) => {
	const {
		name,
		outcome,
		timestamp,
		url,
		clientAddress,
		proxyAddress,
		reqTime,
		rebTime,
		fileSize,
	} = data;

	return (
		<>
			<section className={classes.Modal} style={styleModal}>
				<header className={classes.header}>
					<h2>Request Details: {name}</h2>
					<div>
						<span>{outcome}</span>
						<button type="button" onClick={onClose}>
							X
						</button>
					</div>
				</header>

				<div className={classes.inner}>
					<div className={classes.block}>
						<h3>Request Info</h3>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Timestamp</TableCell>
									<TableCell>URL</TableCell>
									<TableCell>Outcome</TableCell>
									<TableCell>Client Address</TableCell>
									<TableCell>Proxy Address</TableCell>
									<TableCell>Request Time</TableCell>
									<TableCell>Rebuild Time</TableCell>
									<TableCell>File Size</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow className={classes.noborder}>
									<TableCell>{timestamp}</TableCell>
									<TableCell>{url}</TableCell>
									<TableCell>{outcome}</TableCell>
									<TableCell>{clientAddress}</TableCell>
									<TableCell>{proxyAddress}</TableCell>
									<TableCell>{reqTime}</TableCell>
									<TableCell>{rebTime}</TableCell>
									<TableCell>{fileSize}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
					<div className={classes.block}>
						<h3>Sanitisation Items</h3>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Issue</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Count</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>0x05cf00ec</TableCell>
									<TableCell>Metadata detected in Created</TableCell>
									<TableCell>1</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>0x05cf00e5</TableCell>
									<TableCell>Metadata detected in Subject</TableCell>
									<TableCell>1</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>0x05cf00db</TableCell>
									<TableCell>Metadata detected in Company</TableCell>
									<TableCell>1</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
					<div className={classes.block}>
						<h3>Content Management Policy Details</h3>
					</div>
				</div>
			</section>
			<Backdrop onClickOutside={onClose} />
		</>
	);
};

export default Modal;
