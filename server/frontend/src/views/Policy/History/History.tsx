import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./History.module.scss";

import previousPolicy from "../../../data/prevPolicy.json";

import HistoryRow from "./HistoryRow/HistoryRow";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

export interface HistoryProps {
	setPrevPolicy: () => void,
	isCurrent: boolean
}

const History = (props: HistoryProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const rows = previousPolicy.map(({ id, timestamp, userEmail }) => {
		return (
			<HistoryRow
				key={id}
				id={id}
				isCurrent={props.isCurrent}
				openPreviousPolicyModalHandler={() => setModalIsOpen(true)}
				activatePreviousPolicyHandler={props.setPrevPolicy}
				timestamp={timestamp}
				updatedBy={userEmail}
			/>
		);
	});
	return (
		<>
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
				}}
			>
				{/* <Modal onCloseHandler={() => setModalIsOpen(false)}>
					<HistoryInfo previousPolicy={previousPolicy as Policy[]} />
				</Modal> */}
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
	);
};

export default History;
