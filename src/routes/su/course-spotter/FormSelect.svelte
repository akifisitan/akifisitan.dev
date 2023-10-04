<script lang="ts">
	import * as Select from "$lib/components/ui/select";
	import { Label } from "$lib/components/ui/label";
	type Props = {
		label: string;
		placeholder: string;
		elementId: string;
		content: string[];
	};
	export let props: Props;
	export let value: string;
</script>

<Label for={props.elementId}>{props.label}</Label>
<Select.Root
	onSelectedChange={(e) => {
		value = String(e?.value);
	}}
>
	<Select.Trigger id={props.elementId}>
		<Select.Value placeholder={props.placeholder} />
	</Select.Trigger>
	<Select.Content>
		{#each props.content as content}
			<Select.Item value={content.toLowerCase()} label={content}>{content}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
