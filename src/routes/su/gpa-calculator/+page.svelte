<script lang="ts">
	import { onMount } from "svelte";
	import SemesterTable from "./SemesterTable.svelte";
	import { Trash2 } from "lucide-svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Select from "$lib/components/ui/select";
	import { Label } from "$lib/components/ui/label";
	import { fade } from "svelte/transition";
	import {
		calculateCumulativeGpa,
		type Course,
		parseImportedData
	} from "./gpa-calc-utils";

	let profiles: Record<string, any> = {
		default: { semesters: [[{ name: "", grade: "A", credits: 3 }]] }
	};
	let loaded = false;
	let currentSemester = 0;
	let currentProfile = "default";
	let semesters: Course[][] = [[{ name: "", grade: "A", credits: 3 }]];
	let cumulativeGpa: string = "0.00";
	let gpaCredits = 0;
	let attemptedCredits = 0;
	let importDialogIsOpen = false;
	let confirmDialogIsOpen = false;
	let profileName = "";
	let importData = "";

	$: {
		const result = calculateCumulativeGpa(semesters);
		gpaCredits = result.gpaCredits;
		attemptedCredits = result.attemptedCredits;
		cumulativeGpa = result.cumulativeGpa.toString().slice(0, 4);
	}

	function switchProfile(profileName: string | undefined | any) {
		if (!profileName) profileName = "default";
		console.log("Switched to profile: ", profileName);
		currentProfile = profileName;
		semesters = profiles[profileName].semesters;
		currentSemester = 0;
	}

	function addProfile() {
		const profileName = prompt("Enter profile name");
		if (profileName === null) return;
		profiles[profileName] = { semesters: [[{ name: "", grade: "A", credits: 3 }]] };
		switchProfile(profileName);
	}

	function deleteProfile() {
		const toBeDeleted = currentProfile;
		if (toBeDeleted === "default") {
			alert("You cannot delete the default profile!");
			return;
		}
		currentProfile = "default";
		delete profiles[toBeDeleted];
	}

	function handleImport() {
		semesters = parseImportedData(importData);
		importDialogIsOpen = false;
	}

	function handleClear() {
		profiles = {
			default: { semesters: [[{ name: "", grade: "A", credits: 3 }]] }
		};
		currentSemester = 0;
	}

	$: semesters = profiles[currentProfile].semesters;

	$: if (loaded) {
		localStorage.setItem("gpa-calculator-profiles", JSON.stringify(profiles));
	}

	onMount(() => {
		const storedProfiles = localStorage.getItem("gpa-calculator-profiles");
		if (storedProfiles) {
			profiles = JSON.parse(storedProfiles);
		}
		loaded = true;
	});
</script>

<svelte:head>
	<title>GPA Calculator</title>
</svelte:head>

<div class="p-4">
	<div>
		<Label>Current Profile</Label>
		<Select.Root
			selected={{ value: "default", label: "default" }}
			onSelectedChange={(e) => {
				switchProfile(e?.value);
			}}
		>
			<Select.Trigger class="w-[10rem] inline-flex">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				{#each Object.keys(profiles) as profile}
					<Select.Item value={profile}>{profile}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div>
		<Button variant="outline" class="inline-flex" on:click={addProfile}
			>Add Profile</Button
		>
		<Button variant="outline" class="inline-flex" on:click={deleteProfile}
			>Delete Profile</Button
		>
		<Dialog.Root
			onOpenChange={() => {
				importData = "";
				profileName = "";
			}}
			bind:open={importDialogIsOpen}
		>
			<Dialog.Trigger class={`my-2 ${buttonVariants({ variant: "outline" })}`}>
				Import
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[30rem]">
				<Dialog.Header>
					<Dialog.Title>Import</Dialog.Title>
					<Dialog.Description>Add import data.</Dialog.Description>
				</Dialog.Header>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Input
							placeholder="Enter profile name"
							bind:value={profileName}
							class="col-span-2"
						/>
						<Textarea
							placeholder="Enter data"
							bind:value={importData}
							class="resize-none col-span-4 h-32"
						/>
					</div>
				</div>
				<Dialog.Footer>
					<Button on:click={handleImport}>Import data</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
		<Dialog.Root bind:open={confirmDialogIsOpen}>
			<Dialog.Trigger class={`my-2 ${buttonVariants({ variant: "outline" })}`}>
				Clear
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[30rem]">
				<Dialog.Header>
					<Dialog.Title>Are you sure?</Dialog.Title>
					<Dialog.Description
						>This action will clear all profile data and is irreversible.</Dialog.Description
					>
				</Dialog.Header>
				<Dialog.Footer>
					<Button
						variant="destructive"
						on:click={() => {
							handleClear();
							confirmDialogIsOpen = false;
						}}>Clear</Button
					>
					<Button
						on:click={() => {
							confirmDialogIsOpen = false;
						}}>Cancel</Button
					>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div>
		<p class="">
			Cumulative GPA: {cumulativeGpa} | GPA Credits: {gpaCredits} | Attempted Credits: {attemptedCredits}
		</p>
		<Button
			variant="outline"
			on:click={() => {
				semesters.push([{ name: "", grade: "A", credits: 3 }]);
				semesters = semesters;
				currentSemester = semesters.length - 1;
			}}>Add Semester</Button
		>
		<Button
			variant="outline"
			on:click={() => {
				semesters.splice(currentSemester, 1);
				if (currentSemester !== 0) currentSemester = currentSemester - 1;
				semesters = semesters;
			}}>Delete Semester</Button
		>

		{#if semesters}
			<div>
				<ul>
					{#each semesters as _, index}
						<li class="inline-block px-1">
							<Button
								class="w-10"
								variant={currentSemester === index ? "default" : "outline"}
								on:click={() => {
									currentSemester = index;
								}}>{index}</Button
							>
						</li>
					{/each}
				</ul>
				{#if semesters[currentSemester]}
					{#key currentSemester}
						<SemesterTable bind:courses={semesters[currentSemester]} />
					{/key}
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
</style>
