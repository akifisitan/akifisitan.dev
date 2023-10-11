<script lang="ts">
	import { Linkedin, Github, FileText } from "lucide-svelte";
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
		<p class="pb-2 text-center">
			I am interested in <span class="text-violet-800">{interests[0]}</span>
		</p>
		<div class="flex flex-wrap gap-4">
			<div class="min-w-fit">
				<a
					class="bg-rose-800 border-[2px] border-gray-900 p-1 rounded-md hover:bg-gray-900"
					href="/su/gpa-calculator">GPA Calculator</a
				>
			</div>
			<div class="min-w-fit">
				<a
					class="bg-emerald-800 border-[2px] border-gray-900 p-1 rounded-md hover:bg-gray-900"
					href="/su/course-spotter">Course Spotter</a
				>
			</div>
			<div class="min-w-fit">
				<a
					class="bg-sky-800 border-[2px] border-gray-900 p-1 rounded-md hover:bg-gray-900"
					href="/su/clash-checker">Clash Checker</a
				>
			</div>
		</div>
	</div>
	<div class="flex flex-row p-4">
		<a
			class="m-2 border-[3px] border-gray-600 rounded-sm"
			href="https://github.com/akifisitan"
			target="_blank"><Github class="bg-gray-600 hover:text-gray-900" /></a
		>
		<a
			class="m-2 border-[3px] border-blue-500 rounded-sm"
			href="https://linkedin.com/in/akifisitan"
			target="_blank"><Linkedin class="bg-blue-500 hover:text-blue-900" /></a
		>
		<!-- <a class="p-2" href="/files/cv" target="_blank"><FileText class="w-6 h-6" /></a> -->
	</div>
</div>
