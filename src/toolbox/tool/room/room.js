import { Methods } from "../../../board/methods/index.js";
import { Ctx } from "../../../ctx/index.js";
import { Draw } from "../../../draw/index.js";
import { Handlers } from "../handlers/index.js";
import { getMousePoint } from "../utils/getMousePoint.js";

/**
 * @template T
 * @typedef {import("../../../board/methods/Methods.js").IMethods & T} IRoomReturn
 */

/**
 * @typedef {object} IRoom
 * @property {() => IRoomReturn<Pick<IRoom, "roomHover">>} roomClick
 * @property {() => IRoomReturn<Pick<IRoom, "roomClick">>} roomHover
 */

const squareSize = 5;
/** @type {import("../../../models/base/IPoint.js").IPoint[]} */
const points = []; // Массив для хранения точек

/** @type {IRoom["roomHover"]} */
const roomHover = () => {
	const { mouseMove } = Handlers.getMouseHandlers();

	if (mouseMove.flag) {
		/** @type {import ("../../../models/base/ISize.js").ISize} */
		const size = { h: squareSize, w: squareSize };
		const mousePosition = getMousePoint(mouseMove.e);
		const fillStyle = "black";

		// Рисуем точки из массива
		for (const p of points) {
			Draw.rect({ rect: { position: p, size: size } }, { fillStyle });
		}

		// Рисуем линию между точками
		if (points.length) Draw.line({ path: points, mousePosition });

		// Рисуем квадрат на ховере
		Draw.rect({ rect: { position: mousePosition, size: size } }, { fillStyle });
	}

	return { ...Methods, roomClick };
};

/** @type {IRoom["roomClick"]} */
const roomClick = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag) {
		const mousePosition = getMousePoint(mouseDown.e);

		// Добавляем новую точку
		points.push(mousePosition);
	}

	return { ...Methods, roomHover };
};

/** @type {IRoom} */
export const Room = { roomClick, roomHover };
