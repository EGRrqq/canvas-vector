import { Methods } from "../board/methods/index.js";
import { Ctx } from "../ctx/index.js";

/**
 * @typedef {object} ILineSettings
 * @property {CanvasFillStrokeStyles["strokeStyle"]} strokeStyle
 * @property {CanvasPathDrawingStyles["lineWidth"]} lineWidth
 */

/**
 * @typedef {object} ILineData
 * @property {import("../models/base/IPoint.js").IPoint[]} path
 * @property {import("../models/base/IPoint.js").IPoint} mousePosition
 */

/** @type {ILineSettings} */
const defaultSettings = {
	strokeStyle: "#000",
	lineWidth: 0.5,
};

/** @type {import("./Draw.js").TDraw<ILineData,ILineSettings>} */
export const line = ({ path, mousePosition }, settings) => {
	const s = { ...defaultSettings, ...settings };
	const ctx = Ctx.getCtx();

	ctx.strokeStyle = s.strokeStyle;
	ctx.lineWidth = s.lineWidth;

	ctx.beginPath();
	ctx.moveTo(path[0].x, path[0].y);

	for (let i = 1; i < path.length; i++) {
		ctx.lineTo(path[i].x, path[i].y);
	}
	ctx.lineTo(mousePosition.x, mousePosition.y); // Линия следует за курсором
	ctx.stroke();

	ctx.closePath();

	return Methods;
};
