import { Board } from "./board/index.js";
import * as StartBtn from "./ui/startBtn/index.js";

const Canvas = Board("board", { alpha: false });
document.addEventListener(
	"DOMContentLoaded",
	() => StartBtn.init("start-btn", Canvas),
	{ once: true },
);
