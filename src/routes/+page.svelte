<script lang="ts">
	import Project from "$lib/components/Project.svelte";
	import SocialLinks from "$lib/components/SocialLinks.svelte";
	import { homeProjects } from "$lib/data/projects";
</script>

<main class="container">
	<section class="container prose prose-zinc dark:prose-invert">
		<h1>Akif Işıtan</h1>
		<p>Hey, I'm Akif Işıtan, an aspiring software engineer.</p>
		<p>
			I'm currently on the final semester of my Computer Science Bachelor's degree at <a
				href="https://www.sabanciuniv.edu/en"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose border-b transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-300"
			>
				Sabancı University</a
			>.
		</p>
		<p>Here are some of my projects:</p>
	</section>
	<div
		class="mx-auto my-5 grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:grid-cols-3"
	>
		{#each homeProjects as project}
			<Project {project} />
		{/each}
	</div>
	<section class="container prose prose-zinc dark:prose-invert">
		<p>
			You can find the full projects list on my <a
				href="/projects"
				class="not-prose border-b transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-300"
			>
				projects page</a
			>.
		</p>
		<p>You can find me on</p>
		<SocialLinks />
	</section>
</main>
