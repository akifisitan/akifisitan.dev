<script lang="ts">
	type Project = {
		name: string;
		description: string;
		link?: string;
		icon: string;
	};
	export let project: Project;
</script>

{#if project.link}
	<a
		href={project.link}
		target="_blank"
		rel="noopener noreferrer"
		class="flex rounded-lg px-3.5 py-2 opacity-50 transition-all duration-200 ease-out hover:bg-[#9fd02311] hover:opacity-100"
	>
		<img
			class="mr-5 size-9 flex-shrink-0 self-center"
			src="icons/{project.icon}.svg"
			alt="{project.name} icon"
		/>
		<div>
			<h5>{project.name}</h5>
			<p class="text-sm opacity-50">{project.description}</p>
		</div>
	</a>
{:else}
	<div
		class="flex select-none rounded-lg px-3.5 py-2 opacity-50 transition-all duration-200 ease-out hover:bg-[#9fd02311] hover:opacity-100"
	>
		<img
			class="mr-5 size-9 flex-shrink-0 self-center"
			src="icons/{project.icon}.svg"
			alt="{project.name} icon"
		/>
		<div>
			<h5>{project.name}</h5>
			<p class="text-sm opacity-50">{project.description}</p>
		</div>
	</div>
{/if}
