import { Draw } from "../../../../draw/index.js";
import { getRoomCenterPoint } from "../../utils/getRoomCenterPoint.js";
import { isPointInsideRoom } from "../../utils/isPointInsideRoom.js";
import { isPointInsideFurniture } from "./furniture.js";

const sofaImage = new Image();
sofaImage.src = "./toolbox/tool/room/furniture/sofa.png";

/** @type {import("../../../../models/base/IPoint").IPoint} */
let sofaPos = { x: 0, y: 0 };
const sofaRotationAngle = 0;
let isDraggingSofa = false;

let initFlag = true;
const RADIUS = 30;

// Состояния
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

/** @type {(mousePosition: import("../../../../models/base/IPoint").IPoint, points: import("../../../../models/base/IPoint").IPoint[]) => boolean} */
export const updateSofaPosition = (mousePos, points) => {
	if (isDraggingSofa) {
		const newSofaPosition = {
			x: mousePos.x - sofaImage.width / 2,
			y: mousePos.y - sofaImage.height / 2,
		};

		const sides = getRoomSides(points);
		let isMagnetized = false;

		for (const side of sides) {
			const { start, end } = side;
			const lineVector = { x: end.x - start.x, y: end.y - start.y };
			const lineLength = Math.hypot(lineVector.x, lineVector.y);
			const normalizedLine = {
				x: lineVector.x / lineLength,
				y: lineVector.y / lineLength,
			};

			const topCenter = {
				x: newSofaPosition.x + sofaImage.width / 2,
				y: newSofaPosition.y,
			};

			const toLineStart = {
				x: topCenter.x - start.x,
				y: topCenter.y - start.y,
			};
			const projectionLength =
				toLineStart.x * normalizedLine.x + toLineStart.y * normalizedLine.y;

			if (projectionLength >= 0 && projectionLength <= lineLength) {
				const closestPoint = {
					x: start.x + projectionLength * normalizedLine.x,
					y: start.y + projectionLength * normalizedLine.y,
				};

				if (
					Math.hypot(
						closestPoint.x - topCenter.x,
						closestPoint.y - topCenter.y,
					) < RADIUS
				) {
					newSofaPosition.x = closestPoint.x - sofaImage.width / 2;
					newSofaPosition.y = closestPoint.y;
					isMagnetized = true;
					break;
				}
			}
		}

		if (isMagnetized || isPointInsideRoom(newSofaPosition, points)) {
			sofaPos = newSofaPosition;
		}
	}
};

// ---------------------------------

/** @type {(points: import("../../../../models/base/IPoint.js").IPoint[]) => { start: import("../../../../models/base/IPoint.js").IPoint, end: import("../../../models/base/IPoint.js").IPoint }[]} */
const getRoomSides = (points) => {
	const sides = [];
	for (let i = 0; i < points.length; i++) {
		const start = points[i];
		const end = points[(i + 1) % points.length];
		sides.push({ start, end });
	}
	return sides;
};
