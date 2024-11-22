import { Methods } from "../../../board/methods/index.js";
import { Draw } from "../../../draw/index.js";
import { Handlers } from "../handlers/index.js";
import { getMousePoint } from "../utils/getMousePoint.js";
import { getMagnetPoint } from "./getMagnetPoint.js";

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

	if (mouseMove.e && (mouseMove.flag || points.length)) {
		/** @type {import ("../../../models/base/ISize.js").ISize} */
		const size = { h: squareSize, w: squareSize };
		const mousePosition = getMousePoint(mouseMove.e);
		const fillStyle = "black";
		const fillStyleAction = "blue";

		// Рисуем точки из массива
		for (const p of points) {
			Draw.rect({ rect: { position: p, size: size } }, { fillStyle });
		}

		if (points.length) {
			const magnetPoint = getMagnetPoint(points, mousePosition);
			if (!magnetPoint) {
				// рисуем линию между точками и квадрат на ховере
				Draw.line({ path: points, mousePosition });
				Draw.rect(
					{ rect: { position: mousePosition, size: size } },
					{ fillStyle },
				);

				return { ...Methods, roomClick };
			}

			// рисуем линию и квадрат к магнитной точке
			Draw.line({ path: points, mousePosition: magnetPoint.mousePosition });
			if (!magnetPoint.isFirstPoint) {
				Draw.rect(
					{ rect: { position: magnetPoint.mousePosition, size: size } },
					{ fillStyle },
				);

				return { ...Methods, roomClick };
			}
			// помечаем возможно финиша с помощью цвета
			Draw.rect(
				{ rect: { position: magnetPoint.mousePosition, size: size } },
				{ fillStyle: fillStyleAction },
			);

			return { ...Methods, roomClick };
		}

		// Рендерим квадрат на ховер даже если нет точек
		Draw.rect({ rect: { position: mousePosition, size: size } }, { fillStyle });
	}

	return { ...Methods, roomClick };
};

/** @type {IRoom["roomClick"]} */
// const roomClick = () => {
// 	const { mouseDown } = Handlers.getMouseHandlers();

// 	if (mouseDown.flag && mouseDown.e) {
// 		const mousePosition = getMousePoint(mouseDown.e);

// 		// Добавляем новую точку
// 		points.push(mousePosition);
// 		mouseDown.flag = false;
// 	}

// 	return { ...Methods, roomHover };
// };

/** @type {IRoom["roomClick"]} */
const roomClick = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		const mousePosition = getMousePoint(mouseDown.e);

		const magnetPoint = getMagnetPoint(points, mousePosition);

		// Проверяем магнит для добавления новой точки
		if (magnetPoint) {
			points.push(magnetPoint.mousePosition);
			mouseDown.flag = false;

			if (magnetPoint.isFirstPoint) {
				console.log("END");
			}

			return { ...Methods, roomHover };
		}

		points.push(mousePosition);
		mouseDown.flag = false;
	}

	return { ...Methods, roomHover };
};

/** @type {IRoom} */
export const Room = { roomClick, roomHover };
