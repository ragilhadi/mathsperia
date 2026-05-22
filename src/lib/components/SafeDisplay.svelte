<script lang="ts">
	import { formatNumber } from '$lib/utils/format';

	interface Props {
		value: number;
		unit?: string;
		fallback?: string;
		class?: string;
	}

	let { value, unit = '', fallback = '—', class: className = '' }: Props = $props();

	let display = $derived(
		Number.isFinite(value) && !Number.isNaN(value)
			? `${formatNumber(value)}${unit ? ' ' + unit : ''}`
			: fallback
	);
</script>

<span class={className}>
	{display}
</span>
