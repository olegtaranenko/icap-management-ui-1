import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const changeTogglePosition = (state, clickedToggle) => {
	const updatedList = updateObject(state.policyFlags, {
		[clickedToggle.block]: state.policyFlags[clickedToggle.block].map(
			(toggle) => {
				if (toggle.id === clickedToggle.id) {
					toggle.pos = clickedToggle.pos;
					toggle.touched = true;
				}
				return toggle;
			}
		),
	});

	return updateObject(state, {
		policyFlags: updatedList,
		isPolicyChanged: true,
	});
};

const cancelChangesPolisy = (state) => {
	return updateObject(state, {
		policyFlags: {
			word: [
				{ id: "word-id-1", name: "Dynamic Data Exchange", pos: "disallow" },
				{ id: "word-id-2", name: "Embedded Files", pos: "disallow" },
				{ id: "word-id-3", name: "Embedded Files", pos: "disallow" },
				{ id: "word-id-4", name: "External Hyperlinks", pos: "sanitise" },
				{ id: "word-id-5", name: "Internal Hyperlinks", pos: "disallow" },
				{ id: "word-id-6", name: "Macros", pos: "disallow" },
				{ id: "word-id-7", name: "Metadata", pos: "sanitise" },
				{ id: "word-id-8", name: "Review Comments", pos: "disallow" },
			],
			exel: [
				{ id: "exel-id-1", name: "Dynamic Data Exchange", pos: "disallow" },
				{ id: "exel-id-2", name: "Embedded Files", pos: "disallow" },
				{ id: "exel-id-3", name: "Embedded Files", pos: "sanitise" },
				{ id: "exel-id-4", name: "External Hyperlinks", pos: "sanitise" },
				{ id: "exel-id-5", name: "Internal Hyperlinks", pos: "disallow" },
				{ id: "exel-id-6", name: "Macros", pos: "sanitise" },
				{ id: "exel-id-7", name: "Metadata", pos: "disallow" },
				{ id: "exel-id-8", name: "Review Comments", pos: "disallow" },
			],
			powerpoint: [
				{ id: "powerpoint-id-1", name: "Embedded Files", pos: "disallow" },
				{ id: "powerpoint-id-2", name: "Embedded Images", pos: "disallow" },
				{
					id: "powerpoint-id-3",
					name: "External Hyperlinks",
					pos: "disallow",
				},
				{
					id: "powerpoint-id-4",
					name: "Internal Hyperlinks",
					pos: "sanitise",
				},
				{ id: "powerpoint-id-5", name: "Macros", pos: "disallow" },
				{ id: "powerpoint-id-6", name: "Metadata", pos: "sanitise" },
				{ id: "powerpoint-id-7", name: "Review Comments", pos: "disallow" },
			],
			pdf: [
				{ id: "pdf-id-1", name: "Acroform", pos: "sanitise" },
				{ id: "pdf-id-2", name: "Actions All", pos: "disallow" },
				{ id: "pdf-id-3", name: "Embedded Files", pos: "sanitise" },
				{ id: "pdf-id-4", name: "Embedded Images", pos: "disallow" },
				{ id: "pdf-id-5", name: "External Hyperlinks", pos: "disallow" },
				{ id: "pdf-id-6", name: "Internal Hyperlinks", pos: "disallow" },
				{ id: "pdf-id-7", name: "Javascript", pos: "disallow" },
				{ id: "pdf-id-8", name: "Metadata", pos: "sanitise" },
			],
		},

		isPolicyChanged: false,
	});
};

const saveChangesPolisy = (state) => {
	for (let key in state.policyFlags) {
		state.policyFlags[key].map((it) => {
			it.touched = false;
			return it.touched;
		});
	}

	return updateObject(state, {
		isPolicyChanged: false,
	});
};

export const policyReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_TOGGLE_POSITION:
			return changeTogglePosition(state, action.toggle);
		case actionTypes.SAVE_CHANGES_POLISY:
			return saveChangesPolisy(state);
		case actionTypes.CANCEL_CHANGES_POLISY:
			return cancelChangesPolisy(state);
		default:
			return state;
	}
};
