/** @type{(image: HTMLImageElement, mousePosition: import("../../../../models/base/IPoint").IPoint, imagePosition: import("../../../../models/base/IPoint").IPoint) => boolean} */
export const isPointInsideFurniture = (image, mousePos, imagePos) => {
	const sofaWidth = image.width;
	const sofaHeight = image.height;

	return (
		mousePos.x >= imagePos.x &&
		mousePos.x <= imagePos.x + sofaWidth &&
		mousePos.y >= imagePos.y &&
		mousePos.y <= imagePos.y + sofaHeight
	);
};
