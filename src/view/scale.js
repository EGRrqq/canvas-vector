import { Methods } from "../board/methods/index.js";
import { Ctx } from "../ctx/index.js";

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays
/** @type {() => import("../board/methods/Methods").IMethods} */
export const scale = () => {
	const dpr = window.devicePixelRatio;
	const width = window.innerWidth;
	const height = window.innerHeight;

	Ctx.getCtx().canvas.width = width * dpr;
	Ctx.getCtx().canvas.height = height * dpr;

	Ctx.getCtx().scale(dpr, dpr);

	Ctx.getCtx().canvas.style.width = `${width}px`;
	Ctx.getCtx().canvas.style.height = `${height}px`;

	return Methods;
};
