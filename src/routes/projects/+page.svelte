<script lang="ts">
	import Project from "$lib/components/Project.svelte";
	import { projectSections } from "$lib/data/projects";
</script>

<main
	class="container prose prose-zinc min-h-[calc(100dvh-5.5rem)] dark:prose-invert md:max-w-screen-lg"
>
	<h1 class="text-center">Projects</h1>
	<section class="pb-8">
		{#each projectSections as section}
			<section>
				<h2 class="text-center text-base font-bold opacity-75">{section.title}</h2>
				<div
					class="not-prose mx-auto my-5 grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:grid-cols-3"
				>
					{#each section.projects as project}
						<Project {project} />
					{/each}
				</div>
			</section>
		{/each}
	</section>
</main>
