// ray-tracing алгоритм
/** @type{(mousePosition: import("../../../models/base/IPoint").IPoint, points: import("../../../models/base/IPoint").IPoint[]) => boolean} */
export const isPointInsideRoom = (mousePosition, points) => {
	let intersections = 0;
	const { x, y } = mousePosition;

	for (let i = 0; i < points.length; i++) {
		const p1 = points[i];
		const p2 = points[(i + 1) % points.length]; // Следующая точка, с учетом замыкания

		// Проверяем, пересекает ли горизонтальный луч, проведенный вправо от точки
		if (p1.y > y !== p2.y > y) {
			// Если одна точка выше, а другая ниже
			const slope = ((p2.x - p1.x) * (y - p1.y)) / (p2.y - p1.y) + p1.x; // Находим x-координату пересечения
			if (x < slope) {
				intersections++; // Увеличиваем счетчик пересечений
			}
		}
	}

	// Если количество пересечений нечетное, точка внутри многоугольника
	return intersections % 2 === 1;
};
