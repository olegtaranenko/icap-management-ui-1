import React from "react";
import classes from "./RenderResults.module.scss";

import RenderAnalysis from "./RenderAnalysis";
import DownloadFile from "./DownloadFile";
import SectionTitle from "../SectionTitle/SectionTitle";
import DownloadAnalysisReport from "./DownloadAnalysisReport";
import FileAttributes from "./FileAttributes";
import ButtonsContainer from "../ButtonsContainer/ButtonsContainer";
import messages from "../../data/fileDrop/messages.json";
import Button from "../UI/Button/Button";

function RenderResults({
	file,
	analysisReport,
	analysisReportString,
	validation,
	onAnotherFile,
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
		if (sanitisations.length || remediations.length || hasIssues) {
			const code = hasIssues ? "unable-to-protect" : "file-is-ready";
			const sectionTitle = messages[code];
			return (
				<div className={classes.RenderResults}>
					<SectionTitle className={classes.title} hasIssues={hasIssues}>
						{sectionTitle}
					</SectionTitle>
					{/*<ButtonsContainer context="analysis" touchFull>
						<DownloadFile file={file} hasIssues={hasIssues} />
						<DownloadAnalysisReport
							report={analysisReportString}
							filename={fileName}
						/>
					</ButtonsContainer>*/}

					<FileAttributes file={file} fileType={fileType} />

					<RenderAnalysis
						remediations={remediations}
						sanitisations={sanitisations}
						issues={issues}
					/>
					<ButtonsContainer touchFull>
						<Button
							externalStyles={classes.button}
							onButtonClick={onAnotherFile}
						>
							Sanitise another file
						</Button>
					</ButtonsContainer>
				</div>
			);
		} else {
			return (
				<div className="is-clean analysis">
					<SectionTitle context="clean">File is clean!</SectionTitle>
					<ButtonsContainer context="download" touchFull>
						<DownloadAnalysisReport
							report={analysisReportString}
							filename={fileName}
						/>
					</ButtonsContainer>
					<FileAttributes file={file} fileType={fileType} />
					<ButtonsContainer touchFull>
						<Button externalStyles={classes.button} onClick={onAnotherFile}>
							Sanitise another file
						</Button>
					</ButtonsContainer>
				</div>
			);
		}
	}

	return null;
}

export default RenderResults;
