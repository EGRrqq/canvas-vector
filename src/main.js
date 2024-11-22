import { Board } from "./board/index.js";

document.addEventListener("DOMContentLoaded", render);

const Canvas = Board("board", { alpha: false });

function render() {
	Canvas.clear().scale().updateSettings({ bgColor: "#fff" });

	if (!Canvas.getTools().room.isDrawEnded()) {
		Canvas.getTools().room.roomHover().roomClick();
	} else {
		Canvas.draw.line({ path: Canvas.getTools().room.points() }, { fill: true });
	}

	window.requestAnimationFrame(render);
}
