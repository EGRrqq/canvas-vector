import { Board } from "./board/index.js";
import { Room } from "./toolbox/tool/room/room.js";

document.addEventListener("DOMContentLoaded", render);

const Canvas = Board("board", { alpha: false });

function render() {
	Canvas.clear()
		.scale()
		.updateSettings({ bgColor: "#fff" })
		.getActiveTool()
		.room.roomHover()
		.roomClick();

	Room.roomHover();

	window.requestAnimationFrame(render);
}
