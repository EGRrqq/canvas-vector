import type { Draw } from "../../draw/index.js";
import type { View } from "../../view/index.js";
import type { Settings } from "../settings/index.js";

type TSettings = typeof Settings;
type IDraw = typeof Draw;
type IView = typeof View;

export interface IMethods extends IDraw, TSettings, IView {}
