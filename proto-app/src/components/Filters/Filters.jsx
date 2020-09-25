import React, { useState } from "react";
import classes from "./Filters.module.scss";

import Button from "../UI/Button/Button";

import Popup from "../UI/Popup/Popup";
import Filter from "./Filter/Filter";
import PopupFilter from "../UI/PopupFilter/PopupFilter";

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
	const [openPopup, setOpenPopup] = useState(false);
	const [openFilter, setOpenFilter] = useState(null);

	const clsList = [classes.filters];
	const clsMoreFilters = [classes.moreFilters];
	const clsHeader = [classes.header];

	if (openFilterRow) {
		clsList.push(classes.expanded);
		clsMoreFilters.push(classes.hide);
		clsHeader.push(classes.rotate);
	}

	const filterList = [
		{
			name: "File Types",
			onClickButtonHandler: function () {
				setOpenFilter("File Types");
			},
		},
		{
			name: "Outcomes",
			onClickButtonHandler: function () {
				setOpenFilter("Outcomes");
			},
		},
		{ name: "File ID" },
		{ name: "File Name" },
	];

	const openFilterRowHandler = () => {
		setOpenFilterRow((prevState) => !prevState);
		setOpenPopup(false);
		setOpenFilter(null);
	};

	const openPopupHandler = () => {
		setOpenPopup((prevState) => !prevState);
		setOpenFilter(null);
	};

	const closePopupHoverHandler = () => {
		setOpenPopup(false);
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

	return (
		<section className={classes.Filters}>
			<div className={classes.wrap}>
				<div className={clsHeader.join(" ")} onClick={openFilterRowHandler}>
					<h2>Filters</h2>
					<span className={clsMoreFilters.join(" ")}>More Filters...</span>
				</div>
				<div className={classes.footer}>
					<div className={clsList.join(" ")}></div>
					{openFilterRow ? (
						<Button
							buttonType={"button"}
							buttonClasses={classes.addFilter}
							onButtonClick={openPopupHandler}
						>
							+ Add Filter
						</Button>
					) : null}
				</div>
			</div>
			{openPopup ? (
				<Popup
					links={filterList}
					openPopupHover={() => setOpenPopup(true)}
					closePopupHover={() => setOpenPopup(false)}
				></Popup>
			) : null}

			{openFilter && openPopup ? (
				<PopupFilter
					stylePopup={{
						top: "18rem",
						left: "24rem",
						padding: "2rem",
						zIndex: "1000",
					}}
					openPopupHover={() => setOpenPopup(true)}
					closePopupHover={closePopupHoverHandler}
				>
					{innerContent}
				</PopupFilter>
			) : null}
		</section>
	);
};

export default Filters;
