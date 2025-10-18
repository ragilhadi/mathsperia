<script lang="ts">
	import type { ShapeMetadata } from '$lib/utils/shapes';

	interface Props {
		shape: ShapeMetadata;
	}

	let { shape }: Props = $props();

	const colorClasses = {
		blue: 'border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
		cyan: 'border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]',
		violet: 'border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]'
	};
</script>

<a
	href="/2d/{shape.id}"
	class="block bg-[#1a1a1d] border-2 {colorClasses[
		shape.color
	]} rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
>
	<div class="flex flex-col items-center text-center">
		<div class="w-24 h-24 mb-4 flex items-center justify-center">
			<svg class="w-full h-full" viewBox="0 0 100 100">
				{#if shape.id === 'circle'}
					<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'rectangle'}
					<rect x="15" y="30" width="70" height="40" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'square'}
					<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'triangle'}
					<polygon points="50,15 85,75 15,75" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'trapezoid'}
					<polygon points="25,30 75,30 90,70 10,70" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'parallelogram'}
					<polygon points="20,70 45,30 80,30 55,70" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'ellipse'}
					<ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'rhombus'}
					<polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="currentColor" stroke-width="2" />
				{:else if shape.id === 'kite'}
					<polygon points="50,10 70,50 50,85 30,50" fill="none" stroke="currentColor" stroke-width="2" />
				{/if}
			</svg>
		</div>
		<h3 class="text-xl font-bold mb-2 text-[#e5e7eb]">{shape.name}</h3>
		<p class="text-sm text-[#9ca3af]">{shape.description}</p>
	</div>
</a>
