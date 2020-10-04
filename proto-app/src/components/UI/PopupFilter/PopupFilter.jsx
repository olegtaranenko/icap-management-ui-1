import React from "react";
import classes from "./PopupFilter.module.scss";
import Filter from "../../Filters/Filter/Filter";

const PopupFilter = ({
	filter,
	externalStyles,
	openPopupHover,
	closePopupHover,
}) => {
	console.log(filter);
	const addedFilter = filter.map(({ id, filterName, checkboxList }) => {
		return (
			<Filter key={id} filter={filterName} checkboxList={checkboxList} />
		);
	});
	return (
		<section
			className={[classes.PopupFilter, externalStyles].join(" ")}
			onMouseEnter={openPopupHover}
			onMouseLeave={closePopupHover}
		>
			<div className={classes.inner}>{addedFilter}</div>
		</section>
	);
};

export default PopupFilter;
