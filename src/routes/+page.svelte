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
		<p>
			I'm a Software Engineer at <a
				href="https://softtech.com.tr/en/homepage/"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Softtech</a
			>, specializing in
			<a
				href="https://tcmb.gov.tr/wps/wcm/connect/EN/TCMB+EN/Main+Menu/Core+Functions/Payment+Systems/Payment+Systems+in+Turkey/"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Payment Systems</a
			>.
		</p>
		<p>
			I have a Bachelor's degree in Computer Science from <a
				href="https://sabanciuniv.edu/en"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Sabancı University</a
			>.
		</p>
		<p>
			Although my daily work focuses on the backend stack with C# and .NET, I also enjoy
			building frontends with
			<a
				href="https://svelte.dev/"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Svelte</a
			>, like the website you are looking at right now!
		</p>
		<p>
			I try to regularly keep up with new tech by following podcasts such as <a
				href="https://www.syntax.fm/"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Syntax</a
			>
			and
			<a
				href="https://topshelf.fm/"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Top Shelf</a
			>, and blogs such as
			<a
				href="https://registerspill.thorstenball.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="not-prose link"
			>
				Register Spill</a
			>.
		</p>
		<p>Here are some of my projects I'm proud of:</p>
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
			You can view all my projects on the <a href="/projects" class="not-prose link">
				projects page</a
			>.
		</p>
		<p>You can find me on:</p>
		<SocialLinks />
	</section>
</main>

<style lang="postcss">
	.link {
		@apply border-b border-zinc-300 text-zinc-900 transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-300;
	}
</style>
