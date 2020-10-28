import React, { useState, useEffect } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { FileDetailsStatus } from "../../../enums/FileDetailsStatus";
import { FileType } from "../../../enums/FileType";
import { Risk } from "../../../enums/Risk";
import { getTransactionDetails } from "../api/index";

import classes from "./FileInfo.module.scss";

interface FileData {
	timestamp: Date,
	fileId: { value: string },
	fileType: number,
	risk: number,
	activePolicyId: { value: string },
	directory: string
}

export interface FileInfoProps {
	fileData: FileData
}

const FileInfo = (props: FileInfoProps) => {
	const [transactionDetails, setTransactionDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);

		const getDetails = async () => {
			try {
				const transactionDetailResponse =
					await getTransactionDetails(props.fileData.directory);
				setTransactionDetails(JSON.parse(transactionDetailResponse));
			}
			catch (error) {
				setIsError(true);
			}
			finally {
				setIsLoading(false);
			}
		}

		getDetails();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let background = null;
	switch (Risk[props.fileData.risk]) {
		case "Allowed by Policy":
			background = "#86C1CB";
			break;
		case "Blocked by Policy":
			background = "#DF9F81";
			break;
		case "Allowed by NCFS":
			background = "#7a7aff";
			break;
		case "Blocked by NCFS":
			background = "#ff8d8d";
			break;
		case "Safe":
			background = "#91CAA8";
			break;
		default:
			background = "";
	}

	return (
		<section className={classes.FileInfo}>
			<header className={classes.header}>
				<h2>File ID: {props.fileData.fileId.value}</h2>
				<div>
					<span style={{ background }}>{Risk[props.fileData.risk]}</span>
				</div>
			</header>

			<div className={classes.inner}>
				<div className={classes.block}>
					<h3>Request Info</h3>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Timestamp</TableCell>
								<TableCell>Unique File ID</TableCell>
								<TableCell>Detected File Extension</TableCell>
								<TableCell>Risk (Transaction)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow className={classes.noborder}>
								<TableCell>{props.fileData.timestamp}</TableCell>
								<TableCell>{props.fileData.fileId.value}</TableCell>
								<TableCell>{FileType[props.fileData.fileType]}</TableCell>
								<TableCell>{Risk[props.fileData.risk]}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>

				{isLoading &&
					<div>Loading...</div>
				}

				{!isLoading &&
					<>
						{isError &&
							<Table className={classes.table}>
								<TableBody>
									<TableRow>
										<TableCell className={classes.emptyTableCell}>
											<h2>Error Getting Transaction Details</h2>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						}

						{!isError &&
							<div>
								{transactionDetails.status === FileDetailsStatus.Success &&
									<TransactionDetails analysisReport={transactionDetails.analysisReport} />
								}
							</div>
						}
					</>
				}

			</div>
		</section>
	);
};

export default FileInfo;
