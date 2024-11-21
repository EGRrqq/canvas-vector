import { Draw } from "../../draw/index.js";
import { Settings } from "../settings/index.js";

type TSettings = typeof Settings;
type IDraw = typeof Draw;

export interface IMethods extends IDraw, TSettings {}

