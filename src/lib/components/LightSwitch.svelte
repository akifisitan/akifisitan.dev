<script lang="ts">
	import Sun from "lucide-svelte/icons/sun";
	import Moon from "lucide-svelte/icons/moon";
	import { toggleMode } from "mode-watcher";
</script>

<button
	on:click={toggleMode}
	class="inline-flex size-5 items-center justify-center whitespace-nowrap p-0 hover:text-accent-foreground"
>
	<Sun
		class="size-5 rotate-0 scale-100 transition duration-200 dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute size-5 rotate-90 scale-0 transition duration-200 dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</button>
