import { Draw } from "../../draw/index.js";

/** @type {(color: import("./Settings.js").ISettingsProps["bgColor"]) => void} */
export const setBg = (color) => {
	const { innerWidth: w, innerHeight: h } = window;

	Draw.rect(
		{
			rect: {
				position: { x: 0, y: 0 },
				size: { w: w * 2, h: h * 2 },
			},
		},
		{ fillStyle: color },
	);
};
