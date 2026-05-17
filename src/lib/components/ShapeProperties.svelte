<script lang="ts">
	interface Property {
		label: string;
		value: string;
	}

	const properties: Record<string, Property[]> = {
		circle: [
			{ label: 'Sides', value: '0 (continuous curve)' },
			{ label: 'Vertices', value: '0' },
			{ label: 'Angles', value: '360° internally' },
			{ label: 'Symmetry', value: 'Infinite lines of symmetry' },
			{ label: 'Special cases', value: 'A circle is the shape with the largest area for a given perimeter' },
			{ label: 'Real-world', value: 'Wheels, pizza, planets, coins' }
		],
		rectangle: [
			{ label: 'Sides', value: '4' },
			{ label: 'Vertices', value: '4' },
			{ label: 'Angles', value: '4 right angles (90° each)' },
			{ label: 'Symmetry', value: '2 lines of symmetry' },
			{ label: 'Special cases', value: 'A square is a special rectangle where all sides are equal' },
			{ label: 'Real-world', value: 'Books, doors, screens, football fields' }
		],
		square: [
			{ label: 'Sides', value: '4 (all equal)' },
			{ label: 'Vertices', value: '4' },
			{ label: 'Angles', value: '4 right angles (90° each)' },
			{ label: 'Symmetry', value: '4 lines of symmetry' },
			{ label: 'Special cases', value: 'A square is both a rectangle and a rhombus' },
			{ label: 'Real-world', value: 'Chess boards, tiles, sticky notes' }
		],
		trapezoid: [
			{ label: 'Sides', value: '4' },
			{ label: 'Vertices', value: '4' },
			{ label: 'Angles', value: 'Sum = 360°' },
			{ label: 'Symmetry', value: '1 line if isosceles; none if scalene' },
			{ label: 'Special cases', value: 'A parallelogram is a trapezoid with two pairs of parallel sides' },
			{ label: 'Real-world', value: 'Roofs, handbags, bridges' }
		],
		parallelogram: [
			{ label: 'Sides', value: '4 (opposite sides equal and parallel)' },
			{ label: 'Vertices', value: '4' },
			{ label: 'Angles', value: 'Opposite angles equal, consecutive angles supplementary' },
			{ label: 'Symmetry', value: '2 lines of symmetry if rectangle or rhombus' },
			{ label: 'Special cases', value: 'Rectangle, rhombus, and square are all parallelograms' },
			{ label: 'Real-world', value: 'Slanted buildings, solar panel arrays' }
		],
		ellipse: [
			{ label: 'Sides', value: '0 (continuous curve)' },
			{ label: 'Vertices', value: '0' },
			{ label: 'Foci', value: '2 focal points' },
			{ label: 'Symmetry', value: '2 lines of symmetry' },
			{ label: 'Special cases', value: 'A circle is an ellipse where both axes are equal' },
			{ label: 'Real-world', value: 'Planetary orbits, mirrors, arches' }
		],
		rhombus: [
			{ label: 'Sides', value: '4 (all equal)' },
			{ label: 'Vertices', value: '4' },
			{ label: 'Angles', value: 'Opposite angles equal' },
			{ label: 'Symmetry', value: '2 lines of symmetry' },
			{ label: 'Special cases', value: 'A square is a special rhombus with right angles' },
			{ label: 'Real-world', value: 'Kites, diamonds, traffic signs' }
		],
		kite: [
			{ label: 'Sides', value: '4 (two pairs of adjacent equal sides)' },
			{ label: 'Vertices', value: '4' },
			{ label: 'Angles', value: 'One pair of opposite angles equal' },
			{ label: 'Symmetry', value: '1 line of symmetry' },
			{ label: 'Special cases', value: 'A rhombus is a special kite where all sides are equal' },
			{ label: 'Real-world', value: 'Kites, some arrowheads' }
		],
		'equilateral-triangle': [
			{ label: 'Sides', value: '3 (all equal)' },
			{ label: 'Vertices', value: '3' },
			{ label: 'Angles', value: '3 angles, each exactly 60°' },
			{ label: 'Symmetry', value: '3 lines of symmetry' },
			{ label: 'Special cases', value: 'The most regular triangle possible' },
			{ label: 'Real-world', value: 'Traffic signs, pool ball racks, pizza slices' }
		],
		'isosceles-triangle': [
			{ label: 'Sides', value: '3 (two equal sides)' },
			{ label: 'Vertices', value: '3' },
			{ label: 'Angles', value: 'Base angles are equal' },
			{ label: 'Symmetry', value: '1 line of symmetry' },
			{ label: 'Special cases', value: 'An equilateral triangle is a special isosceles triangle' },
			{ label: 'Real-world', value: 'Gable roofs, tent shapes, pizza slices' }
		],
		'right-triangle': [
			{ label: 'Sides', value: '3' },
			{ label: 'Vertices', value: '3' },
			{ label: 'Angles', value: '1 right angle (90°), 2 acute angles' },
			{ label: 'Symmetry', value: 'None (unless isosceles right triangle)' },
			{ label: 'Special cases', value: 'An isosceles right triangle has two 45° angles' },
			{ label: 'Real-world', value: 'Staircases, ramps, set squares' }
		],
		'scalene-triangle': [
			{ label: 'Sides', value: '3 (all different)' },
			{ label: 'Vertices', value: '3' },
			{ label: 'Angles', value: 'All three angles different' },
			{ label: 'Symmetry', value: 'None' },
			{ label: 'Special cases', value: 'The most general type of triangle' },
			{ label: 'Real-world', value: 'Most natural triangular shapes (mountain slopes, sails)' }
		],
		cube: [
			{ label: 'Faces', value: '6 (all squares)' },
			{ label: 'Edges', value: '12' },
			{ label: 'Vertices', value: '8' },
			{ label: 'Symmetry', value: '9 planes, 13 axes of rotation' },
			{ label: 'Special cases', value: 'A cube is the only regular hexahedron' },
			{ label: 'Real-world', value: 'Dice, Rubik\'s cube, sugar cubes, ice cubes' }
		],
		'rectangular-prism': [
			{ label: 'Faces', value: '6 (rectangles)' },
			{ label: 'Edges', value: '12' },
			{ label: 'Vertices', value: '8' },
			{ label: 'Symmetry', value: 'Varied (3 planes if all sides different)' },
			{ label: 'Special cases', value: 'A cube is a special rectangular prism with equal sides' },
			{ label: 'Real-world', value: 'Bricks, books, shipping boxes, rooms' }
		],
		sphere: [
			{ label: 'Faces', value: '0 (continuous surface)' },
			{ label: 'Edges', value: '0' },
			{ label: 'Vertices', value: '0' },
			{ label: 'Symmetry', value: 'Infinite planes and axes of symmetry' },
			{ label: 'Special cases', value: 'The most symmetric 3D shape' },
			{ label: 'Real-world', value: 'Planets, bubbles, marbles, balls' }
		],
		cylinder: [
			{ label: 'Faces', value: '3 (2 circular bases + 1 curved)' },
			{ label: 'Edges', value: '2' },
			{ label: 'Vertices', value: '0' },
			{ label: 'Symmetry', value: 'Infinite planes through the axis' },
			{ label: 'Special cases', value: 'A right cylinder has perpendicular bases' },
			{ label: 'Real-world', value: 'Cans, barrels, pipes, columns' }
		],
		cone: [
			{ label: 'Faces', value: '2 (1 circular base + 1 curved)' },
			{ label: 'Edges', value: '1' },
			{ label: 'Vertices', value: '1 (apex)' },
			{ label: 'Symmetry', value: 'Infinite planes through the axis' },
			{ label: 'Special cases', value: 'A cone with h = r has slant height r√2' },
			{ label: 'Real-world', value: 'Ice cream cones, traffic cones, megaphones' }
		],
		pyramid: [
			{ label: 'Faces', value: '5 (1 base + 4 triangular)' },
			{ label: 'Edges', value: '8' },
			{ label: 'Vertices', value: '5' },
			{ label: 'Symmetry', value: 'Square pyramid: 4 planes of symmetry' },
			{ label: 'Special cases', value: 'A regular tetrahedron is a triangular pyramid' },
			{ label: 'Real-world', value: 'Egyptian pyramids, roof peaks, paperweights' }
		],
		torus: [
			{ label: 'Faces', value: '1 (continuous surface)' },
			{ label: 'Edges', value: '0' },
			{ label: 'Vertices', value: '0' },
			{ label: 'Symmetry', value: 'Infinite planes, continuous rotational symmetry' },
			{ label: 'Special cases', value: 'A horn torus has R = r (tube touches center)' },
			{ label: 'Real-world', value: 'Donuts, bagels, planetary rings, inner tubes' }
		]
	};

	let { shapeId }: { shapeId: string } = $props();
	let isOpen = $state(false);
	let shapeProps = $derived(properties[shapeId] || []);
</script>

{#if shapeProps.length > 0}
	<div class="mt-6 surface-panel p-4">
		<button
			onclick={() => (isOpen = !isOpen)}
			class="w-full flex items-center justify-between text-left group"
		>
			<p class="micro-label">Properties & Facts</p>
			<svg
				class="w-4 h-4 text-text-muted transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 9l6 6 6-6" />
			</svg>
		</button>

		{#if isOpen}
			<div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-slide-up">
				{#each shapeProps as prop}
					<div class="bg-bg-inset/50 rounded-lg p-3 border border-border-subtle">
						<p class="text-text-muted text-xs font-medium mb-0.5">{prop.label}</p>
						<p class="text-text-secondary text-sm leading-relaxed">{prop.value}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
