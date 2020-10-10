import React from "react";
import classes from "./RenderResults.module.scss";

import RenderAnalysis from "./RenderAnalysis/RenderAnalysis";
import SectionTitle from "../SectionTitle/SectionTitle";
import DownloadAnalysisReport from "./DownloadAnalysisReport/DownloadAnalysisReport";
import FileAttributes from "./FileAttributes/FileAttributes";
import ButtonsContainer from "../ButtonsContainer/ButtonsContainer";
import Button from "../UI/Button/Button";

function RenderResults({
	file,
	analysisReport,
	analysisReportString,
	validation,
	isShowResult,
}) {
	if (validation) {
		return (
			<div className="validationErrors">
				<p>{validation}</p>
			</div>
		);
	}

	if (file && analysisReport) {
		const sanitisations = analysisReport.getElementsByTagName(
			"gw:SanitisationItem"
		);
		const remediations = analysisReport.getElementsByTagName("gw:RemedyItem");
		const issues = analysisReport.getElementsByTagName("gw:IssueItem");
		const [
			{ value: fileType } = { value: "unknown" },
		] = analysisReport.getElementsByTagName("gw:FileType");
		const { name: fileName } = file;
		const hasIssues = !!issues.length;

		if (
			!isShowResult &&
			(sanitisations.length || remediations.length || hasIssues)
		) {
			return (
				<div className={classes.RenderResults}>
					<SectionTitle externalStyles={classes.headline}>
						Analisys Report
					</SectionTitle>

					<div className={classes.container}>
						<ButtonsContainer externalStyles={classes.buttons}>
							<Button
								//onButtonClick={() => setShowResult(true)}
								externalStyles={classes.button}
							>
								PDF
							</Button>
							<Button
								//onButtonClick={() => setShowResult(true)}
								externalStyles={classes.button}
							>
								XML
							</Button>
						</ButtonsContainer>
						<FileAttributes file={file} fileType={fileType} />
						<RenderAnalysis
							remediations={remediations}
							sanitisations={sanitisations}
							issues={issues}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div className={[classes.RenderResults, classes.result].join(" ")}>
					<SectionTitle>File is clean!</SectionTitle>
					<DownloadAnalysisReport
						report={analysisReportString}
						filename={fileName}
					/>
					<FileAttributes file={file} fileType={fileType} />
				</div>
			);
		}
	}
	return null;
}

export default RenderResults;
