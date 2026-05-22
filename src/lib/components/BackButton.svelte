<script lang="ts">
	import { tKey } from '$lib/stores/lang.svelte';

	let { href = '/2d' }: { href?: string } = $props();
</script>

<a
	{href}
	class="group mb-4 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
>
	<svg
		class="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-0.5"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M19 12H5" />
		<path d="M12 19l-7-7 7-7" />
	</svg>
	<span>{tKey('common.back')}</span>
</a>
