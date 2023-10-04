<script lang="ts">
	import { calculateCredits, calculateSemesterGpa, type Course } from "./gpa-calc-utils";

	export let courses: Course[];

	$: semesterCredits = calculateCredits(courses);
	$: semesterGpa = calculateSemesterGpa(courses).toString().slice(0, 4);
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
					<td><input bind:value={course.name} type="text" /></td>
					<td><input bind:value={course.credits} type="number" /></td>
					<td><input bind:value={course.grade} type="text" /></td>
					<button
						on:click={() => {
							courses.splice(index, 1);
							courses = courses;
						}}>Delete</button
					>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td>Total</td>
				<td>{semesterCredits}</td>
				<td>{semesterGpa}</td>
			</tr>
		</tfoot>
	</table>
	<button
		on:click={() => {
			if (courses.length >= 10) {
				alert("You can only take a maximum of 10 courses per semester");
				return;
			}
			courses.push({ name: "", grade: "S", credits: 3 });
			courses = courses;
		}}>Add Row</button
	>
</div>
