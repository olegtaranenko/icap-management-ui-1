import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const changePageTitle = (state, title) => {
	return updateObject(state, { title: title });
};

export const globalStoreReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_PAGE_TITLE:
			return changePageTitle(state, action.title);
		default:
			return state;
	}
};
