<svelte:head>
	<title>404</title>
</svelte:head>

<div class="outer">
	<div class="inner">
		<h1>Oops</h1>
		<p>Seems that does not exist</p>
	</div>
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: calc(100vh - 4rem);
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
