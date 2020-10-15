import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const Pagination1 = () => {
	const classes = useStyles();

	return (
		<Pagination
			className={classes.root}
			count={1}
			variant="outlined"
			shape="rounded"
		/>
	);
};

export default Pagination1;
