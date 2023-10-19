<svelte:head>
	<title>404</title>
</svelte:head>

<div class="outer">
	<div class="inner">
		<h1>Oops</h1>
		<p class="pb-2">Seems that does <span class="text-rose-600">not</span> exist</p>
		<a
			class="mx-auto text-center bg-emerald-800 border-[2px] w-16 border-gray-900 p-1 rounded-md hover:bg-gray-900"
			href="/">Home</a
		>
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
