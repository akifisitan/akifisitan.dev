<script lang="ts">
	import Project from "$lib/components/Project.svelte";
	import SocialLinks from "$lib/components/SocialLinks.svelte";
	import { homeProjects } from "$lib/data/projects";
</script>

<svelte:head>
	<title>Akif Isitan</title>
	<meta property="og:title" content="Akif Isitan" />
	<meta name="description" content="Akif Isitan's Personal Website" />
	<meta property="og:description" content="Akif Isitan's Personal Website" />
</svelte:head>

<main class="container">
	<section class="container prose prose-zinc dark:prose-invert">
		<h1>Akif Işıtan</h1>
		<p>Hey, I'm Akif Işıtan, an aspiring software engineer.</p>
		<p>
			I'm currently on the final semester of my Computer Science Bachelor's degree at <a
				href="https://www.sabanciuniv.edu/en"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Sabancı University</a
			>.
		</p>
		<p>Here are some of my projects:</p>
	</section>
	<section
		class="mx-auto my-5 grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:grid-cols-3"
	>
		{#each homeProjects as project}
			<Project {project} />
		{/each}
	</section>
	<section class="container prose prose-zinc dark:prose-invert">
		<p>
			You can find the full projects list on my <a href="/projects" class="not-prose link">
				projects page</a
			>.
		</p>
		<p>You can find me on</p>
		<SocialLinks />
	</section>
</main>

<style lang="postcss">
	.link {
		@apply border-b border-zinc-300 text-zinc-900 transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-300;
	}
</style>
