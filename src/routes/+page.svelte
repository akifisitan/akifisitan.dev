<script lang="ts">
	import { Plus } from "lucide-svelte";
	const interests: string[] = [
		"software development",
		"web development",
		"computer science"
	];
</script>

<svelte:head>
	<title>akifisitan.dev</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full min-h-[100vh]">
	<div class="align-middle text-5xl pb-4">
		<h1>Hey, I'm Akif</h1>
	</div>
	<div>
		<p>I am interested in <span class="text-violet-800">{interests[0]}</span></p>
		<h2 class="text-center pb-2">Projects</h2>
		<a
			class="border-[2px] border-red-700 p-1 rounded-md hover:bg-gray-900"
			href="/su/gpa-calculator">GPA Calculator</a
		>
		<a
			class="border-[2px] border-red-700 p-1 rounded-md hover:bg-gray-900"
			href="/su/course-spotter">Course Spotter</a
		>
	</div>
	<div>
		<Plus class="w-10 h-10" />
	</div>
</div>
