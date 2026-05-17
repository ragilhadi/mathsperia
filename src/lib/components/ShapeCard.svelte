<script lang="ts">
	interface Props {
		name: string;
		href: string;
		description?: string;
		svgPreview?: string;
	}

	let { name, href, description = '', svgPreview = '' }: Props = $props();
</script>

<a {href} class="surface-panel block overflow-hidden group cursor-pointer">
	<!-- SVG preview area -->
	<div class="glow-panel m-3 h-28 flex items-center justify-center">
		{#if svgPreview}
			<div class="shape-glow opacity-80 group-hover:opacity-100 transition-opacity">
				{@html svgPreview}
			</div>
		{/if}
	</div>
	<!-- Label area -->
	<div class="px-4 pb-4 pt-2">
		<h3 class="font-display font-semibold text-base text-text-primary">{name}</h3>
		{#if description}
			<p class="text-text-muted text-xs mt-0.5 leading-snug">{description}</p>
		{/if}
	</div>
</a>
