<script lang="ts">
	import { createScheduleTable, courseMap, days } from "./data";
	import { Input } from "$lib/components/ui/input";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Dialog from "$lib/components/ui/dialog";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { Toaster, toast } from "svelte-french-toast";

	let scheduleTable = createScheduleTable();
	let loaded = false;
	let importDialogIsOpen = false;
	let confirmDialogIsOpen = false;
	let profileName = "";
	let importData = "";
	let profiles: Record<string, any> = {};

	$: if (loaded) {
		refreshActiveProfiles(Object.keys(profiles));
	}

	function assignCrnToSlots(crn: string) {
		const course = courseMap[crn];
		course.slots.forEach((slot) => {
			const split = slot.split(":");
			const hour = Number(split[1]);
			const day = Number(split[0]);
			scheduleTable[hour][day].push(course.code);
		});
	}

	function refreshActiveProfiles(profileList: string[]) {
		scheduleTable = createScheduleTable();
		for (let i = 0; i < profileList.length; i++) {
			const profileName = profileList[i];
			const profile = profiles[profileName];
			if (profile.active) {
				for (let j = 0; j < profile.crns.length; j++) {
					const crn = profile.crns[j];
					assignCrnToSlots(crn);
				}
			}
		}
		scheduleTable = scheduleTable;
		localStorage.setItem("clash-checker-profiles", JSON.stringify(profiles));
	}

	function handleImport() {
		if (profileName.length === 0 || profileName.length > 20) {
			toast.error("Profile name must be between 1 and 20 characters");
			return;
		}
		if (importData.length === 0) {
			toast.error("Import data cannot be empty");
			return;
		}
		const lines = importData.split("\n");
		const crns = [];
		for (let i = 0; i < lines.length; i++) {
			const crn = lines[i].includes(":")
				? lines[i].split(":")[1].trimStart()
				: lines[i].trim();
			const courseExists = courseMap[crn];
			if (courseExists) {
				crns.push(crn);
				assignCrnToSlots(crn);
			}
		}
		if (crns.length === 0) {
			toast.error("No valid CRNs found in import data");
			return;
		}
		profiles[profileName] = { crns, active: true };
		toast.success(`Successfully imported ${crns.length} CRNs`);
		importData = "";
		profileName = "";
		importDialogIsOpen = false;
	}

	onMount(() => {
		const storedProfiles = localStorage.getItem("clash-checker-profiles");
		if (storedProfiles) {
			profiles = JSON.parse(storedProfiles);
		}
		loaded = true;
	});
</script>

<svelte:head>
	<title>Clash Checker</title>
</svelte:head>

<Toaster />

<div class="flex flex-row overflow-scroll">
	<div class="flex flex-col p-8">
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
			<Dialog.Content class="max-w-[18rem] sm:max-w-[30rem]">
				<Dialog.Header>
					<Dialog.Title>Import</Dialog.Title>
					<Dialog.Description
						>Import course data from SUChedule or manually. Add one CRN per line</Dialog.Description
					>
				</Dialog.Header>
				<div class="grid gap-4 py-4">
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
			<Dialog.Trigger class={`my-2 ${buttonVariants({ variant: "destructive" })}`}>
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
							profiles = {};
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
		<div class="flex flex-col gap-4">
			{#each Object.keys(profiles) as profileName}
				<Button
					variant="outline"
					class={profiles[profileName].active
						? "bg-green-800 hover:bg-green-700"
						: "bg-red-800 hover:bg-red-700"}
					on:click={() => {
						profiles[profileName].active = !profiles[profileName].active;
					}}
				>
					{profileName}
				</Button>
			{/each}
		</div>
	</div>
	<div />
	<div class="p-8">
		<table>
			<thead>
				<th />
				{#each days as day}
					<th>{day}</th>
				{/each}
			</thead>
			<tbody>
				{#each scheduleTable as row, i}
					<tr>
						<td class="pr-4 text-right">{i < 2 ? `0${8 + i}.40` : `${8 + i}.40`}</td>
						{#each row as _, j}
							<td
								class="w-[2.5rem] h-[2.5rem] min-w-[10rem] min-h-[2.5rem] border-[2px]"
								class:bg-red-700={scheduleTable[i][j].length > 1}
								class:bg-emerald-700={scheduleTable[i][j].length == 0}
							>
								{#each scheduleTable[i][j] as courseCode}
									<p class="text-center">
										{courseCode}
									</p>
								{/each}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
