<script lang="ts">
	export let data;
	$: console.log(data);
</script>

<svelte:head>
	<title>Blog - Akif Isitan</title>
</svelte:head>

<section class="container prose dark:prose-invert">
	<h1>Blog</h1>
	<p>Coming soon!</p>
	{#each data.posts as post}
		<div>
			<a href="/blog/{post.slug}">{post.title}</a>
		</div>
	{/each}
</section>
