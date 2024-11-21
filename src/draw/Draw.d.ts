import type { rect } from "./rect.js";

export type TDraw<D, S> = (data: D, settings?: Partial<S>) => void;

export interface IDraw {
	rect: typeof rect;
}
