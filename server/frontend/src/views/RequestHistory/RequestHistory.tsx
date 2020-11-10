import React, { useState, useContext, useEffect } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import { Filter as TFilter } from "../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";

import { getTransactions } from "./api/index";
import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";
import FileInfo from "./FileInfo/FileInfo";
import FileRow from "./FileRow/FileRow";
import Filters from "./Filters/Filters";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./RequestHistory.module.scss";

const RequestHistory = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [transactions, setTransactions] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { selectedFilters, requestHistoryTimeFilter } = useContext(GlobalStoreContext);

	const clsWrapTable = [classes.wrapTable];

	if (openPopup) {
		clsWrapTable.push(classes.notActive);
	}

	const openInfoModal = (fileId: { value: string }) => {
		setOpenModal((prevState) => !prevState);

		const file = transactions.files.find(
			(f: any) => f.fileId.value === fileId
		);

		setSelectedFile(file);
	};

	const closeInfoModal = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);

		const getRows = async () => {
			const Risks = selectedFilters
				.filter(f => f.filter === "Risk")
				.map(riskFilter => riskFilter.riskEnum);

			const FileTypes = selectedFilters
				.filter(f => f.filter !== "Risk")
				.map(fileTypeFilter => fileTypeFilter.fileTypeEnum);

			const requestBody: TFilter = {
				TimestampRangeStart: requestHistoryTimeFilter.timestampRangeStart.toDate(),
				TimestampRangeEnd: requestHistoryTimeFilter.timestampRangeEnd.toDate(),
				Risks,
				FileTypes
			};

			try {
				const transactionResponse =
					await getTransactions(requestBody);
				setTransactions(JSON.parse(transactionResponse));
			}
			catch (error) {
				setIsError(true);
			}
			finally {
				setIsLoading(false);
			}
		}

		getRows();

	}, [selectedFilters, requestHistoryTimeFilter, setIsError, setIsLoading]);

	return (
		<>
			<MainTitle />

			<Filters popupIsOpen={openPopup} changeVisibilityPopup={setOpenPopup} />

			<Main externalStyles={classes.main}>
				<article className={classes.container}>
					<div className={clsWrapTable.join(" ")}>
						{isLoading &&
							<div>Loading...</div>
						}

						{!isLoading &&
							<>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>
												Timestamp
												</TableCell>

											<TableCell>
												File ID
												</TableCell>

											<TableCell>
												File Type
												</TableCell>

											<TableCell>
												Risk (Transaction)
												</TableCell>
										</TableRow>
									</TableHead>
									<TableBody className={classes.tbody}>
										{!isError && transactions &&
											<>
												{transactions.count > 0 &&
													<>
														{transactions.files.map((f: any) => {
															return (
																<FileRow
																	key={f.fileId.value}
																	id={f.fileId.value}
																	timestamp={f.timestamp}
																	fileId={f.fileId}
																	type={f.fileType}
																	risk={f.risk}
																	onRowClickHandler={() => openInfoModal(f.fileId.value)} />
															);
														})}
													</>
												}

												{transactions.count === 0 &&
													<TableRow className={classes.emptyTableRow}>
														<TableCell colSpan={4} className={classes.emptyTableCell}>
															<h2>No Transaction Data Found</h2>
														</TableCell>
													</TableRow>
												}
											</>}

										{isError &&
											<TableRow className={classes.emptyTableRow}>
												<TableCell colSpan={4} className={classes.emptyTableCell}>
													<h2>Error Getting Transaction Data</h2>
												</TableCell>
											</TableRow>
										}
									</TableBody>
								</Table>
							</>
						}
					</div>
					{!isError && openModal && (
						<Modal onCloseHandler={closeInfoModal} externalStyles={classes.modal}>
							<FileInfo fileData={selectedFile} />
						</Modal>
					)}
				</article>
			</Main>
		</>
	);
};

export default RequestHistory;