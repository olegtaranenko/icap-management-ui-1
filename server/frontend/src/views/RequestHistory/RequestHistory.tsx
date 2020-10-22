import React, { useState, useContext, useEffect } from "react";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";
//import FileInfo from "./FileInfo/FileInfo";
import FileRow from "./FileRow/FileRow";
import Filters from "../../components/Filters/Filters";
import Modal from "../../components/UI/Modal/Modal";

import { Filter as TFilter } from "../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import Routes from "../../Routes";
import getTransactions from "./api/getTranasctions";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
} from "@material-ui/core";

import classes from "./RequestHistory.module.scss";

const requestHistoryRoutes = Routes.requestHistoryRoutes();

const RequestHistory = () => {
	const [openModal, setOpenModal] = useState(false);
	//const [selectedRowId, setSelectedRowId] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);

	const [transactions, setTransactions] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { selectedFilters, requestHistoryTimeFilter } = useContext(GlobalStoreContext);

	const clsWrapTable = [classes.wrapTable];

	if (openPopup) {
		clsWrapTable.push(classes.notActive);
	}

	const openInfoModal = (id: string) => {
		setOpenModal((prevState) => !prevState);
		//setSelectedRowId(id);
	};

	const closeInfoModal = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		setIsLoading(true);

		const getRows = async () => {
			const Risks = selectedFilters
				.filter(f => f.filter === "Outcome")
				.map(outcomeFilter => outcomeFilter.riskEnum);

			const FileTypes = selectedFilters
				.filter(f => f.filter !== "Outcome")
				.map(fileTypeFilter => fileTypeFilter.fileTypeEnum);

			const requestBody: TFilter = {
				TimestampRangeStart: requestHistoryTimeFilter.timestampRangeStart,
				TimestampRangeEnd: requestHistoryTimeFilter.timestampRangeEnd,
				Risks,
				FileTypes
			};

			try {
				const transactionResponse = await getTransactions(requestHistoryRoutes.getTransactionsRoute, requestBody);
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilters, requestHistoryTimeFilter]);

	//const fileInfo = transactions.find((it) => it.id === selectedRowId);

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
								<TableContainer className={classes.container}>
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
													Outcome
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody className={classes.tbody}>
											{!isError &&
												<>
													{transactions.count > 0 &&
														<>
															{transactions.files.map((f: any) => {
																return (
																	<FileRow
																		key={f.fileId.value}
																		id={f.fileId.value}
																		timestamp={f.timestamp}
																		fileId={f.fileId.value}
																		type={f.fileType}
																		outcome={f.risk}
																		onRowClickHandler={(evt) => openInfoModal((evt.target as HTMLElement).id)} />
																);
															})}
														</>
													}

													{transactions.count === 0 &&
														<TableRow>
															<TableCell colSpan={4} className={classes.emptyTableCell}>
																<h2>No Transaction Data Found</h2>
															</TableCell>
														</TableRow>
													}
												</>}

											{isError &&
												<TableRow>
													<TableCell colSpan={4} className={classes.emptyTableCell}>
														<h2>Error Getting Transaction Data</h2>
													</TableCell>
												</TableRow>
											}
										</TableBody>
									</Table>
								</TableContainer>
							</>
						}
					</div>
					{openModal && (
						<Modal onCloseHandler={closeInfoModal}>
							{/* <FileInfo data={fileInfo} /> */}
						</Modal>
					)}
				</article>
			</Main>
		</>
	);
};

export default RequestHistory;
