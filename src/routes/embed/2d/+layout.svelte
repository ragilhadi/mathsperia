<script lang="ts">
	import '../../../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="geo-grid min-h-screen bg-bg-surface text-text-primary font-body antialiased">
	<main class="mx-auto max-w-3xl px-4 py-6">
		{@render children?.()}
	</main>
	<div class="text-center py-2">
		<a
			href="https://mathsperia.web.id"
			target="_blank"
			rel="noopener noreferrer"
			class="text-xs text-text-muted hover:text-indigo transition-colors font-mono"
		>
			Powered by Mathsperia
		</a>
	</div>
</div>