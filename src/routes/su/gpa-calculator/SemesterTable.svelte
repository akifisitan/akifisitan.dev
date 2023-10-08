<script lang="ts">
	import { calculateCredits, calculateSemesterGpa, type Course } from "./gpa-calc-utils";
	import * as Select from "$lib/components/ui/select";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";

	export let courses: Course[];

	let semesterCredits = 0;
	let semesterQualityPoints = 0;
	let semesterGpa = "0.00";

	function calculateTable(courses: Course[]) {
		const result = calculateSemesterGpa(courses);
		semesterCredits = result.semesterCredits;
		semesterQualityPoints = result.semesterQualityPoints;
		semesterGpa = result.semesterGpa.toString().slice(0, 4);
	}

	$: calculateTable(courses);
	// $: semesterCredits = calculateCredits(courses);
	// $: semesterGpa = calculateSemesterGpa(courses).toString().slice(0, 4);
</script>

<div>
	<table>
		<thead>
			<tr>
				<th>Course</th>
				<th>Credits</th>
				<th>Grade</th>
			</tr>
		</thead>
		<tbody>
			{#each courses as course, index}
				<tr>
					<td><Input bind:value={course.name} type="text" /></td>
					<td><Input bind:value={course.credits} type="text" /></td>
					<td><Input bind:value={course.grade} type="text" /></td>
					{#if index !== 0}
						<Button
							variant="destructive"
							on:click={() => {
								courses.splice(index, 1);
								courses = courses;
							}}>Delete</Button
						>
					{/if}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td>Total</td>
				<td>{semesterCredits}</td>
				<td>GPA: {semesterGpa} | Quality Points: {semesterQualityPoints}</td>
			</tr>
		</tfoot>
	</table>
	<Button
		variant="outline"
		on:click={() => {
			if (courses.length >= 10) {
				alert("You can only take a maximum of 10 courses per semester");
				return;
			}
			courses.push({ name: "", grade: "S", credits: 3 });
			courses = courses;
		}}>Add Row</Button
	>
</div>
