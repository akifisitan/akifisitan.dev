<script lang="ts">
	import { onMount } from "svelte";
	import SemesterTable from "./SemesterTable.svelte";
	import { browser } from "$app/environment";
	import {
		calculateSemesterGpa,
		calculateCumulativeGpa,
		type Course,
		parseImportedData
	} from "./gpa-calc-utils";

	let profileName = "semesters";
	let currentSemester = 0;
	let semesters: Course[][] = [[{ name: "", grade: "A", credits: 3 }]];
	let firstRun = true;
	// @ts-ignore need to make this reactive so pass in dummy argument
	$: cumulativeGpa = calculateCumulativeGpa(semesters, currentSemester)
		.toString()
		.slice(0, 4);

	$: if (browser && firstRun === false) {
		const storedSemesters = localStorage.getItem(profileName);
		if (storedSemesters) {
			semesters = JSON.parse(storedSemesters);
		}
	}

	$: if (browser && firstRun === false) {
		localStorage.setItem(profileName, JSON.stringify(semesters));
	}

	onMount(() => {
		const storedSemesters = localStorage.getItem(profileName);
		if (storedSemesters) {
			semesters = JSON.parse(storedSemesters);
		}
		firstRun = false;
	});
</script>

<svelte:head>
	<title>GPA Calculator</title>
</svelte:head>

<div>
	<p>Cumulative GPA: {cumulativeGpa}</p>
	<label for="profile-name">Profile Name</label>
	<select id="profile-name" bind:value={profileName}>
		{#if browser}
			{#each Object.keys(localStorage) as profile}
				<option value={profile}>{profile}</option>
			{/each}
		{:else}
			<option value="semesters">semesters</option>
		{/if}
	</select>
	<br />
	<button
		on:click={() => {
			semesters.push([{ name: "", grade: "A", credits: 3 }]);
			semesters = semesters;
			currentSemester = semesters.length - 1;
		}}>Add Semester</button
	>
	<button
		on:click={() => {
			semesters.splice(currentSemester, 1);
			currentSemester = currentSemester - 1;
			semesters = semesters;
		}}>Delete Semester</button
	>
	<button
		on:click={() => {
			const importedData = prompt("Paste your data here");
			if (importedData) {
				semesters = parseImportedData(importedData);
			}
		}}
		>Import
	</button>
	<button
		on:click={() => {
			const choice = confirm("Are you sure you want to clear all data?");
			if (!choice) return;
			semesters = [[{ name: "", grade: "A", credits: 3 }]];
			currentSemester = 0;
		}}>Clear</button
	>
	<div>
		{#if semesters}
			{#each semesters as _, index}
				<button
					class:selected={currentSemester === index}
					on:click={() => {
						currentSemester = index;
						console.log(currentSemester);
						console.log(semesters[currentSemester]);
					}}>{index}</button
				>
			{/each}
		{/if}
	</div>
	{#if semesters[currentSemester]}
		<SemesterTable bind:courses={semesters[currentSemester]} />
	{/if}
</div>

<style>
	.selected {
		background-color: #000;
		color: #fff;
	}
</style>
