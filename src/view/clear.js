import { Methods } from "../board/methods/index.js";
import { Ctx } from "../ctx/index.js";

/** @type {() => import("../board/methods/Methods").IMethods} */
export const clear = () => {
  Ctx.getCtx().clearRect(
    0,
    0,
    Ctx.getCtx().canvas.width,
    Ctx.getCtx().canvas.height
  );

  return Methods;
};

