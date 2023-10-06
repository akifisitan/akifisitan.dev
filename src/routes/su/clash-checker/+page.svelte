<script lang="ts">
	import { createScheduleTable } from "./data";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Dialog from "$lib/components/ui/dialog";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";

	export let data: PageData;
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

	function handleRandomize() {
		const numRows = scheduleTable.length;
		const numCols = scheduleTable[0].length;
		const randomRow = Math.floor(Math.random() * numRows);
		const randomCol = Math.floor(Math.random() * numCols);
		scheduleTable[randomRow][randomCol].push("CS201 - A");
		scheduleTable = scheduleTable;
	}

	function assignCrnToSlots(crn: string) {
		const course = data.courseMap[crn];
		course.slots.forEach((slot) => {
			const split = slot.split(":");
			const hour = Number(split[1]);
			const day = Number(split[0]);
			scheduleTable[hour][day].push(course.code);
		});
	}

	function handleImport() {
		if (importData.length === 0 || profileName.length === 0) return;
		const lines = importData.split("\n");
		const crns = [];
		for (let i = 0; i < lines.length; i++) {
			const crn = lines[i].split(":")[1].trimStart();
			crns.push(crn);
			assignCrnToSlots(crn);
		}
		profiles[profileName] = { crns, active: true };
		importData = "";
		profileName = "";
		importDialogIsOpen = false;
	}

	onMount(() => {
		const storedProfiles = localStorage.getItem("clash-checker-profiles");
		console.log(storedProfiles);
		if (storedProfiles) {
			profiles = JSON.parse(storedProfiles);
		}
		loaded = true;
	});
</script>

<svelte:head>
	<title>Clash Checker</title>
</svelte:head>

<div class="flex flex-row">
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
						variant={"destructive"}
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
					class={profiles[profileName].active ? "bg-green-700" : "bg-red-700"}
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
				{#each data.days as day}
					<th>{day}</th>
				{/each}
			</thead>
			<tbody>
				{#each scheduleTable as row, i}
					<tr>
						<td class="pr-4 text-right">{i < 2 ? `0${8 + i}.40` : `${8 + i}.40`}</td>
						{#each row as _, j}
							<td
								class="cell"
								class:red={scheduleTable[i][j].length > 1}
								class:green={scheduleTable[i][j].length == 0}
							>
								{#each scheduleTable[i][j] as courseCode}
									<p class="text-center">{courseCode}</p>
								{/each}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.cell {
		@apply border-[2px] border-spacing-4;
		width: 2.5rem;
		min-width: 10rem;
		height: 2.5rem;
		min-height: 2.5rem;
	}
	.red {
		@apply bg-red-700;
	}
	.green {
		@apply bg-emerald-700;
	}
</style>
