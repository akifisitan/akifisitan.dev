<script lang="ts">
	export let data;

	$: console.log(data);
</script>

<section class="container prose dark:prose-invert">
	<h1>{data.metadata.title}</h1>
	<p>{new Date(data.metadata.date).toDateString()}</p>
	<svelte:component this={data.content} />
</section>
