<script lang="ts">
	interface Props {
		name: string;
		href: string;
		description?: string;
		svgPreview?: string;
	}

	let { name, href, description = '', svgPreview = '' }: Props = $props();
</script>

<a {href} class="surface-panel group block cursor-pointer overflow-hidden">
	<!-- SVG preview area -->
	<div class="glow-panel m-3 flex h-28 items-center justify-center">
		{#if svgPreview}
			<div class="shape-glow opacity-80 transition-opacity group-hover:opacity-100">
				{@html svgPreview}
			</div>
		{/if}
	</div>
	<!-- Label area -->
	<div class="px-4 pt-2 pb-4">
		<h3 class="font-display text-base font-semibold text-text-primary">{name}</h3>
		{#if description}
			<p class="mt-0.5 text-xs leading-snug text-text-muted">{description}</p>
		{/if}
	</div>
</a>
