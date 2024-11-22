import { Methods } from "../board/methods/index.js";
import { Ctx } from "../ctx/index.js";

/**
 * @typedef {object} IImageSettings
 */

/**
 * @typedef {object} IImageData
 * @property {CanvasImageSource} Image
 * @property {import("../models/base/IPoint.js").IPoint} position
 */

/** @type {IImageSettings} */
const defaultSettings = {};

/** @type {import("./Draw.js").TDraw<IImageData,IImageSettings>} */
export const image = ({ Image, position }, settings) => {
	const s = { ...defaultSettings, ...settings };

	Ctx.getCtx().drawImage(Image, position.x, position.y);

	return Methods;
};
