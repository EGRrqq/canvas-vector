import { Methods } from "../board/methods/index.js";
import { Ctx } from "../ctx/index.js";

/**
 * @typedef {object} IImageSettings
 */

/**
 * @typedef {object} IImageData
 * @property {HTMLImageElement} image
 * @property {import("../models/base/IPoint.js").IPoint} position
 * @property {number} [angle] - Угол поворота изображения в градусах
 */

/** @type {IImageSettings} */
const defaultSettings = {};

/** @type {import("./Draw.js").TDraw<IImageData,IImageSettings>} */
export const image = ({ image, position, angle = 0 }, settings) => {
	const s = { ...defaultSettings, ...settings };
	const ctx = Ctx.getCtx();

	ctx.save(); // Сохраняем текущее состояние контекста
	ctx.translate(position.x + image.width / 2, position.y + image.height / 2); // Перемещаем контекст в центр изображения
	ctx.rotate(angle * (Math.PI / 180)); // Поворачиваем контекст на заданный угол в радианах
	ctx.drawImage(image, -image.width / 2, -image.height / 2); // Рисуем изображение, сдвинув его обратно в центр
	ctx.restore(); // Восстанавливаем состояние контекста

	return Methods;
};
