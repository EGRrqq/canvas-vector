/** @type{(Image: HTMLImageElement, points: import("../../../../models/base/IPoint").IPoint[]) => import("../../../../models/base/IPoint").IPoint} */
export const getRoomCenterPoint = (image, points) => {
	const minX = Math.min(...points.map((p) => p.x));
	const maxX = Math.max(...points.map((p) => p.x));
	const minY = Math.min(...points.map((p) => p.y));
	const maxY = Math.max(...points.map((p) => p.y));

	const centerX = (minX + maxX) / 2 - image.width / 2;
	const centerY = (minY + maxY) / 2 - image.height / 2;

	return { x: centerX, y: centerY };
};
