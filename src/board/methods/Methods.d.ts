import type { Draw } from "../../draw/index.js";
import type { Toolbox } from "../../toolbox/index.js";
import type { View } from "../../view/index.js";
import type { Settings } from "../settings/index.js";

type TSettings = typeof Settings;
type IDraw = { draw: typeof Draw };
type IView = typeof View;
type IToolbox = typeof Toolbox;

export interface IMethods extends IDraw, TSettings, IView, IToolbox {}
