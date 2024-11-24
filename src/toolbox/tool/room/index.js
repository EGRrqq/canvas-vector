import { Methods } from "../../../board/methods/index.js";
import { resetData, roomClick, roomHover } from "./room.js";

/** @type {import("../Tool").ITool} */
export const Room = {
	init: () => {
		roomHover();
		roomClick();

		return Methods;
	},
	resetData,
};
