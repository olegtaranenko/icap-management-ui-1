import React, { useContext, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import HistoryRow from "./HistoryRow/HistoryRow";
import Modal from "../../../components/UI/Modal/Modal";
import HistoryInfo from "./HistoryInfo/HistoryInfo";

import { PolicyContext } from "../../../context/policy/PolicyContext";

import classes from "./History.module.scss";
import { PolicyType } from "../../../../../src/common/models/enums/PolicyType";

// export interface HistoryProps {
// 	setPrevPolicy: () => void,
// 	isCurrent: boolean
// }

const History = () => {
	const {
		status,
		currentPolicy,
		policyHistory,
		loadPolicyHistory
	} = useContext(PolicyContext);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedPolicy, setSelectedPolicy] = useState<Policy>(null);

	const openPolicyModal = (policyId: string) => {
		setSelectedPolicy(
			policyHistory.policies.find(policy => policy.id === policyId));
		setModalIsOpen(true);
	};

	useEffect(() => {
		loadPolicyHistory();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{status === "LOADING" &&
				<div className={classes.History}>
					Loading...
				</div>
			}

			{status === "ERROR" &&
				<div>Error getting Policy data.</div>
			}

			{status === "LOADED" && policyHistory !== null &&
				<>
					<div className={classes.History}>
						<div className={classes.container}>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell>Timestamp</TableCell>
										<TableCell>Updated By</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className={classes.tbody}>
									{policyHistory.policies.map((policy: Policy) => {
										return (
											<HistoryRow
												key={policy.id}
												id={policy.id}
												isCurrent={policy.policyType === PolicyType.Current}
												openPreviousPolicyModalHandler={() => openPolicyModal(policy.id)}
												activatePreviousPolicyHandler={() => alert("publish old policy")} // TODO: Update
												timestamp={new Date(policy.created).toLocaleString()}
												updatedBy={policy.updatedBy ? policy.updatedBy : "N/A"}
											/>
										)
									})}
								</TableBody>
							</Table>
						</div>
					</div>
					<CSSTransition
						in={modalIsOpen}
						timeout={300}
						mountOnEnter
						unmountOnExit
						classNames={{
							enter: classes.openPopupEnter,
							enterActive: classes.openPopupEnterActive,
							exit: classes.closePopupExit,
							exitActive: classes.closePopupExitActive,
						}}>
						<Modal onCloseHandler={() => setModalIsOpen(false)}>
							<HistoryInfo policy={selectedPolicy} />
						</Modal>
					</CSSTransition>
					<CSSTransition
						in={modalIsOpen}
						timeout={300}
						mountOnEnter
						unmountOnExit
						classNames={{
							enter: classes.openBackdropEnter,
							enterActive: classes.openBackdropEnterActive,
							exit: classes.closeBackdropExit,
							exitActive: classes.closeBackdropExitActive,
						}}
					>
						<Backdrop onClickOutside={() => setModalIsOpen(false)} />
					</CSSTransition>
				</>
			}
		</>
	);
};

export default History;
