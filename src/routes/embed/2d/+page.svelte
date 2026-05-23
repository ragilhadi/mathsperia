<script lang="ts">
	import { shapes } from '$lib/utils/shapes';

	const svgPreviews: Record<string, string> = {
		circle:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><circle cx="50" cy="50" r="38" fill="none" stroke="#818CF8" stroke-width="2"/><circle cx="50" cy="50" r="3" fill="#818CF8"/></svg>',
		rectangle:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><rect x="15" y="28" width="70" height="44" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		square:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><rect x="20" y="20" width="60" height="60" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		triangle:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><polygon points="50,15 88,78 12,78" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		trapezoid:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><polygon points="25,28 75,28 90,72 10,72" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		parallelogram:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><polygon points="18,72 42,28 80,28 56,72" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		ellipse:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><ellipse cx="50" cy="50" rx="40" ry="24" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		rhombus:
			'<svg viewBox="0 0 100 100" class="w-12 h-12"><polygon points="50,12 88,50 50,88 12,50" fill="none" stroke="#818CF8" stroke-width="2"/></svg>',
		kite: '<svg viewBox="0 0 100 100" class="w-12 h-12"><polygon points="50,12 70,50 50,88 30,50" fill="none" stroke="#818CF8" stroke-width="2"/></svg>'
	};
</script>

<h1 class="mb-4 font-display text-2xl font-bold tracking-tight text-text-primary">
	2D Geometry Calculators
</h1>
<p class="mb-6 text-sm text-text-secondary">Select a shape to calculate.</p>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
	{#each shapes as shape}
		<a
			href="/embed/2d/{shape.id}"
			class="surface-panel group flex cursor-pointer flex-col items-center gap-2 p-4 transition-colors hover:border-indigo/30"
		>
			{#if svgPreviews[shape.id]}
				<div class="shape-glow opacity-80 transition-opacity group-hover:opacity-100">
					{@html svgPreviews[shape.id]}
				</div>
			{/if}
			<span class="font-display text-sm font-semibold text-text-primary">{shape.name}</span>
		</a>
	{/each}
</div>
