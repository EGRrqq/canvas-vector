import { Draw } from "../../draw/index.js";
import { View } from "../../view/index.js";
import { Settings } from "../settings/index.js";

type TSettings = typeof Settings;
type IDraw = typeof Draw;
type IView = typeof View;

export interface IMethods extends IDraw, TSettings, IView {}

