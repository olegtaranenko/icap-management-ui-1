import React, { useState } from "react";
import classes from "./Filters.module.scss";

import Button from "../UI/Button/Button";
import Modal from "../Modal/Modal";
import Filter from "./Filter/Filter";

const fileTypeList = [
	{
		id: "microsoftword",
		filterName: "Microsoft Word",
		checkboxList: [
			{ type: "checkbox", head: "doc", name: "docType", id: "doc" },
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

const Filters = () => {
	const [openFilterRow, setOpenFilterRow] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [openFilter, setOpenFilter] = useState(null);

	const clsList = [classes.filters];
	const clsMoreFilters = [classes.moreFilters];

	if (openFilterRow) {
		clsList.push(classes.expanded);
		clsMoreFilters.push(classes.hide);
	}

	const openFilterRowHandler = () => {
		setOpenFilterRow((prevState) => !prevState);
		setOpenModal(false);
		setOpenFilter(null);
	};

	const openModalHandler = () => {
		setOpenModal((prevState) => !prevState);
		setOpenFilter(null);
	};

	let innerContent = null;

	if (openFilter === "File Types") {
		innerContent = fileTypeList.map(({ id, filterName, checkboxList }) => {
			return (
				<Filter
					key={id}
					filterName={filterName}
					checkboxList={checkboxList}
				/>
			);
		});
	} else if (openFilter === "Outcomes") {
		innerContent = outcomeList.map(({ id, filterName, checkboxList }) => {
			return (
				<Filter
					key={id}
					filterName={filterName}
					checkboxList={checkboxList}
				/>
			);
		});
	}
	// else if (fileInfo) {
	//	innerContent = <FileInfo row={fileInfo} />;
	//}
	//else {
	//	return innerContent = null;
	//}

	return (
		<section className={classes.Filters}>
			<div className={classes.wrap}>
				<div className={classes.header} onClick={openFilterRowHandler}>
					<h2>Filters</h2>
					<span className={clsMoreFilters.join(" ")}>More Filters...</span>
				</div>
				<div className={classes.footer}>
					<div className={clsList.join(" ")}></div>
					{openFilterRow ? (
						<Button
							buttonType={"button"}
							buttonClasses={classes.addFilter}
							onButtonClick={openModalHandler}
						>
							+ Add Filter
						</Button>
					) : null}
				</div>
			</div>
			{openModal ? (
				<>
					<Modal
						styleModal={{ top: "189px", left: "78px" }}
						onClose={() => setOpenModal(false)}
					>
						<ul className={classes.filterList}>
							<li>
								<button
									type="button"
									onClick={() => {
										setOpenFilter("File Types");
									}}
								>
									File Types
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => {
										setOpenFilter("Outcomes");
									}}
								>
									Outcomes
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => {
										setOpenFilter("File ID");
									}}
								>
									File ID
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => {
										setOpenFilter("File Name");
									}}
								>
									File Name
								</button>
							</li>
						</ul>
					</Modal>
					{openFilter ? (
						<Modal
							styleModal={{
								top: "18rem",
								left: "24rem",
								padding: "2rem",
								zIndex: "1000",
							}}
						>
							{innerContent}
						</Modal>
					) : null}
				</>
			) : null}
		</section>
	);
};

export default Filters;
