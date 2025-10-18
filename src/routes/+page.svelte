<svelte:head>
	<title>Mathsperia - Interactive Mathematics Playground</title>
	<meta name="description" content="Visual and interactive mathematics tools. Explore 2D geometry, and more coming soon!" />
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-12 px-4">
	<div class="max-w-6xl mx-auto">
		<!-- Header Section -->
		<header class="text-center mb-12">
			<h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
				🧮 Mathsperia
			</h1>
			<p class="text-xl text-[#9ca3af] mb-2">
				Interactive Mathematics Playground
			</p>
			<p class="text-sm text-[#9ca3af]">
				Visual mathematics made simple - Explore, calculate, and learn
			</p>
		</header>

		<!-- Feature Categories -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			<!-- 2D Geometry -->
			<a
				href="/2d"
				class="block bg-[#1a1a1d] border-2 border-blue-500 rounded-lg p-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:brightness-110"
			>
				<div class="text-center">
					<div class="text-5xl mb-4">📐</div>
					<h2 class="text-2xl font-bold text-blue-500 mb-3">2D Geometry</h2>
					<p class="text-[#9ca3af] text-sm mb-4">
						Calculate area and perimeter for circles, rectangles, triangles, and more
					</p>
					<div class="inline-flex items-center text-blue-400 text-sm font-semibold">
						Explore →
					</div>
				</div>
			</a>

			<!-- 3D Geometry - Coming Soon -->
			<div class="block bg-[#1a1a1d] border-2 border-gray-700 rounded-lg p-8 opacity-60 cursor-not-allowed">
				<div class="text-center">
					<div class="text-5xl mb-4">📦</div>
					<h2 class="text-2xl font-bold text-gray-500 mb-3">3D Geometry</h2>
					<p class="text-[#9ca3af] text-sm mb-4">
						Volume, surface area calculations for 3D shapes
					</p>
					<div class="inline-flex items-center text-gray-600 text-sm font-semibold">
						Coming Soon
					</div>
				</div>
			</div>

			<!-- More Features - Coming Soon -->
			<div class="block bg-[#1a1a1d] border-2 border-gray-700 rounded-lg p-8 opacity-60 cursor-not-allowed">
				<div class="text-center">
					<div class="text-5xl mb-4">🔢</div>
					<h2 class="text-2xl font-bold text-gray-500 mb-3">More Tools</h2>
					<p class="text-[#9ca3af] text-sm mb-4">
						Additional mathematical tools and calculators
					</p>
					<div class="inline-flex items-center text-gray-600 text-sm font-semibold">
						Coming Soon
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="text-center mt-16 text-[#9ca3af] text-sm">
			<p>Made with ❤️ for mathematics enthusiasts</p>
			<p class="mt-2">No login required •  Open source</p>
		</footer>
	</div>
</div>
