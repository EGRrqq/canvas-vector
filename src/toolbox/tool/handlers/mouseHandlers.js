import { Ctx } from "../../../ctx/index.js";

/**
 * @typedef {object} IEventFalse
 * @property {false} flag
 * @property {null} e
 */

/**
 * @typedef {object} IEventTrue
 * @property {true} flag
 * @property {MouseEvent} e
 */

/**
 * @typedef {object} IEvents
 * @property {IEventFalse | IEventTrue} mouseMove
 * @property {IEventFalse | IEventTrue} mouseUp
 * @property {IEventFalse | IEventTrue} mouseDown
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
	events.mouseMove = {
		flag: false,
		e: null,
	};
};
/** @type {TMouseHandler} */
const mouseUp = (e) => {
	events.mouseDown = {
		flag: false,
		e: null,
	};

	events.mouseUp = {
		flag: true,
		e,
	};
};
/** @type {TMouseHandler} */
const mouseDown = (e) => {
	events.mouseUp = {
		flag: false,
		e: null,
	};

	events.mouseDown = {
		flag: true,
		e,
	};
};

export const setMouseHandlers = () => {
	const canvas = Ctx.getCtx().canvas;

	canvas.addEventListener("mousemove", mouseMove);
	canvas.addEventListener("mouseleave", mouseLeave);
	canvas.addEventListener("mouseup", mouseUp);
	canvas.addEventListener("mousedown", mouseDown);
};

/** @type {() => IEvents} */
export const getMouseHandlers = () => events;
