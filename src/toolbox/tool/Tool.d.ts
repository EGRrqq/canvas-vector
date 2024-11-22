import type { Tools } from "./index.js";

export type TToolState = () => void;

export type TTools = typeof Tools;
export type TToolsType = keyof TTools;
