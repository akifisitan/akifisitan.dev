<script lang="ts">
	import { dev } from "$app/environment";

	export let data;

	$: if (dev) console.log(data);
</script>

<svelte:head>
	<title>Blog - Akif Isitan</title>
	<meta property="og:title" content="Blog - Akif Isitan" />
	<meta name="description" content="Akif Isitan's Blog" />
	<meta property="og:description" content="Akif Isitan's Blog" />
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
