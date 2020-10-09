import React from "react";

function FileAttributes({ file, fileType } = {}) {
	const { name, size } = file;
	return (
		<div className="file-attributes analysis-table table-container">
			<div
				style={{
					textTransform: "uppercase",
					fontSize: "1.6rem",
					background: "grey",
					color: "#ffffff",
					textAlign: "center",
					lineHeight: "4rem",
				}}
				className="h1 table-header"
			>
				File Attributes
			</div>
			<table>
				<tbody>
					<tr>
						<td>File Name: </td>
						<td>{name}</td>
					</tr>
					<tr>
						<td>File Size: </td>
						<td>{size}</td>
					</tr>
					<tr>
						<td>Type: </td>
						<td>{fileType}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default FileAttributes;
