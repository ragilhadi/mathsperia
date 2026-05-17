<script lang="ts">
	let { href = '/2d' }: { href?: string } = $props();
</script>

<a
	{href}
	class="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm mb-4 group"
>
	<svg
		class="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
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
	<span>Back</span>
</a>
