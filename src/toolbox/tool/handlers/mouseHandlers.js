import { Ctx } from "../../../ctx/index.js";

/**
 * @typedef {object} IEvent
 * @property {boolean} flag
 * @property {MouseEvent | null} e
 */

/**
 * @typedef {object} IEvents
 * @property {IEvent} mouseMove
 * @property {IEvent} mouseUp
 * @property {IEvent} mouseDown
 */

/** @typedef {(e: MouseEvent) => void} TMouseHandler*/

/** @type {IEvents} */
const events = {
	mouseMove: { flag: false, e: null },
	mouseDown: { flag: false, e: null },
	mouseUp: { flag: false, e: null },
};

/** @type {TMouseHandler} */
const mouseMove = (e) => {
	events.mouseMove = {
		flag: true,
		e,
	};
};
/** @type {TMouseHandler} */
const mouseLeave = () => {
	events.mouseMove.flag = false;
};
/** @type {TMouseHandler} */
const mouseUp = (e) => {
	events.mouseDown.flag = false;

	events.mouseUp = {
		flag: true,
		e,
	};
};
/** @type {TMouseHandler} */
const mouseDown = (e) => {
	events.mouseUp.flag = false;

	events.mouseDown = {
		flag: true,
		e,
	};
};
/** @type {TMouseHandler} */
const contextMenu = (e) => {
	e.preventDefault(); // Предотвращаем появление контекстного меню
};

export const setMouseHandlers = () => {
	const canvas = Ctx.getCtx().canvas;

	canvas.addEventListener("mousemove", mouseMove);
	canvas.addEventListener("mouseleave", mouseLeave);
	canvas.addEventListener("mouseup", mouseUp);
	canvas.addEventListener("mousedown", mouseDown);
	canvas.addEventListener("contextmenu", contextMenu);
};

/** @type {() => IEvents} */
export const getMouseHandlers = () => events;
