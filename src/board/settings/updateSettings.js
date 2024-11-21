import { setBg } from "./setBg.js";

/** @type{import("./Settings.js").TUpdateFunctions} */
const updateFunctions = {
	bgColor: setBg,
};

/** @type {(settings: Partial<import("./Settings.js").ISettings>) => void} */
export const updateSettings = (s) => {
	console.log("runin");
	for (const key in s) {
		if (!(key in updateFunctions))
			throw new Error(
				`Настройка "${key}" не поддерживается. Список доступных настроек: ${JSON.stringify(Object.keys(updateFunctions))}`,
			);

		updateFunctions[key](s[key]);
	}

	return;
};
