import { Methods } from "../../../board/methods/index.js";
import { Draw } from "../../../draw/index.js";
import { Handlers } from "../handlers/index.js";
import { getMousePoint } from "../utils/getMousePoint.js";
import * as Sofa from "./furniture/sofa.js";
import { getMagnetPoint } from "./getMagnetPoint.js";
import { handleHoverMove } from "./handleHoverMove.js";

/** @type {import("../../../models/base/IPoint.js").IPoint[]} */
export const points = []; // Массив для хранения точек
export let isDrawEnded = false;

/** @type {import("./Room.js").IRoom["roomHover"]} */
const roomHover = () => {
	const { mouseMove } = Handlers.getMouseHandlers();

	if (!isDrawEnded && mouseMove.e && (mouseMove.flag || points.length))
		handleHoverMove({ e: mouseMove.e, isDrawEnded, points });

	if (isDrawEnded && mouseMove.e && (mouseMove.flag || points.length)) {
		const mousePosition = getMousePoint(mouseMove.e);
		Draw.line({ path: points }, { fill: true });

		Sofa.init(points);
		Sofa.updateSofaPosition(mousePosition, points);
	}

	return { ...Methods, roomClick };
};

/** @type {import("./Room.js").IRoom["roomClick"]} */
const roomClick = () => {
	const { mouseDown, mouseUp } = Handlers.getMouseHandlers();

	if (!isDrawEnded && mouseDown.flag && mouseDown.e) {
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

	if (isDrawEnded && mouseDown.flag && mouseDown.e) {
		const mousePosition = getMousePoint(mouseDown.e);
		Sofa.startDraggingSofa(mousePosition);
	}
	if (mouseUp.flag) {
		Sofa.stopDraggingSofa();
	}

	return { ...Methods, roomHover };
};

/** @type {import("./Room.js").IRoom} */
export const Room = {
	roomClick,
	roomHover,
	getIsDrawEnded: () => isDrawEnded,
	getPoints: () => points,
};
