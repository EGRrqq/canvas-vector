import { Ctx } from "../ctx/index.js";

/**
 * @typedef {object} IDrawSettings
 * @property {CanvasFillStrokeStyles["fillStyle"]} fillStyle
 */

/**
 * @typedef {object} IDrawRectData
 * @property {import("../models/elems/IRect.js").IRect} rect
 */

/** @type {IDrawSettings} */
const defaultSettings = {
	fillStyle: "#007bff",
};

/** @type {import("./Draw.js").TDraw<IDrawRectData,IDrawSettings>} */
export const rect = ({ rect }, settings) => {
	const s = { ...defaultSettings, ...settings };

	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	Ctx.getCtx().fillStyle = s.fillStyle;
	Ctx.getCtx().fillRect(
		position.x - halfWidth,
		position.y - halfHeight,
		size.width,
		size.height,
	);

	return;
};
