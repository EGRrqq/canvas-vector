export interface ISettings {
	bgColor: CanvasFillStrokeStyles["strokeStyle"];
}

export type TUpdateFunctions = {
	[K in keyof ISettings]: (value: ISettings[K]) => void;
};
