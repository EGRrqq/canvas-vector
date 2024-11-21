import type { IPoint } from "../base/IPoint";
import type { ISize } from "../base/ISize";

export interface IRect {
	position: IPoint; // координата центра прямоугольника
	size: ISize;
}
