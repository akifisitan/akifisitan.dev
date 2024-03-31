<script lang="ts">
	import Project from "$lib/components/Project.svelte";
	import { sections } from "$lib/data/projects";
</script>

<main class="container prose prose-zinc dark:prose-invert md:max-w-screen-lg">
	<h1 class="text-center">Projects</h1>
	{#each sections as section}
		<div>
			<h4 class="text-center font-bold opacity-75">{section.title}</h4>
			<div
				class="not-prose mx-auto my-5 grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:grid-cols-3"
			>
				{#each section.projects as project}
					<Project {project} />
				{/each}
			</div>
		</div>
	{/each}
</main>
