/** @typedef{() => CanvasRenderingContext2D} TGetContext*/
/** @typedef{(id: string, settings?: import("./Ctx").ICtxSettings) => {getCtx: TGetContext}} TSetContext*/

/** @type {CanvasRenderingContext2D | null} */
let CTX = null;

/** @type {import("./Ctx").ICtxSettings} */
const defaultSettings = {
	alpha: false,
};

/** @type {TSetContext} */
export const setCtx = (id, settings) => {
	const s = { ...defaultSettings, ...settings };

	const canvas = document.getElementById(id);

	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error(`canvas елемент c id: '${id}' не найден`);

	CTX = canvas.getContext("2d", { alpha: s.alpha });

	return { getCtx };
};

/** @type {TGetContext} */
export const getCtx = () => {
	if (!CTX) throw new Error("Ошибка во время получения 2д контекста");

	return CTX;
};
