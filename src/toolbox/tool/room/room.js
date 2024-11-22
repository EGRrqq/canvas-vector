import { Methods } from "../../../board/methods/index.js";
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

	if (mouseMove.e && (mouseMove.flag || points.length)) {
		/** @type {import ("../../../models/base/ISize.js").ISize} */
		const size = { h: squareSize, w: squareSize };
		const mousePosition = getMousePoint(mouseMove.e);
		const fillStyle = "black";

		// Рисуем точки из массива
		for (const p of points) {
			Draw.rect({ rect: { position: p, size: size } }, { fillStyle });
		}

		if (points.length) {
			const magnetPoint = getMagnetPoint(points, mousePosition);

			// Проверка на магнитную точку
			if (magnetPoint) {
				// рисуем линию и квадрат к магнитной точке
				Draw.line({ path: points, mousePosition: magnetPoint });

				Draw.rect(
					{ rect: { position: magnetPoint, size: size } },
					{ fillStyle: "blue" },
				);
			} else {
				// рисуем линию между точками и квадрат на ховере
				Draw.line({ path: points, mousePosition });

				Draw.rect(
					{ rect: { position: mousePosition, size: size } },
					{ fillStyle },
				);
			}
		}
	}

	return { ...Methods, roomClick };
};

/** @type {IRoom["roomClick"]} */
const roomClick = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		const mousePosition = getMousePoint(mouseDown.e);

		// Добавляем новую точку
		points.push(mousePosition);
		mouseDown.flag = false;
	}

	return { ...Methods, roomHover };
};

/** @type {(points: import("../../../models/base/IPoint.js").IPoint[], mousePosition: import("../../../models/base/IPoint.js").IPoint) =>  import("../../../models/base/IPoint.js").IPoint | null} */
const getMagnetPoint = (points, mousePos) => {
	if (points.length > 2) {
		const point = points[0];
		if (Math.hypot(point.x - mousePos.x, point.y - mousePos.y) < 8) {
			return point; // Возвращаем точку, к которой магнитится курсор
		}
	}
	return null; // Если магнитных точек нет
};

/** @type {IRoom} */
export const Room = { roomClick, roomHover };
