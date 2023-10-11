export const currentTerm = "202301";

export const courseTypes = ["Required", "University", "Core", "Area", "Free"];

export const majorPrograms = [
	["BSCS", "CS"],
	["BSMS", "IE"],
	["BSEE", "EE"],
	["BSME", "ME"],
	["BSMAT", "MAT"],
	["BSBIO", "BIO"]
];

export const admitTerms = [
	["202301", "Fall 2023-2024"],
	["202201", "Fall 2022-2023"],
	["202101", "Fall 2021-2022"],
	["202001", "Fall 2020-2021"],
	["201901", "Fall 2019-2020"]
];

export const terms = [
	["202301", "Fall 2023-2024"],
	["202202", "Spring 2022-2023"],
	["202201", "Fall 2022-2023"],
	["202102", "Spring 2021-2022"],
	["202101", "Fall 2021-2022"],
	["202002", "Spring 2020-2021"],
	["202001", "Fall 2020-2021"]
];

export type CourseData = {
	crn: string;
	code: string;
	section: string;
	total_capacity: number;
	actual_capacity: number;
	remaining_capacity: number;
}
