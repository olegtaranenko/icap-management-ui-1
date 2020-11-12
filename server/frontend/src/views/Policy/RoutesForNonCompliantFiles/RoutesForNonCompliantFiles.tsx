import React from "react";

import classes from "./RoutesForNonCompliantFiles.module.scss";

import DomainField from "../DomainField/DomainField";

export interface RoutesForNonCompliantFilesProps {
	userDomain: string,
	changeInput: (domain: string) => void
}

const RoutesForNonCompliantFiles = (props: RoutesForNonCompliantFilesProps) => {
	return (
		<div className={classes.RoutesForNonCompliantFiles}>
			<section className={classes.routes}>
				<h2 className={classes.head}>Routes for non-compliant files</h2>
				<p>
					We will route that do not comply with the current for passage onto
					separate file systems.Specified file systems and routing
					mechanism(s) will be determined at the Enchancement 4 Technical
					Exchange Meeting and subsquently in the Echancement 4 Design
					Document.
				</p>
				<div className={classes.table}>
					<DomainField
						name={props.userDomain}
						onChangeInputHandler={(event: any) => props.changeInput(event.target.value)}
					/>
				</div>
			</section>
		</div>
	);
};

export default RoutesForNonCompliantFiles;
