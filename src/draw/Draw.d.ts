import { IMethods } from "../board/methods/Methods";

export type TDraw<D, S> = (data: D, settings?: Partial<S>) => IMethods;

