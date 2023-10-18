<script lang="ts">
	import { onMount } from "svelte";
	import SemesterTable from "./SemesterTable.svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Select from "$lib/components/ui/select";
	import { Label } from "$lib/components/ui/label";
	import { fade } from "svelte/transition";
	import toast, { Toaster } from "svelte-french-toast";
	import {
		calculateCumulativeGpa,
		type Course,
		parseImportedData,
		formatGpa
	} from "./gpa-calc-utils";

	let profiles: Record<string, any> = {
		default: { semesters: [[{ name: "", grade: "A", credits: 3 }]] }
	};
	let loaded = false;
	let currentSemester = 0;
	let currentProfile = "default";
	let semesters: Course[][] = [[{ name: "", grade: "A", credits: 3 }]];
	let display = {
		cumulativeGpa: "0.00",
		qualityPoints: 0,
		gpaCredits: 0,
		earnedCredits: 0,
		attemptedCredits: 0
	};
	let importDialogIsOpen = false;
	let addProfileDialogIsOpen = false;
	let confirmDialogIsOpen = false;
	let confirmProfileDialogIsOpen = false;
	let profileName = "";
	let importData = "";

	function switchProfile(profileName: string | undefined | any) {
		if (!profileName) profileName = "default";
		currentProfile = profileName;
		semesters = profiles[profileName].semesters;
		currentSemester = 0;
	}

	function checkProfile() {
		if (profileName === "default") {
			toast.error("You cannot use the name 'default'!");
			return false;
		}
		if (profileName.length === 0 || profileName.length > 12) {
			toast.error("Profile name must be between 1 and 12 characters");
			return false;
		}
		if (profiles[profileName]) {
			toast.error("This profile name already exists");
			return false;
		}
		return true;
	}

	function addProfile() {
		const check = checkProfile();
		if (!check) return;
		profiles[profileName] = { semesters: [[{ name: "", grade: "A", credits: 3 }]] };
		switchProfile(profileName);
		addProfileDialogIsOpen = false;
	}

	function deleteProfile() {
		const toBeDeleted = currentProfile;
		if (toBeDeleted === "default") {
			toast.error("You cannot delete the default profile!");
		} else {
			currentProfile = "default";
			delete profiles[toBeDeleted];
			toast.success(`Successfully deleted ${toBeDeleted}`);
		}
		confirmProfileDialogIsOpen = false;
	}

	function handleImport() {
		const check = checkProfile();
		if (!check) return;
		semesters = parseImportedData(importData);
		profiles[profileName] = { semesters };
		switchProfile(profileName);
		importDialogIsOpen = false;
	}

	function handleClear() {
		currentProfile = "default";
		profiles = {
			default: { semesters: [[{ name: "", grade: "A", credits: 3 }]] }
		};
		currentSemester = 0;
		confirmDialogIsOpen = false;
	}

	function addSemester() {
		if (semesters.length === 10) {
			toast.error("You cannot have more than 10 semesters!");
			return;
		}
		semesters.push([{ name: "", grade: "A", credits: 3 }]);
		semesters = semesters;
		currentSemester = semesters.length - 1;
	}

	function deleteSemester() {
		if (semesters.length === 1) {
			toast.error("You cannot delete the only semester!");
			return;
		}
		semesters.splice(currentSemester, 1);
		if (currentSemester !== 0) currentSemester = currentSemester - 1;
		semesters = semesters;
	}

	$: {
		const result = calculateCumulativeGpa(semesters);
		display = {
			cumulativeGpa: formatGpa(result.cumulativeGpa),
			qualityPoints: result.totalQualityPoints,
			gpaCredits: result.totalGpaCredits,
			earnedCredits: result.totalEarnedCredits,
			attemptedCredits: result.totalAttemptedCredits
		};
	}

	$: selectedProfile = { value: currentProfile, label: currentProfile };
	// $: console.log(`Current profile: ${currentProfile}`);

	$: semesters = profiles[currentProfile].semesters;

	$: if (loaded) {
		localStorage.setItem("gpa-calculator-profiles", JSON.stringify(profiles));
	}

	onMount(() => {
		const storedProfiles = localStorage.getItem("gpa-calculator-profiles");
		if (storedProfiles) {
			profiles = JSON.parse(storedProfiles);
			const profileNumber = Object.keys(profiles).length;
			if (Object.keys(profiles).length > 0) {
				toast.success(
					`Successfully loaded ${profileNumber} ${
						profileNumber === 1 ? "profile" : "profiles"
					}`
				);
			}
		} else {
			toast.success("Welcome to gpa calculator!");
		}
		loaded = true;
	});
</script>

<svelte:head>
	<title>GPA Calculator</title>
</svelte:head>

<Toaster />

<div class="flex flex-col justify-center items-center">
	<div class="p-4 flex flex-col">
		<div class="flex flex-col justify-center items-center">
			<Label class="pb-2">Current Profile</Label>
			<Select.Root
				bind:selected={selectedProfile}
				onSelectedChange={(e) => {
					console.log(`Changed to ${e?.value}`);
					switchProfile(e?.value);
				}}
			>
				<Select.Trigger class="w-[10rem]">
					<Select.Value />
				</Select.Trigger>
				<Select.Content>
					{#each Object.keys(profiles) as profile}
						<Select.Item value={profile}>{profile}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div
			class="grid grid-cols-2 gap-1 py-2 sm:flex sm:flex-wrap sm:justify-center sm:items-center"
		>
			<Dialog.Root
				onOpenChange={() => {
					profileName = "";
				}}
				bind:open={addProfileDialogIsOpen}
			>
				<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
					Add Profile
				</Dialog.Trigger>
				<Dialog.Content class="rounded-lg max-w-[16rem] sm:max-w-xs">
					<Dialog.Header>
						<Dialog.Title>Add Profile</Dialog.Title>
						<Dialog.Description>Add a new profile</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Input
								placeholder="Enter profile name"
								bind:value={profileName}
								class="col-span-4"
							/>
						</div>
					</div>
					<Dialog.Footer>
						<Button on:click={addProfile}>Add</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
			<Dialog.Root bind:open={confirmProfileDialogIsOpen}>
				<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
					Delete Profile
				</Dialog.Trigger>
				<Dialog.Content class="rounded-lg max-w-[16rem] sm:max-w-xs">
					<Dialog.Header>
						<Dialog.Title>Are you sure?</Dialog.Title>
						<Dialog.Description>This action will delete this profile</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Button variant="destructive" on:click={deleteProfile}>Delete</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
			<Dialog.Root
				onOpenChange={() => {
					importData = "";
					profileName = "";
				}}
				bind:open={importDialogIsOpen}
			>
				<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
					Import
				</Dialog.Trigger>
				<Dialog.Content class="rounded-lg max-w-[16rem] sm:max-w-[30rem]">
					<Dialog.Header>
						<Dialog.Title>Import</Dialog.Title>
						<Dialog.Description>Add import data</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Input
								placeholder="Enter profile name"
								bind:value={profileName}
								class="col-span-4 sm:col-span-2"
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
				<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
					Clear
				</Dialog.Trigger>
				<Dialog.Content class="rounded-lg max-w-[16rem] sm:max-w-xs">
					<Dialog.Header>
						<Dialog.Title>Are you sure?</Dialog.Title>
						<Dialog.Description
							>This action will clear all profile data and is irreversible</Dialog.Description
						>
					</Dialog.Header>
					<Dialog.Footer>
						<Button variant="destructive" on:click={handleClear}>Clear</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		<div class="text-center">
			<div>
				<p>
					Cumulative GPA: {display.cumulativeGpa}
				</p>
				<p>
					GPA Credits: {display.gpaCredits}
				</p>
				<p>
					Earned Credits: {display.earnedCredits}
				</p>
				<p>
					Attempted Credits: {display.attemptedCredits}
				</p>
				<p>
					Total Quality Points: {display.qualityPoints}
				</p>
			</div>
		</div>
		<div class="flex gap-2 justify-center items-center py-2">
			<Button variant="outline" class="flex-1 max-w-[8rem]" on:click={addSemester}
				>Add Semester</Button
			>
			<Button variant="outline" class="flex-1 max-w-[8rem]" on:click={deleteSemester}
				>Delete Semester</Button
			>
		</div>
		{#if semesters}
			<div class="flex flex-col justify-center items-center">
				<ul class="flex flex-wrap max-w-[16rem]">
					{#each semesters as _, index}
						<li transition:fade={{ delay: 100 }} class="inline-block px-1 pb-1">
							<Button
								class="w-10"
								variant={currentSemester === index ? "default" : "outline"}
								on:click={() => {
									currentSemester = index;
								}}>{index + 1}</Button
							>
						</li>
					{/each}
				</ul>
				<div class="min-h-screen overflow-y-hidden">
					{#if semesters[currentSemester]}
						<SemesterTable bind:courses={semesters[currentSemester]} />
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
