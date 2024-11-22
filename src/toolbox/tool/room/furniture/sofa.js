import { Draw } from "../../../../draw/index.js";
import { getRoomCenterPoint } from "../../utils/getRoomCenterPoint.js";
import { isPointInsideRoom } from "../../utils/isPointInsideRoom.js";
import { isPointInsideFurniture } from "./furniture.js";

const sofaImage = new Image();
sofaImage.src = "./toolbox/tool/room/furniture/sofa.png";

let isDraggingSofa = false;
/** @type {import("../../../../models/base/IPoint").IPoint} */
let sofaPos = { x: 0, y: 0 };
let sofaRotationAngle = 0;

let initFlag = true;
const RADIUS = 100;

/** @type {(points: import("../../../../models/base/IPoint").IPoint[]) => void} */
export const init = (points) => {
	if (initFlag) sofaPos = getRoomCenterPoint(sofaImage, points);
	initFlag = false;

	Draw.image({ image: sofaImage, position: sofaPos, angle: sofaRotationAngle });
};

/** @type {(mousePosition: import("../../../../models/base/IPoint").IPoint) => void} */
export const startDraggingSofa = (mousePos) => {
	if (isPointInsideFurniture(sofaImage, mousePos, sofaPos)) {
		isDraggingSofa = true;
	}
};

export const stopDraggingSofa = () => {
	isDraggingSofa = false;
};

/** @type {(sofaPos: import("../../../../models/base/IPoint").IPoint, wallPoint: import("../../../../models/base/IPoint").IPoint) => number} */
const getSofaRotationAngle = (sofaPos, wallPoint) => {
	const deltaX = wallPoint.x - sofaPos.x;
	const deltaY = wallPoint.y - sofaPos.y;
	return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Угол в градусах
};

/** @type {(mousePosition: import("../../../../models/base/IPoint").IPoint, points: import("../../../../models/base/IPoint").IPoint[]) => boolean} */
export const updateSofaPosition = (mousePos, points) => {
	if (isDraggingSofa) {
		const newSofaPosition = {
			x: mousePos.x - sofaImage.width / 2,
			y: mousePos.y - sofaImage.height / 2,
		};

		if (isPointInsideRoom(newSofaPosition, points)) {
			sofaPos = newSofaPosition;

			// Проверяем магнитное примагничивание к стенам
			for (const point of points) {
				const distance = Math.hypot(point.x - sofaPos.x, point.y - sofaPos.y);
				// Если диван близко к стене
				if (distance < RADIUS) {
					const angle = getSofaRotationAngle(sofaPos, point);
					sofaRotationAngle = angle;

					break; // Прерываем цикл, если нашли стену
				}
			}
		}
	}
};
