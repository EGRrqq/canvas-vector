import { Draw } from "../../draw/index.js";

/** @type {(color: import("./Settings.js").ISettingsProps["bgColor"]) => void} */
export const setBg = (color) => {
	const { innerWidth: width, innerHeight: height } = window;

	Draw.rect(
		{
			rect: {
				position: { x: 0, y: 0 },
				size: { width: width * 2, height: height * 2 },
			},
		},
		{ fillStyle: color },
	);
};
