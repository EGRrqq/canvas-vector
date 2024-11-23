import { Methods } from "../../../board/methods/index.js";
import { Draw } from "../../../draw/index.js";
import { getMousePoint } from "../utils/getMousePoint.js";
import { getMagnetPoint } from "./getMagnetPoint.js";
import { Room } from "./room.js";

const SQUARE_SIZE = 5;
/** @type {import ("../../../models/base/ISize.js").ISize} */
const size = { h: SQUARE_SIZE, w: SQUARE_SIZE };
const fillStyle = "black";
const fillStyleAction = "blue";

/** @type {(props: {points: import("../../../models/base/IPoint.js").IPoint[], e: MouseEvent, isDrawEnded: boolean}) => ReturnType<import("./Room.js").IRoom["roomHover"] >| void} */
export const handleHoverMove = ({ points, e, isDrawEnded }) => {
	const mousePosition = getMousePoint(e);

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

			return { ...Methods, roomClick: Room.roomClick };
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

			return { ...Methods, roomClick: Room.roomClick };
		}

		// помечаем начальную точку цветом
		Draw.rect(
			{ rect: { position: magnetPoint.mousePosition, size: size } },
			{ fillStyle: fillStyleAction },
		);

		return { ...Methods, roomClick: Room.roomClick };
	}

	// Рендерим квадрат на ховер даже если нет точек
	Draw.rect({ rect: { position: mousePosition, size: size } }, { fillStyle });
};
