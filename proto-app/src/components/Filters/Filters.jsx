import React, { useState, useContext, useEffect } from "react";
import GlobalStoreContext from "../../context/globalStore/globalStore-context";

import classes from "./Filters.module.scss";

import Button from "../UI/Button/Button";
import Popup from "../UI/Popup/Popup";
import PopupFilter from "../UI/PopupFilter/PopupFilter";
import SelectedFilter from "../UI/SelectedFilter/SelectedFilter";

const Filters = () => {
	const [openFilterRow, setOpenFilterRow] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [openFilter, setOpenFilter] = useState(null);

	const {
		fileFilter,
		outcomeFilter,
		selectedFilters,
		removeFilter,
	} = useContext(GlobalStoreContext);

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

	let filter = null;

	switch (openFilter) {
		case "File Types":
			filter = fileFilter;
			break;

		case "Outcomes":
			filter = outcomeFilter;
			break;

		default:
			filter = null;
			break;
	}

	console.log(selectedFilters);

	const selectedFiltersArr = selectedFilters.map(({ id, value, filter }) => {
		return (
			<SelectedFilter
				key={id}
				id={id}
				filter={filter}
				value={value}
				remove={removeFilter}
			/>
		);
	});

	return (
		<section className={classes.Filters}>
			<div className={classes.wrap}>
				<div className={clsHeader.join(" ")} onClick={openFilterRowHandler}>
					<h2>Filters</h2>
					<span className={clsMoreFilters.join(" ")}>More Filters...</span>
				</div>
				<div className={classes.footer}>
					<div className={clsList.join(" ")}>
						<div className={classes.storyLine}>{selectedFiltersArr}</div>
					</div>
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
				/>
			) : null}
			{openFilter && openPopup ? (
				<PopupFilter
					filter={filter}
					selectedFilters={selectedFilters}
					externalStyles={classes.popupFilter}
					openPopupHover={() => setOpenPopup(true)}
					closePopupHover={closePopupHoverHandler}
				/>
			) : null}
		</section>
	);
};

export default Filters;
