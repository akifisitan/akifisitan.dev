<script lang="ts">
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	export let data;

	$: console.log(data);
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
</svelte:head>

<main>
	<div class="mx-auto max-w-7xl px-4 pb-8 pt-2 lg:px-8">
		<a
			href="/blog"
			class="group flex items-center text-sm font-semibold leading-6 text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white"
			><ChevronLeft
				class="size-5 overflow-visible text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
			/>Go back</a
		>
	</div>
	<article class="container prose prose-zinc max-w-3xl dark:prose-invert">
		<p class="inset-x-0 text-sm">
			{new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
				new Date(data.metadata.date)
			)}
		</p>
		<h1 class="text-2xl font-extrabold tracking-tight md:text-3xl">
			{data.metadata.title}
		</h1>
		<svelte:component this={data.content} />
	</article>
</main>

<style lang="postcss">
	:global(article a) {
		@apply border-b border-zinc-300 text-zinc-900 transition-all duration-200 hover:border-zinc-700;
	}
	:global(.dark article a) {
		@apply border-b border-zinc-700 text-zinc-300 transition-all duration-200 hover:border-zinc-300;
	}
</style>
