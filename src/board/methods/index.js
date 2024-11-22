import { Draw } from "../../draw/index.js";
import { Toolbox } from "../../toolbox/index.js";
import { View } from "../../view/index.js";
import { Settings } from "../settings/index.js";

/** @type {import("./Methods").IMethods} */
export const Methods = {
	draw: Draw,
	...Settings,
	...View,
	...Toolbox,
};
