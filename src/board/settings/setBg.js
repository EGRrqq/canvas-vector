import { Ctx } from "../../ctx/index.js";
import { Draw } from "../../draw/index.js";

/** @type {(color: import("./Settings.js").ISettings["bgColor"]) => void} */
export const setBg = (color) => {
  const { width, height } = Ctx.getCtx().canvas;

  Draw.rect(
    {
      rect: {
        position: { x: 0, y: 0 },
        size: { width: width * 2, height: height * 2 },
      },
    },
    { fillStyle: color }
  );
};

