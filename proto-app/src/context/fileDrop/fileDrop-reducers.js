import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const setResultFromServer = (state, result) => {
	console.log(state);
	console.log(result);

	return updateObject(state, {
		analysisReport: result.analysisReport,
		analysisReportString: result.analysisReportString,
		file: result.file,
		fileProcessed: result.fileProcessed,
	});
};

export const fileDropReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_RESULT_FROM_SERVER:
			return setResultFromServer(state, action.result);
		default:
			return state;
	}
};
