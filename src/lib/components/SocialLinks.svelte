<script lang="ts">
	import Github from "$lib/components/icons/Github.svelte";
	import Linkedin from "$lib/components/icons/Linkedin.svelte";

	const links = [
		{
			href: "https://github.com/akifisitan",
			icon: Github,
			name: "Github",
		},
		{
			href: "https://linkedin.com/in/akifisitan",
			icon: Linkedin,
			name: "LinkedIn",
		},
	];
</script>

<div class="flex flex-wrap gap-3">
	{#each links as link}
		<a
			href={link.href}
			target="_blank"
			rel="noopener noreferrer"
			class="not-prose flex items-center gap-1 border-b border-zinc-300 text-zinc-900 transition-all duration-200 hover:border-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-300"
		>
			<svelte:component this={link.icon} class="size-5" /><span>{link.name}</span>
		</a>
	{/each}
</div>
