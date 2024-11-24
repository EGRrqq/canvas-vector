import type { IMethods } from "../../board/methods/Methods";
import type { Tools } from "./index.js";

export type TTools = typeof Tools;

export interface ITool {
	init: () => IMethods;
}
