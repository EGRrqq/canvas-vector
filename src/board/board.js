import { Ctx } from "../ctx/index.js";
import { Settings } from "./settings/index.js";

/** @typedef{(id: string, settings?: Partial<import("./Board.js").IBoardSettings>) => void} TBoard */

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
	Settings.updateSettings(s);

	return;
};
