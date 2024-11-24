import { Methods } from "../../../board/methods/index.js";
import { roomClick, roomHover } from "./room.js";

/** @type {import("../Tool").ITool} */
export const Room = {
	init: () => {
		roomHover();
		roomClick();

		return Methods;
	},
};
