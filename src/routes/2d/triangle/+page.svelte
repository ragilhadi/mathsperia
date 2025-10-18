<svelte:head>
	<title>Triangle Types - Mathsperia</title>
	<meta name="description" content="Choose from different triangle types to calculate area and perimeter." />
</svelte:head>

<div class="min-h-screen bg-[#0e0e10] py-8 px-4">
	<div class="max-w-5xl mx-auto">
		<!-- Back Button -->
		<a href="/2d" class="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6 transition-colors">
			← Back to 2D Geometry
		</a>

		<!-- Header -->
		<header class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-4 text-blue-500">🔺 Triangle Calculators</h1>
			<p class="text-xl text-[#9ca3af] mb-2">Choose your triangle type</p>
			<p class="text-sm text-[#9ca3af]">Different types have specific calculation methods</p>
		</header>

		<!-- Triangle Types Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Equilateral Triangle -->
			<a href="/2d/triangle/equilateral" class="block bg-[#1a1a1d] border-2 border-blue-500 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:brightness-110">
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
						<svg viewBox="0 0 100 100" class="w-full h-full">
							<polygon points="50,20 85,75 15,75" fill="none" stroke="#3b82f6" stroke-width="2" />
						</svg>
					</div>
					<h3 class="text-lg font-bold mb-2 text-blue-500">Equilateral</h3>
					<p class="text-sm text-[#9ca3af]">All sides equal</p>
				</div>
			</a>

			<!-- Isosceles Triangle -->
			<a href="/2d/triangle/isosceles" class="block bg-[#1a1a1d] border-2 border-cyan-500 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:brightness-110">
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
						<svg viewBox="0 0 100 100" class="w-full h-full">
							<polygon points="50,25 80,75 20,75" fill="none" stroke="#06b6d4" stroke-width="2" />
						</svg>
					</div>
					<h3 class="text-lg font-bold mb-2 text-cyan-500">Isosceles</h3>
					<p class="text-sm text-[#9ca3af]">Two sides equal</p>
				</div>
			</a>

			<!-- Right Triangle -->
			<a href="/2d/triangle/right" class="block bg-[#1a1a1d] border-2 border-violet-500 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:brightness-110">
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
						<svg viewBox="0 0 100 100" class="w-full h-full">
							<polygon points="25,75 25,35 70,75" fill="none" stroke="#8b5cf6" stroke-width="2" />
						</svg>
					</div>
					<h3 class="text-lg font-bold mb-2 text-violet-500">Right Triangle</h3>
					<p class="text-sm text-[#9ca3af]">90° angle</p>
				</div>
			</a>

			<!-- Scalene Triangle -->
			<a href="/2d/triangle/scalene" class="block bg-[#1a1a1d] border-2 border-green-500 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:brightness-110">
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
						<svg viewBox="0 0 100 100" class="w-full h-full">
							<polygon points="30,70 55,25 85,75" fill="none" stroke="#22c55e" stroke-width="2" />
						</svg>
					</div>
					<h3 class="text-lg font-bold mb-2 text-green-500">Scalene</h3>
					<p class="text-sm text-[#9ca3af]">All sides different</p>
				</div>
			</a>
		</div>
	</div>
</div>
