<script lang="ts">
	import { fly } from "svelte/transition";

	export let color: string;
	export let code: string;
</script>

<div
	transition:fly={{ duration: 500, y: -100 }}
	class="{color} text-center mx-auto rounded-md w-11/12 border-[2px] py-1 my-1"
>
	<p>{code}</p>
</div>
