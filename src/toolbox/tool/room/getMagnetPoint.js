const RADIUS = 8;

/** @type {(points: import("../../../models/base/IPoint.js").IPoint[], mousePosition: import("../../../models/base/IPoint.js").IPoint) => {mousePosition: import("../../../models/base/IPoint.js").IPoint, isFirstPoint: boolean} | null} */
export const getMagnetPoint = (points, mousePos) => {
	if (points.length > 2) {
		const firstPoint = points[0];
		if (
			Math.hypot(firstPoint.x - mousePos.x, firstPoint.y - mousePos.y) < RADIUS
		) {
			return { mousePosition: firstPoint, isFirstPoint: true }; // Возвращаем первую точку, к которой магнитится курсор
		}
	}

	for (const point of points) {
		// Проверяем магнит на оси X
		if (Math.abs(point.x - mousePos.x) < RADIUS) {
			return {
				mousePosition: { x: point.x, y: mousePos.y },
				isFirstPoint: false,
			}; // Магнитим по оси X
		}
		// Проверяем магнит на оси Y
		if (Math.abs(point.y - mousePos.y) < RADIUS) {
			return {
				mousePosition: { x: mousePos.x, y: point.y },
				isFirstPoint: false,
			}; // Магнитим по оси Y
		}
	}

	return null; // Если магнитных точек нет
};
