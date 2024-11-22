import { Methods } from "../board/methods/index.js";
import { Ctx } from "../ctx/index.js";

/**
 * @typedef {object} IRectSettings
 * @property {CanvasFillStrokeStyles["fillStyle"]} fillStyle
 */

/**
 * @typedef {object} IRectData
 * @property {import("../models/elems/IRect.js").IRect} rect
 */

/** @type {IRectSettings} */
const defaultSettings = {
	fillStyle: "#007bff",
};

/** @type {import("./Draw.js").TDraw<IRectData,IRectSettings>} */
export const rect = ({ rect }, settings) => {
	const s = { ...defaultSettings, ...settings };
	const ctx = Ctx.getCtx();

	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	ctx.fillStyle = s.fillStyle;
	ctx.fillRect(
		position.x - halfWidth,
		position.y - halfHeight,
		size.width,
		size.height,
	);

	return Methods;
};
