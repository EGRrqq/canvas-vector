/** @type {(startBtnId: string, canvas: import("../../board/methods/Methods").IMethods) => void} */
export const init = (id, Canvas) => {
	const btn = getStartBtn(id);

	btn.addEventListener("click", () => onClick(Canvas));
};

/** @type {(id: string) => HTMLButtonElement} */
const getStartBtn = (id) => {
	const btn = document.getElementById(id);

	if (!(btn instanceof HTMLButtonElement))
		throw new Error(`button елемент c id: '${id}' не найден`);

	return btn;
};

/** @type {(Canvas: import("../../board/methods/Methods").IMethods) => void} */
function onClick(Canvas) {
	const toolType = "room";
	const render = () => {
		Canvas.clear()
			.scale()
			.updateSettings({ bgColor: "#fff" })
			.setActiveTool(toolType);

		window.requestAnimationFrame(render);
	};

	Canvas.getTools()[toolType].resetData();
	render();
}
