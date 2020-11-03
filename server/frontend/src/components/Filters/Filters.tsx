import React, { useState, useContext, FormEvent, useEffect } from "react";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import checkValidity from "../../helpers/checkValidity";

import Button from "../UI/Button/Button";
import Popup, { PopupButton } from "../UI/Popup/Popup";
import PopupFilter from "../UI/PopupFilter/PopupFilter";
import SelectedFilter from "../UI/SelectedFilter/SelectedFilter";
import DaterangePicker from "../UI/DaterangePicker/DaterangePicker";
import Input from "../UI/Input/Input";
import { RequestHistoryTimeFilter } from "../../data/filters/RequestHistory/requestHistoryTimeFilter";

import classes from "./Filters.module.scss";


export interface FiltersProps {
	popupIsOpen: boolean,
	changeVisibilityPopup: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Filters = (props: FiltersProps) => {
	// @ts-ignore
	const { addFilterInput, fileFilter, riskFilter, selectedFilters, removeFilter, navExpanded, updateRequestHistoryTimeFilter, requestHistoryTimeFilter } = useContext(GlobalStoreContext);

	const [openFilterRow, setOpenFilterRow] = useState(false);
	const [openFilter, setOpenFilter] = useState(null);
	const [openFileId, setOpenFileId] = useState(false);

	const [fileIdValue, setFileIdValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [isTouched, setIsTouched] = useState(false);

	const [dateRangeFilter, setDateRangeFilter] = useState({
		start: requestHistoryTimeFilter.timestampRangeStart,
		end: requestHistoryTimeFilter.timestampRangeEnd
	});

	const clsList = [classes.filters];
	const clsMoreFilters = [classes.moreFilters];
	const clsArrow = [classes.arrow];

	if (openFilterRow) {
		clsList.push(classes.expanded);
		clsMoreFilters.push(classes.hide);
		clsArrow.push(classes.rotate);
	}

	const openFilterRowHandler = () => {
		setOpenFilterRow((prevState) => !prevState);
		props.changeVisibilityPopup(false);
		setOpenFilter(null);
	};

	const openPopupHandler = () => {
		props.changeVisibilityPopup((prevState) => !prevState);
		setOpenFilter(null);
	};

	const closePopupHoverHandler = () => {
		props.changeVisibilityPopup(false);
		setOpenFilter(null);
	};

	const inputChangedHandler = (inputValue: string) => {
		setFileIdValue(inputValue);
		setIsValid(checkValidity(inputValue));
		setIsTouched(true);
	};

	const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		addFilterInput({
			id: fileIdValue,
			value: fileIdValue,
			filter: "File ID",
		});
	};

	const onRangeChange = (start: moment.Moment, end: moment.Moment) => {
		setDateRangeFilter({start, end});
	}

	let selectedFilter = null;
	let filterStyle = null;

	switch (openFilter) {
		case "File Types":
			selectedFilter = fileFilter;
			filterStyle = classes.popupFilterFileType;
			break;

		case "Risk":
			selectedFilter = riskFilter;
			filterStyle = classes.popupFilterRisk;
			break;
		default:
			selectedFilter = null;
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

	const filterList: PopupButton[] = [
		{
			name: "File Types",
			onClickButtonHandler: () => {
				setOpenFileId(false);
				setOpenFilter("File Types");
			},
		},
		{
			name: "Risk",
			onClickButtonHandler: () => {
				setOpenFileId(false);
				setOpenFilter("Risk");
			},
		},
		// {
		// 	name: "File ID",
		// 	onClickButtonHandler: () => {
		// 		setOpenFilter(null);
		// 		setOpenFileId((prevState) => !prevState);
		// 	},
		// },
	];

	useEffect(() => {
		const newTimeFilter: RequestHistoryTimeFilter = {
			timestampRangeStart: dateRangeFilter.start,
			timestampRangeEnd: dateRangeFilter.end
		};

		updateRequestHistoryTimeFilter(newTimeFilter);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateRangeFilter]);

	return (
		<section className={`${classes.Filters} ${navExpanded ? classes.expanded : ""}`}>
			<div className={classes.wrap}>
				<div className={classes.header}>
					<h2 className={classes.head}>Filters</h2>

					<button
						className={clsMoreFilters.join(" ")}
						onClick={openFilterRowHandler}>
						More Filters...
					</button>
					<span
						onClick={openFilterRowHandler}
						className={clsArrow.join(" ")} />

					<DaterangePicker
						initialRange={dateRangeFilter}
						onRangeChange={onRangeChange}
						externalStyles={classes.pickers} />
				</div>
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
								disabled={false}>
								+ Add Filter
							</Button>
						</div>
					)}
				</div>

				{props.popupIsOpen ? (
					<>
						<Popup
							popupButtons={filterList}
							externalStyles={classes.popup}
							openPopupHover={() => props.changeVisibilityPopup(true)}
							closePopupHover={() => props.changeVisibilityPopup(false)}>
							{openFilter && (
								<PopupFilter
									filters={selectedFilter}
									externalStyles={filterStyle}
									openPopupHover={() => props.changeVisibilityPopup(true)}
									closePopupHover={closePopupHoverHandler}
								/>
							)}
						</Popup>

						{openFileId && (
							<form
								className={classes.fileId}
								onSubmit={submitHandler}
								onMouseEnter={() => props.changeVisibilityPopup(true)}
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
									onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
										inputChangedHandler(evt.target.value);
									}}
									disabled={false}
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
