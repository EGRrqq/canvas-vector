import type { IMethods } from "../../../board/methods/Methods.js";

type IRoomReturn<T> = IMethods & T;

export interface IRoom {
	roomClick: () => IRoomReturn<Pick<IRoom, "roomHover">>;
	roomHover: () => IRoomReturn<Pick<IRoom, "roomClick">>;
	resetData: () => IMethods;
}
