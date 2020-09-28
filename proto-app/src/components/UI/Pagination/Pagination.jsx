import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TableFooter, TableRow } from "@material-ui/core";
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
		<div>
			<TableFooter>
				<TableRow className={classes.root}>
					<Pagination count={1} variant="outlined" shape="rounded" />
				</TableRow>
			</TableFooter>
		</div>
	);
};

export default Pagination1;
