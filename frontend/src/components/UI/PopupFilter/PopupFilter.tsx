import React from "react";
import classes from "./PopupFilter.module.scss";
import Filter from "../../Filters/Filter/Filter";

import { TransactionLogFilters } from "../../../types/TransactionLogFilter";

export interface PopupFilterProps {
	filters: Array<TransactionLogFilters>,
	externalStyles: string,
	openPopupHover: React.MouseEventHandler<HTMLDivElement>,
	closePopupHover: React.MouseEventHandler<HTMLDivElement>,
};

const PopupFilter = (props: PopupFilterProps) => {
	const addedFilter = props.filters.map((filter: TransactionLogFilters) => {
		let filterStyle = classes.fileType;
		if (filter.filterName === "Outcome") {
			filterStyle = classes.outcome;
		}
		return (
			<Filter
				key={filter.id}
				filter={filter.filterName}
				externalStyles={filterStyle}
				checkboxList={filter.checkboxList} />
		);
	});
	return (
		<section
			className={[classes.PopupFilter, props.externalStyles].join(" ")}
			onMouseEnter={props.openPopupHover}
			//onMouseLeave={closePopupHover}
		>
			<div className={classes.inner}>{addedFilter}</div>
		</section>
	);
};

export default PopupFilter;
