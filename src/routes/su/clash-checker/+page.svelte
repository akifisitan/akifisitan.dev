<script lang="ts">
	import {
		createScheduleTable,
		courseMap,
		days,
		type Profile,
		colors,
		getUniqueColor
	} from "./data";
	import { Input } from "$lib/components/ui/input";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Dialog from "$lib/components/ui/dialog";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { Toaster, toast } from "svelte-french-toast";
	import CourseCard from "./CourseCard.svelte";
	import { Separator } from "$lib/components/ui/separator";

	let scheduleTable = createScheduleTable();
	let loaded = false;
	let importDialogIsOpen = false;
	let confirmDialogIsOpen = false;
	let profileName = "";
	let importData = "";
	let profiles: Record<string, Profile> = {};

	$: if (loaded) {
		refreshProfiles(Object.keys(profiles));
	}

	function assignCrnToSlots(crn: string, color: string) {
		const course = courseMap[crn];
		course.slots.forEach((slot) => {
			const split = slot.split(":");
			const hour = Number(split[1]);
			const day = Number(split[0]);
			scheduleTable[hour][day].push({
				code: course.code,
				color
			});
		});
	}

	function refreshProfiles(profileList: string[]) {
		scheduleTable = createScheduleTable();
		for (let i = 0; i < profileList.length; i++) {
			const profileName = profileList[i];
			const profile = profiles[profileName];
			if (profile.active) {
				for (let j = 0; j < profile.crns.length; j++) {
					const crn = profile.crns[j];
					assignCrnToSlots(crn, profile.color);
				}
			}
		}
		scheduleTable = scheduleTable;
		localStorage.setItem("clash-checker-profiles", JSON.stringify(profiles));
	}

	function handleImport() {
		if (Object.keys(profiles).length >= 7) {
			toast.error("You cannot have more than 7 profiles");
			return;
		}
		if (profileName.length === 0 || profileName.length > 12) {
			toast.error("Profile name must be between 1 and 12 characters");
			return;
		}
		if (profiles[profileName]) {
			toast.error("This profile name already exists");
			return;
		}
		if (importData.length === 0) {
			toast.error("Imported CRN data cannot be empty");
			return;
		}
		const color = getUniqueColor(profiles);
		const lines = importData.split("\n");
		const crns = [];
		for (let i = 0; i < lines.length; i++) {
			const crn = lines[i].includes(":")
				? lines[i].split(":")[1].trimStart()
				: lines[i].trim();
			const courseExists = courseMap[crn];
			if (courseExists) {
				crns.push(crn);
				assignCrnToSlots(crn, colors[color].card);
			}
		}
		if (crns.length === 0) {
			toast.error("No valid CRNs found in import data");
			return;
		}
		profiles[profileName] = { crns: crns, active: true, color: color };
		toast.success(
			`Successfully imported ${crns.length} ${crns.length === 1 ? "CRN" : "CRNs"}`
		);
		importData = "";
		profileName = "";
		importDialogIsOpen = false;
	}

	function handleClear() {
		if (Object.keys(profiles).length === 0) {
			toast.error("There are no profiles to clear");
		} else {
			profiles = {};
			toast.success("Successfully cleared all profiles");
		}
		confirmDialogIsOpen = false;
	}

	onMount(() => {
		const storedProfiles = localStorage.getItem("clash-checker-profiles");
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
			toast.success("Welcome to clash checker!");
		}
		loaded = true;
	});
</script>

<svelte:head>
	<title>Clash Checker</title>
</svelte:head>

<Toaster />

<h2
	class="p-2 text-center scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 sm:text-start sm:pl-4"
>
	Clash Checker
</h2>

<div class="flex flex-row overflow-auto min-h-[80vh - 3.5rem] sm:min-h-fit">
	<div class="flex flex-col py-4 px-8">
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
					<Dialog.Title>Import CRNs</Dialog.Title>
					<Dialog.Description
						>Copy and paste CRNs from SUChedule or add one CRN per line.</Dialog.Description
					>
				</Dialog.Header>
				<div class="grid gap-4 pb-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Input
							placeholder="Enter profile name"
							bind:value={profileName}
							class="col-span-4 sm:col-span-2"
						/>
						<Textarea
							placeholder="Enter CRN data"
							bind:value={importData}
							class="resize-none col-span-4 h-16 sm:h-32"
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
			<Dialog.Content class="max-w-[18rem] sm:max-w-[30rem]">
				<Dialog.Header>
					<Dialog.Title>Are you sure?</Dialog.Title>
					<Dialog.Description
						>This action will clear all profiles and is irreversible.</Dialog.Description
					>
				</Dialog.Header>
				<Dialog.Footer>
					<Button variant="destructive" on:click={handleClear}>Clear</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
		<Separator class="my-4" />
		<div class="flex flex-col gap-2">
			{#if Object.keys(profiles).length > 0}
				{#each Object.keys(profiles) as profileName}
					<Button
						variant="outline"
						class={profiles[profileName].active
							? colors[profiles[profileName].color].button
							: null}
						on:click={() => {
							profiles[profileName].active = !profiles[profileName].active;
						}}
					>
						{profileName}
					</Button>
				{/each}
			{:else}
				<Button disabled variant="outline">None</Button>
			{/if}
		</div>
	</div>
	<div />
	<div class="p-4">
		<table>
			<thead>
				<th class="min-w-[4rem]" />
				{#each days as day}
					<th class="select-none">{day}</th>
				{/each}
			</thead>
			<tbody>
				{#each scheduleTable as row, i}
					<tr>
						<td class="text-center border-l-[2px] border-l-blue-500 select-none"
							>{i < 2 ? `0${8 + i}.40` : `${8 + i}.40`}</td
						>
						{#each row as _, j}
							<td
								class="h-12 min-w-[10rem] border-[2px] sm:h-10 sm:min-w-[12rem]"
								class:bg-rose-800={scheduleTable[i][j].length > 0}
								class:bg-emerald-800={scheduleTable[i][j].length === 0}
							>
								{#each scheduleTable[i][j] as { code, color }}
									<CourseCard color={colors[color].card} {code} />
								{/each}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
