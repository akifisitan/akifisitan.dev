<script lang="ts">
	export let color: string;
	export let code: string;
</script>

<div
	class="{color} text-center mx-auto rounded-md self-center w-3/4 border-[2px] py-1 my-1"
>
	<p>{code}</p>
</div>
