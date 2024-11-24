import { Board } from "./board/index.js";

document.addEventListener("DOMContentLoaded", render);

const Canvas = Board("board", { alpha: false });

function render() {
	Canvas.clear()
		.scale()
		.updateSettings({ bgColor: "#fff" })
		.setActiveTool("room");

	window.requestAnimationFrame(render);
}
