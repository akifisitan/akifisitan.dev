<script>
	import { page } from "$app/stores";
</script>

<div class="outer">
	<div class="inner">
		<h1>Oops</h1>
		{#if $page.status === 404}
			<p>Seems that does not exist</p>
		{:else}
			<p>Something went wrong</p>
		{/if}
	</div>
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: calc(100dvh - 16rem);
	}
	.inner {
		display: flex;
		flex-direction: column;
		width: 18rem;
		text-align: center;
		vertical-align: middle;
	}
	h1 {
		font-size: 3rem;
		line-height: 1;
		padding-bottom: 1rem;
	}
</style>
