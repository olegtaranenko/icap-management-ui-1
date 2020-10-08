import React, { useState, useContext } from "react";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import classes from "./Filters.module.scss";

import checkValidity from "../../shared/checkValidity";

import Button from "../UI/Button/Button";
import Popup from "../UI/Popup/Popup";
import PopupFilter from "../UI/PopupFilter/PopupFilter";
import SelectedFilter from "../UI/SelectedFilter/SelectedFilter";
import DateAndTimePickers from "../UI/DateAndTimePickers/DateAndTimePickers";
import Input from "../UI/Input/Input";

const Filters = ({ popupIsOpen, changeVisibilityPopup }) => {
	const [openFilterRow, setOpenFilterRow] = useState(false);
	const [openFilter, setOpenFilter] = useState(null);
	const [openFileId, setOpenFileId] = useState(false);

	const [fileIdValue, setFileIdValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [isTouched, setIsTouched] = useState(false);

	const {
		addFilterInput,
		fileFilter,
		outcomeFilter,
		selectedFilters,
		removeFilter,
	} = useContext(GlobalStoreContext);

	const clsList = [classes.filters];
	const clsMoreFilters = [classes.moreFilters];
	const clsArrow = [classes.arrow];

	if (openFilterRow) {
		clsList.push(classes.expanded);
		clsMoreFilters.push(classes.hide);
		clsArrow.push(classes.rotate);
	}

	const filterList = [
		{
			name: "File Types",
			onClickButtonHandler: () => {
				setOpenFileId(false);
				setOpenFilter("File Types");
			},
		},
		{
			name: "Outcomes",
			onClickButtonHandler: () => {
				setOpenFileId(false);
				setOpenFilter("Outcomes");
			},
		},
		{
			name: "File ID",
			onClickButtonHandler: () => {
				setOpenFilter(null);
				setOpenFileId((prevState) => !prevState);
			},
		},
	];

	const openFilterRowHandler = () => {
		setOpenFilterRow((prevState) => !prevState);
		changeVisibilityPopup(false);
		setOpenFilter(null);
	};

	const openPopupHandler = () => {
		changeVisibilityPopup((prevState) => !prevState);
		setOpenFilter(null);
	};

	const closePopupHoverHandler = () => {
		changeVisibilityPopup(false);
		setOpenFilter(null);
	};

	const inputChangedHandler = (inputValue) => {
		setFileIdValue(inputValue);
		setIsValid(checkValidity(inputValue));
		setIsTouched(true);
	};

	const submitHandler = (evt) => {
		evt.preventDefault();
		addFilterInput({
			id: fileIdValue,
			value: fileIdValue,
			filter: "File ID",
		});
	};

	let filter = null;
	let filterStyle = null;

	switch (openFilter) {
		case "File Types":
			filter = fileFilter;
			filterStyle = classes.popupFilterFileType;
			break;

		case "Outcomes":
			filter = outcomeFilter;
			filterStyle = classes.popupFilterOutcome;
			break;
		default:
			filter = null;
			filterStyle = null;
			break;
	}

	const selectedFiltersArr = selectedFilters.map(
		({ id, value, filter, titleColor }) => {
			return (
				<SelectedFilter
					key={id}
					id={id}
					filter={filter}
					value={value}
					titleColor={titleColor}
					remove={removeFilter}
				/>
			);
		}
	);

	return (
		<section className={classes.Filters}>
			<div className={classes.wrap}>
				<div className={classes.header}>
					<h2 className={classes.head}>Filters</h2>

					<button
						className={clsMoreFilters.join(" ")}
						onClick={openFilterRowHandler}
					>
						More Filters...
					</button>
					<span
						onClick={openFilterRowHandler}
						className={clsArrow.join(" ")}
					/>
				</div>
				<DateAndTimePickers externalStyles={classes.pickers} />
				<div className={classes.footer}>
					<div className={clsList.join(" ")}>
						{openFilterRow && (
							<div className={classes.storyLine}>{selectedFiltersArr}</div>
						)}
					</div>
					{openFilterRow && (
						<div>
							<Button
								buttonType={"button"}
								externalStyles={classes.addFilter}
								onButtonClick={openPopupHandler}
							>
								+ Add Filter
							</Button>
						</div>
					)}
				</div>

				{popupIsOpen ? (
					<>
						<Popup
							links={filterList}
							externalStyles={classes.popup}
							openPopupHover={() => changeVisibilityPopup(true)}
							closePopupHover={() => changeVisibilityPopup(false)}
						/>
						{openFilter && (
							<PopupFilter
								filter={filter}
								selectedFilters={selectedFilters}
								externalStyles={filterStyle}
								openPopupHover={() => changeVisibilityPopup(true)}
								closePopupHover={closePopupHoverHandler}
							/>
						)}

						{openFileId && (
							<form
								className={classes.fileId}
								onSubmit={submitHandler}
								onMouseEnter={() => changeVisibilityPopup(true)}
							>
								<Input
									type="text"
									name="fileId"
									externalStyles={classes.inputFileId}
									autofocus
									placeholder={"File ID"}
									value={fileIdValue}
									valid={isValid}
									touched={isTouched}
									onChange={(evt) => {
										inputChangedHandler(evt.target.value);
									}}
								/>
								<button
									type="submit"
									className={classes.addButton}
									disabled={!isValid}
								>
									+ ADD
								</button>
							</form>
						)}
					</>
				) : null}
			</div>
		</section>
	);
};

export default Filters;
