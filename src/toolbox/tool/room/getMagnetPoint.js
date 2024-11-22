// /** @type {(points: import("../../../models/base/IPoint.js").IPoint[], mousePosition: import("../../../models/base/IPoint.js").IPoint) =>  import("../../../models/base/IPoint.js").IPoint | null} */
// export const getMagnetPoint = (points, mousePos) => {
// 	if (points.length > 2) {
// 		const point = points[0];
// 		if (Math.hypot(point.x - mousePos.x, point.y - mousePos.y) < 8) {
// 			return point; // Возвращаем точку, к которой магнитится курсор
// 		}
// 	}
// 	return null; // Если магнитных точек нет
// };

// Обновленная функция getMagnetPoint
/** @type {(points: import("../../../models/base/IPoint.js").IPoint[], mousePosition: import("../../../models/base/IPoint.js").IPoint) => {mousePosition: import("../../../models/base/IPoint.js").IPoint, isFirstPoint: boolean} | null} */
export const getMagnetPoint = (points, mousePos) => {
	// Если не нажата клавиша Alt или нет магнитных точек
	if (points.length > 2) {
		const firstPoint = points[0];
		if (Math.hypot(firstPoint.x - mousePos.x, firstPoint.y - mousePos.y) < 8) {
			console.log("first");
			return { mousePosition: firstPoint, isFirstPoint: true }; // Возвращаем первую точку, к которой магнитится курсор
		}
	}

	for (const point of points) {
		// Проверяем магнит на оси X
		if (Math.abs(point.x - mousePos.x) < 8) {
			return {
				mousePosition: { x: point.x, y: mousePos.y },
				isFirstPoint: false,
			}; // Магнитим по оси X
		}
		// Проверяем магнит на оси Y
		if (Math.abs(point.y - mousePos.y) < 8) {
			return {
				mousePosition: { x: mousePos.x, y: point.y },
				isFirstPoint: false,
			}; // Магнитим по оси Y
		}
	}

	return null; // Если магнитных точек нет
};
