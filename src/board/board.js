import { Ctx } from "../ctx/index.js";
import { Handlers } from "../toolbox/tool/handlers/index.js";
import { Methods } from "./methods/index.js";

/** @typedef{(id: string, settings?: Partial<import("./Board.js").IBoardSettings>) => import("./methods/Methods.js").IMethods} TBoard */

/** @type {import("./Board.js").IBoardSettings} */
const defaultSettings = {
	alpha: true,
	bgColor: "#fff",
};

/** @type {TBoard} */
export const Board = (id, settings) => {
	const { alpha, ...s } = { ...defaultSettings, ...settings };

	// Необходимо для инициализации
	Ctx.setCtx(id, { alpha });
	Handlers.setMouseHandlers();
	Methods.clear().scale().updateSettings(s);

	return Methods;
};
