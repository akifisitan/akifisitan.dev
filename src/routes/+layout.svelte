<script>
	import "../app.pcss";
	import { navigating } from "$app/stores";
	import Loading from "$lib/components/Loading.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import { ModeWatcher } from "mode-watcher";
</script>

{#if $navigating}
	<Loading />
{/if}

<svelte:head>
	<meta name="author" content="Akif Isitan" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<Nav />

<div>
	<slot />
</div>

<div class="py-8"></div>

<style lang="postcss">
	@media (min-width: 640px) {
		div::before {
			position: fixed;
			z-index: -1;
			content: "";
			top: 0%;
			bottom: 0%;
			width: 100%;
			background: linear-gradient(90deg, #3245ff 100%, #2c0a3ce3 100%);
			-webkit-mask-image: radial-gradient(rgba(0, 0, 0, 0.2), transparent 70%);
			mask-image: radial-gradient(rgba(0, 0, 0, 0.2), transparent 70%);
		}
	}
</style>
