<script lang="ts">
	import Linkedin from "lucide-svelte/icons/linkedin";
	import Github from "lucide-svelte/icons/github";
	import Signature from "./Signature.svelte";
</script>

<header>
	<a href="/" class="absolute m-5">
		<Signature class="size-12" /><span class="sr-only">Akif Isitan</span>
	</a>
	<nav class="flex w-full items-center justify-between p-8 text-zinc-400">
		<div class="spacer"></div>
		<div class="flex items-center justify-center gap-4">
			<a
				href="/blog"
				class="transition duration-200 hover:text-zinc-700 dark:hover:text-zinc-200">Blog</a
			>
			<a
				href="/projects"
				class="transition duration-200 hover:text-zinc-700 dark:hover:text-zinc-200"
				>Projects</a
			>
			<a
				href="https://github.com/akifisitan"
				target="_blank"
				rel="noopener noreferrer"
				class="transition duration-200 hover:text-zinc-700 dark:hover:text-zinc-200"
			>
				<Github class="size-5" /><span class="sr-only">Github</span>
			</a>
			<a
				href="https://linkedin.com/in/akifisitan"
				target="_blank"
				rel="noopener noreferrer"
				class="transition duration-200 hover:text-zinc-700 dark:hover:text-zinc-200"
			>
				<Linkedin class="size-5" />
				<span class="sr-only">Linkedin</span>
			</a>
		</div>
	</nav>
</header>
