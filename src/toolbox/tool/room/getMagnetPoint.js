/** @type {(points: import("../../../models/base/IPoint.js").IPoint[], mousePosition: import("../../../models/base/IPoint.js").IPoint) =>  import("../../../models/base/IPoint.js").IPoint | null} */
export const getMagnetPoint = (points, mousePos) => {
	if (points.length > 2) {
		const point = points[0];
		if (Math.hypot(point.x - mousePos.x, point.y - mousePos.y) < 8) {
			return point; // Возвращаем точку, к которой магнитится курсор
		}
	}
	return null; // Если магнитных точек нет
};
