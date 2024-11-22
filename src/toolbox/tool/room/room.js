import { Methods } from "../../../board/methods/index.js";
import { Ctx } from "../../../ctx/index.js";
import { Handlers } from "../handlers/index.js";

const squareSize = 5;

/** @type {() => import("../../../board/methods/Methods.js").IMethods} */
export const hover = () => {
	const { mouseMove } = Handlers.getMouseHandlers();
	if (mouseMove.flag) {
		const ctx = Ctx.getCtx();
		const canvas = ctx.canvas;

		const rect = canvas.getBoundingClientRect();
		const x = mouseMove.e.clientX - rect.left;
		const y = mouseMove.e.clientY - rect.top;

		ctx.fillStyle = "black"; // Цвет квадрата
		ctx.fillRect(
			x - squareSize / 2,
			y - squareSize / 2,
			squareSize,
			squareSize,
		);
	}

	return Methods;
};
