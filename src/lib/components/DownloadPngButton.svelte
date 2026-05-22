<script lang="ts">
	import { onMount } from 'svelte';
	import { tKey } from '$lib/stores/lang.svelte';

	let svgElement = $state<SVGElement | null>(null);
	let exported = $state(false);

	function handleDownload() {
		const svg = svgElement ?? (document.querySelector('.glow-panel svg') as SVGElement | null);
		if (!svg) return;

		const serializer = new XMLSerializer();
		const svgStr = serializer.serializeToString(svg);
		const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(blob);

		const img = new Image();
		const rect = svg.getBoundingClientRect();
		const scale = 4; // 4x scale for crisp PNG
		const canvas = document.createElement('canvas');
		canvas.width = rect.width * scale;
		canvas.height = rect.height * scale;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		img.onload = () => {
			// Draw transparent background
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// Fill with surface bg color based on current theme
			const isLight = document.documentElement.dataset.theme === 'light';
			ctx.fillStyle = isLight ? '#ffffff' : '#0D1117';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			const pngUrl = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = 'mathsperia-shape.png';
			link.href = pngUrl;
			link.click();
			URL.revokeObjectURL(url);

			exported = true;
			setTimeout(() => (exported = false), 2000);
		};
		img.src = url;
	}
</script>

<button
	onclick={handleDownload}
	class="border-border-default hover:border-border-strong flex cursor-pointer items-center gap-1.5 rounded-lg border bg-bg-inset px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
	title={tKey('common.downloadPng')}
>
	{#if exported}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-emerald"><path d="M20 6 9 17l-5-5" /></svg
		>
		<span class="text-emerald">{tKey('common.downloaded')}</span>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
				points="7 10 12 15 17 10"
			/><line x1="12" y1="15" x2="12" y2="3" /></svg
		>
		<span>{tKey('common.downloadPng')}</span>
	{/if}
</button>
