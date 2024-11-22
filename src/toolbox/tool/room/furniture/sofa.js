import { Draw } from "../../../../draw/index.js";
import { getRoomCenterPoint } from "../../utils/getRoomCenterPoint.js";
import { isPointInsideRoom } from "../../utils/isPointInsideRoom.js";
import { isPointInsideFurniture } from "./furniture.js";

const sofaImage = new Image();
sofaImage.src = "./toolbox/tool/room/furniture/sofa.png";

let isDraggingSofa = false;
/** @type {import("../../../../models/base/IPoint").IPoint} */
let sofaPos = { x: 0, y: 0 };

let initFlag = true;

/** @type {(points: import("../../../../models/base/IPoint").IPoint[]) => void} */
export const init = (points) => {
	if (initFlag) sofaPos = getRoomCenterPoint(sofaImage, points);
	initFlag = false;

	Draw.image({ Image: sofaImage, position: sofaPos });
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

/** @type{(mousePosition: import("../../../../models/base/IPoint").IPoint, points: import("../../../../models/base/IPoint").IPoint[]) => boolean} */
export const updateSofaPosition = (mousePos, points) => {
	if (isDraggingSofa) {
		const newSofaPosition = {
			x: mousePos.x - sofaImage.width / 2,
			y: mousePos.y - sofaImage.height / 2,
		};

		if (isPointInsideRoom(newSofaPosition, points)) {
			sofaPos = newSofaPosition;
		}
	}
};
