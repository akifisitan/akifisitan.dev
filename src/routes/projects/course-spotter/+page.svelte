<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import { Link, Frown } from "lucide-svelte";
	import { Input } from "$lib/components/ui/input";
	import { Slider } from "$lib/components/ui/slider";
	import {
		currentTerm,
		majorPrograms,
		admitTerms,
		courseTypes,
		type CourseData
	} from "./data";
	import * as api from "$lib/api";
	import { Toaster, toast } from "svelte-french-toast";

	let loading = false;
	let btnLoading = false;
	let major = "";
	let query = "";
	let queryCapacity: number = 0;
	let admitTerm = "";
	let courseType = "";
	let courses: CourseData[] = [];
	let responseData: CourseData[] | null = null;

	$: filterQuery(query);
	$: filterCapacity(queryCapacity);

	function filterCapacity(queryCapacity: number) {
		if (!responseData) return;
		courses = responseData.filter((course) => {
			if (query) {
				return (
					course.remaining_capacity >= queryCapacity ||
					(course.remaining_capacity < 0 &&
						course.code.toLowerCase().includes(query.toLowerCase()))
				);
			}
			return course.remaining_capacity >= queryCapacity;
		});
	}

	function filterQuery(searchQuery: string) {
		if (!responseData) return;
		if (searchQuery.length === 0) {
			courses = responseData;
			return;
		}
		if (searchQuery.length === 1) return;
		courses = responseData.filter((course) => {
			return (
				course.remaining_capacity >= queryCapacity &&
				course.code.toLowerCase().includes(searchQuery.toLowerCase())
			);
		});
	}

	function validate() {
		const errors = [];
		if (!major) errors.push("Please select a major program");
		if (!admitTerm) errors.push("Please select an admit term");
		if (!courseType) errors.push("Please select a course type");
		return errors;
	}

	async function handleSubmit() {
		if (loading) return;
		loading = true;
		const timeout = setTimeout(() => {
			btnLoading = true;
		}, 50);
		query = "";
		const errors = validate();
		if (errors.length > 0) {
			toast.error(errors.join("\n"));
			loading = false;
			clearTimeout(timeout);
			return;
		}
		try {
			const response = await api.get(
				fetch,
				`courses/checkAvailability?program=${major}&admit_term=${admitTerm}&course_type=${courseType}`,
				null
			);
			if (response.status === 200) {
				responseData = courses = response.data;
			} else {
				toast.error("An error ocurred while fetching data. Please try again later.");
			}
		} catch (e) {
			console.log(e);
			toast.error("An error ocurred while fetching data. Please try again later.");
		} finally {
			if (btnLoading === false) {
				clearTimeout(timeout);
			} else {
				btnLoading = false;
			}
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Course Spotter</title>
</svelte:head>

<Toaster />

<h1
	class="p-2 text-center scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 sm:text-start sm:pl-4"
>
	Course Spotter
</h1>

<section class="flex flex-col items-center sm:flex-row sm:items-stretch">
	<div class="side-bar">
		<form on:submit|preventDefault={handleSubmit} class="max-w-xs">
			<!-- Major Program -->
			<Label for="select-major-program">What is your major program?</Label>
			<div class="py-2">
				<Select.Root
					onSelectedChange={(e) => {
						major = String(e?.value);
					}}
				>
					<Select.Trigger id="select-major-program">
						<Select.Value placeholder="Select major program" />
					</Select.Trigger>
					<Select.Content>
						{#each majorPrograms as [code, name]}
							<Select.Item value={code} label={name}>{name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<!-- Admit Term -->
			<Label for="select-admit-term">What is your admit term?</Label>
			<div class="py-2">
				<Select.Root
					onSelectedChange={(e) => {
						admitTerm = String(e?.value);
					}}
				>
					<Select.Trigger id="select-admit-term">
						<Select.Value placeholder="Select admit term" />
					</Select.Trigger>
					<Select.Content>
						{#each admitTerms as [code, name]}
							<Select.Item value={code} label={name}>{name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<!-- Course Type -->
			<Label for="select-course-type">What type of course would you like?</Label>
			<div class="py-2">
				<Select.Root
					onSelectedChange={(e) => {
						courseType = String(e?.value);
					}}
				>
					<Select.Trigger id="select-course-type">
						<Select.Value placeholder="Select course type" />
					</Select.Trigger>
					<Select.Content>
						{#each courseTypes as courseType}
							<Select.Item value={courseType.toLowerCase()} label={courseType}
								>{courseType}</Select.Item
							>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<!-- Button -->
			<Button
				type="submit"
				class="min-w-full"
				variant={btnLoading ? "destructive" : "default"}
			>
				{btnLoading ? "Searching..." : "Search"}
			</Button>
		</form>
		<!-- Result -->
	</div>
	<div class="w-full">
		{#if responseData}
			<div class="pt-4 px-4">
				<Input
					class="mb-2 text-center sm:text-start"
					type="search"
					bind:value={query}
					placeholder="Search for a course"
				/>
				<Label class="p-2">Course Capacity</Label>
				<div class="flex px-4 py-2 gap-4">
					<Slider
						class="flex-grow flex-shrink basis-0"
						onValueChange={(e) => {
							queryCapacity = e?.at(0) ?? 0;
						}}
						value={[0]}
						max={300}
						step={1}
					/>
					<p class="flex-grow-0 flex-shrink-0 basis-8 text-end">{queryCapacity}</p>
				</div>
			</div>
			{#if courses.length > 0}
				<div class="course-display">
					{#each courses as data}
						<Card.Root class="max-h-32 text-center">
							<Card.Header>
								<Card.Title
									><p>
										{data.code} - {data.section}
										<a
											class="inline-block"
											href="https://suis.sabanciuniv.edu/prod/bwckschd.p_disp_detail_sched?term_in={currentTerm}&crn_in={data.crn}"
											target="_blank"><Link class="w-4 h-4" /></a
										>
									</p></Card.Title
								>
								<Card.Description>
									<p>Remaining: {data.remaining_capacity} / {data.total_capacity}</p>
								</Card.Description>
							</Card.Header>
						</Card.Root>
					{/each}
				</div>
			{:else}
				<div class="flex pt-4 flex-col min-w-fit w-full text-center">
					<p class="pb-1 m-auto">No courses found</p>
					<Frown class="m-auto h-12 w-12" />
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.course-display {
		display: grid;
		padding: 1rem;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	}
	.side-bar {
		display: flex;
		padding: 1rem;
		width: 14rem;
		height: 100%;
		align-items: center;
		justify-content: center;
		min-width: max-content;
	}
</style>
