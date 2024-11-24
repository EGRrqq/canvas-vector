/** @type {(startBtnId: string, canvas: import("../../board/methods/Methods").IMethods) => void} */
export const init = (id, Canvas) => {
	const btn = getStartBtn(id);

	btn.addEventListener("click", () => render(Canvas), { once: true });
};

/** @type {(id: string) => HTMLButtonElement} */
const getStartBtn = (id) => {
	const btn = document.getElementById(id);

	if (!(btn instanceof HTMLButtonElement))
		throw new Error(`button елемент c id: '${id}' не найден`);

	return btn;
};

/** @type {(Canvas: import("../../board/methods/Methods").IMethods) => void} */
function render(Canvas) {
	Canvas.clear()
		.scale()
		.updateSettings({ bgColor: "#fff" })
		.setActiveTool("room");

	window.requestAnimationFrame(() => render(Canvas));
}
