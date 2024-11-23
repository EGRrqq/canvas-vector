import type { IMethods } from "../../../board/methods/Methods.js";
import type { IPoint } from "../../../models/base/IPoint.js";

type IRoomReturn<T> = IMethods & T;

export interface IRoom {
	roomClick: () => IRoomReturn<Pick<IRoom, "roomHover">>;
	roomHover: () => IRoomReturn<Pick<IRoom, "roomClick">>;
	getIsDrawEnded: () => boolean;
	getPoints: () => IPoint[];
}
declare const blah: IRoom["roomClick"];
