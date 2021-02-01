import React, { useReducer } from "react";
import moment from "moment";

import { AnalyticsContext } from "./analytics-context";
import { analyticsReducer } from "./analytics-reducers";

import * as actionTypes from "../actionTypes";

export const AnalyticsState = ({ children }) => {
	const initialState = {
		start: moment().subtract(29, "days"),
		end: moment(),
	};

	const [analyticsState, dispatch] = useReducer(
		analyticsReducer,
		initialState
	);

	const changeDateRange = (start, end) => {
		dispatch({
			type: actionTypes.CHANGE_DATE_RANGE,
			payload: { start, end },
		});
	};

	return (
		<AnalyticsContext.Provider
			value={{
				startDate: analyticsState.start,
				endDate: analyticsState.end,
				changeDateRange,
			}}
		>
			{children}
		</AnalyticsContext.Provider>
	);
};
