<script lang="ts">
	import ShapeCard from '$lib/components/ShapeCard.svelte';
	import { shapes } from '$lib/utils/shapes';
</script>

<svelte:head>
	<title>2D Geometry - Mathsperia</title>
	<meta name="description" content="Interactive 2D geometry calculators. Calculate area and perimeter for circles, rectangles, triangles, and more." />
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-6xl mx-auto">
		<!-- Back Button -->
		<a
			href="/"
			class="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6 transition-colors"
		>
			← Back to Home
		</a>

		<!-- Header Section -->
		<header class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-4 text-blue-500">
				📐 2D Geometry Calculators
			</h1>
			<p class="text-xl text-[#9ca3af] mb-2">
				Interactive shape calculators with real-time visualizations
			</p>
			<p class="text-sm text-[#9ca3af]">
				Select a shape below to calculate area and perimeter
			</p>
		</header>

		<!-- Shapes Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each shapes as shape}
				<ShapeCard {shape} />
			{/each}
		</div>
	</div>
</div>
