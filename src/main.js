import { Board } from "./board/index.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
	Board("board", { alpha: false });
}
