import type { rect } from "./rect";

export type TDraw<D, S> = (data: D, settings?: Partial<S>) => void;

export interface IDraw {
	rect: typeof rect;
}
