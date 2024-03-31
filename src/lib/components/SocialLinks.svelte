<script lang="ts">
	import Github from "$lib/components/icons/Github.svelte";
	import Linkedin from "$lib/components/icons/Linkedin.svelte";
</script>

<div class="flex flex-wrap gap-3">
	<a
		href="https://github.com/akifisitan"
		target="_blank"
		rel="noopener noreferrer"
		class="not-prose flex items-center gap-1 border-b transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-300"
	>
		<Github class="size-5" /><span>Github</span>
	</a>
	<a
		href="https://linkedin.com/in/akifisitan"
		target="_blank"
		rel="noopener noreferrer"
		class="not-prose flex items-center gap-1 border-b transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-300"
	>
		<Linkedin class="size-5" /><span>LinkedIn</span>
	</a>
</div>
