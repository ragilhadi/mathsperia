<script lang="ts">
	import '../../../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="geo-grid min-h-screen bg-bg-surface font-body text-text-primary antialiased">
	<main class="mx-auto max-w-3xl px-4 py-6">
		{@render children?.()}
	</main>
	<div class="py-2 text-center">
		<a
			href="https://mathsperia.web.id"
			target="_blank"
			rel="noopener noreferrer"
			class="font-mono text-xs text-text-muted transition-colors hover:text-indigo"
		>
			Powered by Mathsperia
		</a>
	</div>
</div>
