import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSync } from '@fortawesome/free-solid-svg-icons';
// import links from '../../data/links.json';

function IconButton({ className, children, href, onClick } = {}) {
	const button = (
		<>
			<button
				style={{ border: "none", background: "none" }}
				className={`button-icon${className ? ` ${className}` : ""}`}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	);

	//let hrefOrAliias = href;

	//if (!hrefOrAliias) {
	//	return button;
	//} else {
	return (
		//<a href={hrefOrAliias} target="gw-window">
		<a target="gw-window">{button}</a>
	);
	//}
}

export default IconButton;
