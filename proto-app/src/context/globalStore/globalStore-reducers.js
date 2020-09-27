import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const changePageTitle = (state, title) => {
	return updateObject(state, { title: title });
};

const _checkboxChange = (updateFilter, changeFilter) => {
	updateFilter.map((filter) => {
		if (changeFilter.filter === filter.filterName) {
			return filter.checkboxList.map((checkbox) => {
				if (checkbox.id === changeFilter.id) {
					return (checkbox.isChecked = !checkbox.isChecked);
				}
			});
		}
	});
};

const addFilterToSelected = (state, addedFilter) => {
	let updatedList = [...state.selectedFilters];

	_checkboxChange([...state.fileFilter], addedFilter);

	if (updatedList.length <= 0 || addedFilter.checked === true) {
		updatedList.push(addedFilter);
	} else {
		updatedList = updatedList.filter(
			(filter) => addedFilter.id !== filter.id
		);
	}

	return updateObject(state, {
		selectedFilters: updatedList,
	});
};

const removeFilterFromSelected = (state, removedFilter) => {
	const updateCheckbox = [...state.fileFilter];

	updateCheckbox.map((filter) => {
		if (removedFilter.filter === filter.filterName) {
			filter.checkboxList.map((checkbox) => {
				if (checkbox.id === removedFilter.id) {
					return (checkbox.isChecked = !checkbox.isChecked);
				}
			});
		}
	});

	const updatedList = [...state.selectedFilters].filter(
		(filter) => filter.id !== removedFilter.id
	);

	return updateObject(state, {
		selectedFilters: updatedList,
	});
};

export const globalStoreReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_PAGE_TITLE:
			return changePageTitle(state, action.title);
		case actionTypes.ADD_FILTER:
			return addFilterToSelected(state, action.filter);
		case actionTypes.REMOVE_FILTER:
			return removeFilterFromSelected(state, action.filter);
		default:
			return state;
	}
};
