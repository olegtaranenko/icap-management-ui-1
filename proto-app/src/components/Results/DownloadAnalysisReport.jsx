import React from "react";
import Button from "../UI/Button/Button";

const clsButton = {
	fontSize: `1rem`,
	fontWeight: `800`,
	background: ` #1a919a`,
	padding: `1.25rem 2.75rem`,
	color: `white`,
	border: ` none`,
};

class DownloadAnalysisReport extends React.Component {
	getAnalysisReport = () => {
		const binaryData = [];
		binaryData.push(this.props.report);
		let url = window.URL.createObjectURL(
			new Blob(binaryData, { type: "text/xml" })
		);
		let a = document.createElement("a");
		a.href = url;
		a.download = this.props.filename + ".xml";
		a.click();
	};

	render() {
		return (
			<Button buttonStyle={clsButton} onClick={this.getAnalysisReport}>
				Download Analysis Report
			</Button>
		);
	}
}

export default DownloadAnalysisReport;
