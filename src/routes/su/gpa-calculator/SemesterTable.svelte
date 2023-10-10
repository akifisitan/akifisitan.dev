<script lang="ts">
	import {
		calculateCredits,
		calculateSemesterGpa,
		courseMap,
		type Course
	} from "./gpa-calc-utils";
	import * as Select from "$lib/components/ui/select";
	import { Trash2 } from "lucide-svelte";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { fade, fly } from "svelte/transition";

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
</script>

<div in:fly={{ x: -100, delay: 200 }} out:fly={{ x: 100, duration: 100 }}>
	<table class="border-spacing-1 border-separate">
		<thead>
			<tr>
				<th class="min-w-[4rem] w-[8rem] text-center">Course</th>
				<th class="min-w-[2rem] w-[4rem] text-center">Credits</th>
				<th class="min-w-[2rem] w-[4rem] text-center">Grade</th>
			</tr>
		</thead>
		<tbody>
			{#each courses as course, index}
				<tr transition:fade={{ delay: 100 * index, duration: 300 }}>
					<td
						><Input
							class="text-center"
							bind:value={course.name}
							type="text"
							maxlength={10}
						/></td
					>
					<td
						><Input
							class="text-center"
							bind:value={course.credits}
							type="text"
							maxlength={1}
						/></td
					>
					<td
						><Input
							class="text-center"
							bind:value={course.grade}
							type="text"
							maxlength={2}
						/></td
					>
					{#if index !== 0}
						<td>
							<Button
								variant="destructive"
								on:click={() => {
									courses.splice(index, 1);
									courses = courses;
								}}><Trash2 /></Button
							>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr in:fade={{ delay: 200 * courses.length, duration: 300 }}>
				<td>Total</td>
				<td class="text-center">{semesterCredits}</td>
				<td class="text-center">{semesterGpa}</td>
			</tr>
		</tfoot>
	</table>
	<p>Quality Points: {semesterQualityPoints}</p>
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
