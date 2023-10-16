export const courseMap: Map<string, number> = new Map([
	["A", 4.0],
	["A-", 3.7],
	["B+", 3.3],
	["B", 3.0],
	["B-", 2.7],
	["C+", 2.3],
	["C", 2.0],
	["C-", 1.7],
	["D+", 1.3],
	["D", 1.0],
	["F", 0.0],
	["NA", 0.0],
	["S", 0.0],
	["U", 0.0]
]);

export type Course = {
	name: string;
	grade: string;
	credits: number;
};

export function calculateSemesterGpa(courses: Course[]) {
	let totalCredits = 0;
	let totalQualityPoints = 0;
	for (let i = 0; i < courses.length; i++) {
		const course = courses[i];
		if (!courseMap.has(course.grade) || course.grade === "S" || course.grade === "U")
			continue;
		totalCredits += Number(course.credits);
		totalQualityPoints += Number(course.credits) * courseMap.get(course.grade)! * 10;
	}
	if (totalCredits === 0)
		return { semesterGpa: 0, semesterCredits: 0, semesterQualityPoints: 0 };
	return {
		semesterGpa: totalQualityPoints / totalCredits / 10,
		semesterCredits: totalCredits,
		semesterQualityPoints: totalQualityPoints / 10
	};
}

export function calculateCumulativeGpa(semesters: Course[][]) {
	console.log("Calculating cumulative GPA...");
	let gpaCredits = 0;
	let attemptedCredits = 0;
	let totalGradePoints = 0;
	const courses: Map<string, number> = new Map();
	for (let i = 0; i < semesters.length; i++) {
		const semester = semesters[i];
		for (let j = 0; j < semester.length; j++) {
			const course = semester[j];
			if (
				course.name === "" ||
				!courseMap.has(course.grade) ||
				course.grade === "S" ||
				course.grade === "U"
			)
				continue;
			const courseGradePoints =
				Number(course.credits) * courseMap.get(course.grade)! * 10;
			const prevCourseGradePoints = courses.get(course.name);
			if (prevCourseGradePoints) {
				// If the course is repeated and the new grade is better
				if (courseGradePoints > prevCourseGradePoints) {
					totalGradePoints -= prevCourseGradePoints;
					totalGradePoints += courseGradePoints;
					courses.set(course.name, courseGradePoints);
				} // If the course is repeated and the new grade is worse or equal
				else {
					// do stuff
				}
			} else {
				totalGradePoints += courseGradePoints;
				gpaCredits += Number(course.credits);
				courses.set(course.name, courseGradePoints);
			}
			attemptedCredits += Number(course.credits);
		}
	}
	if (gpaCredits === 0) return { cumulativeGpa: 0, gpaCredits: 0, attemptedCredits: 0 };
	return {
		cumulativeGpa: totalGradePoints / gpaCredits / 10,
		gpaCredits: gpaCredits,
		attemptedCredits: attemptedCredits
	};
}

export function calculateCredits(courses: Course[]) {
	let totalCredits = 0;
	for (let i = 0; i < courses.length; i++) {
		totalCredits += Number(courses[i].credits);
	}
	return totalCredits;
}

const sampleData =
	"HIST191,2,C;IF100,3,B;MATH101,3,D+;NS101,4,C;SPS101,3,C;TLL101,2,C|AL102,3,A;HIST192,2,C+;MATH102,3,C;NS102,4,C+;SPS102,3,C;TLL102,2,F|CS201,3,D;ENS205,3,D+;ENS208,3,F;MATH201,3,F;MATH203,3,F;PSY201,3,B+;TLL102,2,D+";

// const sampleData2 = "CIP101N,0,S;HIST191,0,S;IF100,3,A-;MATH101,3,A;NS101,4,A;SPS101,0,S;TLL101,2,B+|AL102,0,U;HIST192,2,B;MATH102,3,B+;NS102,4,B;SPS102,0,U;TLL102,2,D|AL102,3,C;CS201,3,C;ECON201,3,C;MATH201,3,C;MATH203,3,C;SPS102,0,NA|CS204,3,D+;MATH202,3,C+;MATH204,3,B-;PROJ201,1,A-;PSY201,3,B-;SPS102,3,B-|CS300,3,A;CS306,3,C+;CS310,3,A;NS213,3,A;PSY203,3,B-;SPS303,3,C-|CS301,3,C;CS303,4,B+;CS305,3,B;CS408,3,B+;ENS205,3,A;HUM202,3,C+";

export function parseImportedData(data: string = sampleData) {
	const semesters = data.split("|");
	if (semesters[semesters.length - 1] === "") semesters.pop();
	const semesterData: Course[][] = [];
	// For each semester
	for (let i = 0; i < semesters.length; i++) {
		const semester = semesters[i];
		const courses = semester.split(";");
		if (courses[courses.length - 1] === "") courses.pop();
		const courseData: Course[] = [];
		// For each course
		for (let j = 0; j < courses.length; j++) {
			const course = courses[j].split(",");
			const name = course[0];
			const credits = Number(course[1]);
			const grade = course[2];
			courseData.push({ name, credits, grade });
		}
		semesterData.push(courseData);
	}
	console.log(semesterData);
	return semesterData;
}

export function formatGpa(gpa: number) {
	const gpaString = gpa.toString();
	switch (gpaString.length) {
		case 1:
			return gpaString + ".00";
		case 3:
			return gpaString + "0";
		default:
			return gpaString.slice(0, 4);
	}
}
