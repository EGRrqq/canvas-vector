import { Methods } from "../board/methods/index.js";
import { Tools } from "./tool/index.js";

/** @type {import("./tool/Tool.js").ITool} */
let activeTool = Tools.room;

/** @typedef {(type: keyof import("./tool/Tool").TTools) => import("../board/methods/Methods.js").IMethods} TSetActiveTool*/

/** @type {TSetActiveTool} */
export const setActiveTool = (type) => {
	activeTool = Tools[type];
	activeTool.init();

	return Methods;
};
