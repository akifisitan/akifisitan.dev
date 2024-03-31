<script>
	import "../app.pcss";
	import { navigating } from "$app/stores";
	import Loading from "$lib/components/Loading.svelte";
	import Nav from "$lib/components/Nav.svelte";
</script>

{#if $navigating}
	<Loading />
{/if}

<Nav />

<main>
	<slot />
</main>

<style>
	@media (min-width: 640px) {
		main::before {
			position: absolute;
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
