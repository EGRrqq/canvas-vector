import { Methods } from "../../../board/methods/index.js";
import { Draw } from "../../../draw/index.js";
import { Handlers } from "../handlers/index.js";
import { getMousePoint } from "../utils/getMousePoint.js";
import * as Furniture from "./furniture/furniture.js";
import { sofaImage } from "./furniture/sofa.js";
import { getMagnetPoint } from "./getMagnetPoint.js";

/**
 * @template T
 * @typedef {import("../../../board/methods/Methods.js").IMethods & T} IRoomReturn
 */

/**
 * @typedef {object} IRoom
 * @property {() => IRoomReturn<Pick<IRoom, "roomHover">>} roomClick
 * @property {() => IRoomReturn<Pick<IRoom, "roomClick">>} roomHover
 * @property {() => boolean} isDrawEnded
 * @property {() => import("../../../models/base/IPoint.js").IPoint[]} points
 */

const squareSize = 5;
/** @type {import("../../../models/base/IPoint.js").IPoint[]} */
export const points = []; // Массив для хранения точек
export let isDrawEnded = false;

/** @type {IRoom["roomHover"]} */
const roomHover = () => {
	const { mouseMove } = Handlers.getMouseHandlers();

	if (!isDrawEnded && mouseMove.e && (mouseMove.flag || points.length)) {
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
			Draw.line(
				{ path: points, mousePosition: magnetPoint.mousePosition },
				{ fill: isDrawEnded },
			);
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

	if (isDrawEnded && mouseMove.e && (mouseMove.flag || points.length)) {
		const mousePosition = getMousePoint(mouseMove.e);
		Draw.line({ path: points }, { fill: true });

		// Рендерим изображение дивана
		const imageSpawnPos = Furniture.getRoomCenterPoint(sofaImage, points);
		Draw.image({ Image: sofaImage, position: imageSpawnPos });

		if (Furniture.isPointInsideRoom(mousePosition, points)) {
			console.log("WE MOVIN");
		}
	}

	return { ...Methods, roomClick };
};

/** @type {IRoom["roomClick"]} */
const roomClick = () => {
	if (isDrawEnded) return { ...Methods, roomHover };

	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		const mousePosition = getMousePoint(mouseDown.e);

		const magnetPoint = getMagnetPoint(points, mousePosition);

		// Проверяем магнит для добавления новой точки
		if (magnetPoint) {
			points.push(magnetPoint.mousePosition);
			mouseDown.flag = false;

			if (magnetPoint.isFirstPoint) {
				isDrawEnded = true;
			}

			return { ...Methods, roomHover };
		}

		points.push(mousePosition);
		mouseDown.flag = false;
	}

	return { ...Methods, roomHover };
};

/** @type {IRoom} */
export const Room = {
	roomClick,
	roomHover,
	isDrawEnded: () => isDrawEnded,
	points: () => points,
};
