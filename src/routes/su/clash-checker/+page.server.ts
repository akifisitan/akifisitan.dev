import type { PageServerLoad } from "./$types";
import { courseMap, days } from "./data";

export const load: PageServerLoad = async () => {
	return {
		courseMap,
		days
	};
};
