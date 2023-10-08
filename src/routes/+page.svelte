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
		<p class="pb-2">
			I am interested in <span class="text-violet-800">{interests[0]}</span>
		</p>
		<a
			class="border-[2px] border-gray-700 p-1 rounded-md hover:bg-gray-900"
			href="/su/gpa-calculator">GPA Calculator</a
		>
		<a
			class="border-[2px] border-gray-700 p-1 rounded-md hover:bg-gray-900"
			href="/su/course-spotter">Course Spotter</a
		>
		<a
			class="border-[2px] border-gray-700 p-1 rounded-md hover:bg-gray-900"
			href="/su/clash-checker">Clash Checker</a
		>
	</div>
	<div class="flex flex-row p-4">
		<a class="p-2" href="https://github.com/akifisitan" target="_blank"
			><Github class="w-6 h-6" /></a
		>
		<a class="p-2" href="https://linkedin.com/in/akifisitan" target="_blank"
			><Linkedin class="w-6 h-6" /></a
		>
		<a class="p-2" href="/files/cv"><FileText class="w-6 h-6" /></a>
	</div>
</div>
