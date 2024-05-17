<script lang="ts">
	export let data;
	$: console.log(data);
</script>

<section class="container prose dark:prose-invert">
	<h1>Blog</h1>
	<p>Coming soon!</p>
	{#each data.posts as post}
		<div>
			<a href="/blog/{post.slug}">{post.title}</a>
		</div>
	{/each}
</section>
