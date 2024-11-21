import { Draw } from "../../draw/index.js";

/** @type {(color: import("./Settings.js").ISettings["bgColor"]) => void} */
export const setBg = (color) => {
	Draw.rect(
		{
			rect: {
				position: { x: 0, y: 0 },
				size: { width: window.innerWidth * 2, height: window.innerHeight * 2 },
			},
		},
		{ fillStyle: color },
	);
};
