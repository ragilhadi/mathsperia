<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
	let current = $derived(theme.current);
</script>

<button
	onclick={() => theme.toggle()}
	aria-label={current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	class="border-border-default hover:border-border-strong flex h-9 w-9 items-center justify-center rounded-lg border bg-bg-inset text-text-secondary transition-colors duration-150 hover:text-text-primary"
	title={current === 'dark' ? 'Light' : 'Dark'}
	data-testid="theme-toggle"
>
	{#if current === 'dark'}
		<!-- Sun icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-amber"
			><circle cx="12" cy="12" r="4" /><path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
			/></svg
		>
	{:else}
		<!-- Moon icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-indigo"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
		>
	{/if}
</button>
