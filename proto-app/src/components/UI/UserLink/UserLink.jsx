import React from "react";
import classes from "./UserLink.module.scss";

const UserLink = ({ username, expanded, openPopup, closePopup }) => {
	const cls = [classes.UserLink];
	if (expanded) {
		cls.push(classes.userLinkExpanded);
	}

	return (
		<section
			className={cls.join(" ")}
			onMouseEnter={openPopup}
			onMouseLeave={closePopup}
		>
			<div>
				<p>{username}</p>
			</div>
		</section>
	);
};
export default UserLink;
