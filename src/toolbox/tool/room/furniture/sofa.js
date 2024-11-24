import { Draw } from "../../../../draw/index.js";
import { getRoomCenterPoint } from "../../utils/getRoomCenterPoint.js";
import { isPointInsideRoom } from "../../utils/isPointInsideRoom.js";
import { isPointInsideFurniture } from "./furniture.js";

const sofaImage = new Image();
sofaImage.src = "./toolbox/tool/room/furniture/sofa.png";

/**
 * @typedef {object} sofaData
 * @property {import("../../../../models/base/IPoint").IPoint} sofaPos
 * @property {number} sofaRotationAngle
 * @property {number} radius
 * @property {boolean} initFlag
 * @property {boolean} isDraggingSofa
 */

/** @type{sofaData} */
const d = {};
resetSofaData();

/** @type {(points: import("../../../../models/base/IPoint").IPoint[]) => void} */
export const init = (points) => {
	if (d.initFlag) d.sofaPos = getRoomCenterPoint(sofaImage, points);
	d.initFlag = false;

	Draw.image({
		image: sofaImage,
		position: d.sofaPos,
		angle: d.sofaRotationAngle,
	});
};

/** @type {(mousePosition: import("../../../../models/base/IPoint").IPoint) => void} */
export const startDraggingSofa = (mousePos) => {
	if (isPointInsideFurniture(sofaImage, mousePos, d.sofaPos)) {
		d.isDraggingSofa = true;
	}
};

export const stopDraggingSofa = () => {
	d.isDraggingSofa = false;
};

/** @type {(mousePosition: import("../../../../models/base/IPoint").IPoint, points: import("../../../../models/base/IPoint").IPoint[]) => boolean} */
export const updateSofaPosition = (mousePos, points) => {
	if (d.isDraggingSofa) {
		const newSofaPosition = {
			x: mousePos.x - sofaImage.width / 2,
			y: mousePos.y - sofaImage.height / 2,
		};

		const sides = getRoomSides(points);
		let isMagnetized = false;
		let newRotationAngle = d.sofaRotationAngle; // Инициализируем новый угол поворота

		for (const side of sides) {
			const { start, end } = side;
			const lineVector = { x: end.x - start.x, y: end.y - start.y };
			const lineLength = Math.hypot(lineVector.x, lineVector.y);
			const normalizedLine = {
				x: lineVector.x / lineLength,
				y: lineVector.y / lineLength,
			};

			const offsetX = sofaImage.width / 2;
			const offsetY = sofaImage.height / 2;

			const greenEdgeCenter = {
				x: newSofaPosition.x + offsetX,
				y: newSofaPosition.y + offsetY,
			};

			const toLineStart = {
				x: greenEdgeCenter.x - start.x,
				y: greenEdgeCenter.y - start.y,
			};
			const projectionLength =
				toLineStart.x * normalizedLine.x + toLineStart.y * normalizedLine.y;

			if (projectionLength >= 0 && projectionLength <= lineLength) {
				const closestPoint = {
					x: start.x + projectionLength * normalizedLine.x,
					y: start.y + projectionLength * normalizedLine.y,
				};
				Draw.rect({ rect: { position: closestPoint, size: { h: 5, w: 5 } } });

				if (
					Math.hypot(
						closestPoint.x - greenEdgeCenter.x,
						closestPoint.y - greenEdgeCenter.y,
					) < d.radius
				) {
					newSofaPosition.x = closestPoint.x - offsetX;
					newSofaPosition.y = closestPoint.y - offsetY;
					isMagnetized = true;

					// Вычисляем угол поворота дивана
					newRotationAngle = calculateAngle(side); // Преобразуем радианы в градусы
					break;
				}
			}
		}

		if (isMagnetized || isPointInsideRoom(newSofaPosition, points)) {
			d.sofaPos = newSofaPosition;
			d.sofaRotationAngle = newRotationAngle; // Применяем новый угол поворота
		}
		if (!isMagnetized) {
			d.sofaRotationAngle = 0;
		}
	}
};

export function resetSofaData() {
	d.sofaPos = { x: 0, y: 0 };
	d.sofaRotationAngle = 0;
	d.isDraggingSofa = false;
	d.initFlag = true;
	d.radius = 15;

	return d;
}

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

/** @type {(props:{start: import("../../../../models/base/IPoint").IPoint, end: import("../../../../models/base/IPoint").IPoint}) => number} */
const calculateAngle = ({ start, end }) => {
	const dx = end.x - start.x;
	const dy = end.y - start.y;

	return Math.atan2(dy, dx) * (180 / Math.PI) + 180;
};
