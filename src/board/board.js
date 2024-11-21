import { Ctx } from "../ctx/index.js";

/** @typedef{(id: string, settings?: IBoardSettings) => void} TBoard */

/**
 * @typedef {object} IBoardSettings
 * @property {boolean} alpha
 */

/** @type {IBoardSettings} */
const defaultSettings = {
	alpha: false,
};

/** @type {TBoard} */
export const Board = (id, settings) => {
	const { alpha } = { ...defaultSettings, ...settings };

	// Необходимо для инициализации
	Ctx.setCtx(id, { alpha });

	return;
};
