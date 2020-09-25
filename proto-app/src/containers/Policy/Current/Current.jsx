import React from "react";

import classes from "./Current.module.scss";

import CurrentRow from "./CurrentRow/CurrentRow";

const word = [
	{ id: "word-id-1", name: "Dynamic Data Exchange" },
	{ id: "word-id-2", name: "Embedded Files" },
	{ id: "word-id-3", name: "Embedded Files" },
	{ id: "word-id-4", name: "External Hyperlinks" },
	{ id: "word-id-5", name: "Internal Hyperlinks" },
	{ id: "word-id-6", name: "Macros" },
	{ id: "word-id-7", name: "Metadata" },
	{ id: "word-id-8", name: "Review Comments" },
];

const exel = [
	{ id: "exel-id-1", name: "Dynamic Data Exchange" },
	{ id: "exel-id-2", name: "Embedded Files" },
	{ id: "exel-id-3", name: "Embedded Files" },
	{ id: "exel-id-4", name: "External Hyperlinks" },
	{ id: "exel-id-5", name: "Internal Hyperlinks" },
	{ id: "exel-id-6", name: "Macros" },
	{ id: "exel-id-7", name: "Metadata" },
	{ id: "exel-id-8", name: "Review Comments" },
];

const powerpoint = [
	{ id: "powerpoint-id-1", name: "Embedded Files" },
	{ id: "powerpoint-id-2", name: "Embedded Images" },
	{ id: "powerpoint-id-3", name: "External Hyperlinks" },
	{ id: "powerpoint-id-4", name: "Internal Hyperlinks" },
	{ id: "powerpoint-id-5", name: "Macros" },
	{ id: "powerpoint-id-6", name: "Metadata" },
	{ id: "powerpoint-id-7", name: "Review Comments" },
];

const pdf = [
	{ id: "pdf-id-1", name: "Acroform" },
	{ id: "pdf-id-2", name: "Actions All" },
	{ id: "pdf-id-3", name: "Embedded Files" },
	{ id: "pdf-id-4", name: "Embedded Images" },
	{ id: "pdf-id-5", name: "External Hyperlinks" },
	{ id: "pdf-id-6", name: "Internal Hyperlinks" },
	{ id: "pdf-id-7", name: "Javascript" },
	{ id: "pdf-id-8", name: "Metadata" },
];

const Current = () => {
	return (
		<div className={classes.Current}>
			<div className={classes.header}>
				<p>Content Flags</p>
			</div>
			<div className={classes.inner}>
				<section>
					<h2>Word</h2>
					<CurrentRow itemList={word} />
				</section>
				<section>
					<h2>Exel</h2>
					<CurrentRow itemList={exel} />
				</section>
				<section>
					<h2>Powerpoint</h2>
					<CurrentRow itemList={powerpoint} />
				</section>
				<section>
					<h2>PDF</h2>
					<CurrentRow itemList={pdf} />
				</section>
			</div>
		</div>
	);
};

export default Current;
