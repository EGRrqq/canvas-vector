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

// ---------------------------------

/** @type {(points: import("../../../../models/base/IPoint.js").IPoint[]) => {start: import("../../../../models/base/IPoint.js").IPoint, end: import("../../../models/base/IPoint.js").IPoint}[]} */
const getWalls = (points) => {
	const walls = [];
	for (let i = 0; i < points.length; i++) {
		const start = points[i];
		const end = points[(i + 1) % points.length];
		walls.push({ start, end });
	}
	return walls;
};

/** @type {(sofaPos: import("../../../../models/base/IPoint").IPoint, wallPoint: import("../../../../models/base/IPoint").IPoint) => number} */
const getSofaRotationAngle = (sofaPos, wallPoint) => {
	const sofaBackX = sofaPos.x + sofaImage.width / 2; // Задняя часть дивана
	const sofaBackY = sofaPos.y + sofaImage.height / 2; // Задняя часть дивана
	const deltaX = wallPoint.x - sofaBackX;
	const deltaY = wallPoint.y - sofaBackY;
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
			const walls = getWalls(points);
			let closestDistance = RADIUS;
			let closestWall = null;

			for (const wall of walls) {
				const distance = pointToLineDistance(sofaPos, wall.start, wall.end);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestWall = wall;
				}
			}

			if (closestWall) {
				const angle = getSofaRotationAngle(sofaPos, closestWall.start);
				sofaRotationAngle = angle;
			}
		}
	}
};

/** @type {(point: import("../../../../models/base/IPoint.js").IPoint, start: import("../../../../models/base/IPoint.js").IPoint, end: import("../../../models/base/IPoint.js").IPoint) => number} */
const pointToLineDistance = (point, start, end) => {
	const A = point.x - start.x;
	const B = point.y - start.y;
	const C = end.x - start.x;
	const D = end.y - start.y;

	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	const param = len_sq !== 0 ? dot / len_sq : -1;

	let closestX = 0;
	let closestY = 0;

	if (param < 0) {
		closestX = start.x;
		closestY = start.y;
	} else if (param > 1) {
		closestX = end.x;
		closestY = end.y;
	} else {
		closestX = start.x + param * C;
		closestY = start.y + param * D;
	}

	const dx = point.x - closestX;
	const dy = point.y - closestY;
	return Math.sqrt(dx * dx + dy * dy);
};
