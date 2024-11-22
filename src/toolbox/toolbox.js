import { Tools } from "./tool/index.js";

/** @typedef {{ [P in import("./tool/Tool").TToolsType]: import("./tool/Tool.js").TTools[P]}} TActiveTool */

/** @type {TActiveTool} */
let activeTool = { room: Tools.room };

/** @typedef {(type: import("./tool/Tool").TToolsType) => {getActiveTool: TGetActiveTool}} TSetActiveTool*/
/** @typedef {() => TActiveTool} TGetActiveTool*/

/** @type{TGetActiveTool} */
export const getActiveTool = () => activeTool;

/** @type {TSetActiveTool} */
export const setActiveTool = (type) => {
	activeTool = { [type]: Tools[type] };

	return { getActiveTool };
};

/** @type{() => import("./tool/Tool.js").TTools} */
export const getTools = () => Tools;
