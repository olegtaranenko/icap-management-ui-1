import React, { useReducer } from "react";

import GlobalStoreContext from "./globalStore-context";
import { globalStoreReducer } from "./globalStore-reducers";

import * as actionTypes from "../actionTypes";

const userfileList = [
	{
		id: "file-01",
		timestamp: new Date("05.11.19").toUTCString(),
		fileId: "66666666 - 6666 - 6666 - 6666 - 66666666666",
		type: "PNG",
		name: "y-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "12mb",
	},
	{
		id: "file-02",
		timestamp: new Date("08.1.19").toUTCString(),
		fileId: "44444444 - 4444 - 4444 - 4444 - 44444444444",

		type: "DOCX",
		name: "f-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "8mb",
	},
	{
		id: "file-03",
		timestamp: new Date("05.11.17").toUTCString(),
		fileId: "88888888 - 8888 - 8888 - 8888 - 88888888888",

		type: "PNG",
		name: "a-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "14mb",
	},
	{
		id: "file-04",
		timestamp: new Date("01.23.17").toUTCString(),
		fileId: "11111111 - 1111 - 1111 - 1111 - 11111111111",

		type: "DOCX",
		name: "c-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "4mb",
	},
	{
		id: "file-05",
		timestamp: new Date().toUTCString(),
		fileId: "55555555 - 5555 - 5555 - 5555 - 55555555555",
		type: "PNG",
		name: "l-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "18mb",
	},
	{
		id: "file-06",
		timestamp: new Date().toUTCString(),

		fileId: "00000000 - 0000 - 0000 - 0000 - 00000000000",
		type: "DOCX",
		name: "s-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "2mb",
	},
	{
		id: "file-07",
		timestamp: new Date().toUTCString(),
		fileId: "77777777 - 7777 - 7777 - 7777 - 77777777777",
		type: "PNG",
		name: "d-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "32mb",
	},
	{
		id: "file-08",
		timestamp: new Date().toUTCString(),
		fileId: "33333333 - 3333 - 3333 - 3333 - 33333333333",
		type: "DOCX",
		name: "m-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "21mb",
	},
	{
		id: "file-09",
		timestamp: new Date().toUTCString(),
		fileId: "99999999 - 9999 - 9999 - 9999 - 99999999999",
		type: "PNG",
		name: "b-test.png",
		outcome: "Safe",
		url: "https://www.test-site.com/test.png",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "1mb",
	},
	{
		id: "file-10",
		timestamp: new Date().toUTCString(),
		fileId: "10101010 - 1010 - 1010 - 1010 - 10101010101",
		type: "DOCX",
		name: "q-test.docx",
		outcome: "Blocked",
		url: "https://www.test-site.com/test.docx",
		host: "1.1.1.1",
		clientAddress: "192.168.1.1",
		proxyAddress: "192.168.2.2",
		report: "https://www.test-site.com/report",
		reqTime: "3000ms",
		rebTime: "2500ms",
		fileSize: "7mb",
	},
];

export const GlobalStoreState = ({ children }) => {
	const initialState = {
		title: "Glasswall React App",
		userfiles: userfileList,
	};

	const [globalStoreState, dispatch] = useReducer(
		globalStoreReducer,
		initialState
	);

	const changePageTitleHandler = (pageTitle) => {
		dispatch({ type: actionTypes.CHANGE_PAGE_TITLE, title: pageTitle });
	};

	return (
		<GlobalStoreContext.Provider
			value={{
				title: globalStoreState.title,
				userfiles: globalStoreState.userfiles,
				changePageTitleHandler,
			}}
		>
			{children}
		</GlobalStoreContext.Provider>
	);
};
