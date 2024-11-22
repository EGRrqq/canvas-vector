import { Ctx } from "../../../ctx/index.js";

/** @type{(e:MouseEvent) => import("../../../models/base/IPoint.js").IPoint} */
export const getMousePoint = (e) => {
	const ctx = Ctx.getCtx();
	const canvas = ctx.canvas;

	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	return { x, y };
};
