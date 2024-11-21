export interface ISettingsProps {
  bgColor: CanvasFillStrokeStyles["strokeStyle"];
}

export type TUpdateFunctions = {
  [K in keyof ISettingsProps]: (value: ISettingsProps[K]) => void;
};

