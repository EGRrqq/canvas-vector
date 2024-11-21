import { Draw } from "../../draw/index.js";
import { Settings } from "../settings/index.js";

/** @type {import("./Methods").IMethods} */
export const Methods = {
  ...Draw,
  ...Settings,
};

