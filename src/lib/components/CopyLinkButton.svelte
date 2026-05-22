<script lang="ts">
	import { tKey } from '$lib/stores/lang.svelte';

	let copied = $state(false);

	function handleCopy() {
		if (typeof window === 'undefined') return;
		const url = window.location.href;
		navigator.clipboard
			.writeText(url)
			.then(() => {
				copied = true;
				setTimeout(() => (copied = false), 2000);
			})
			.catch(() => {});
	}
</script>

<button
	onclick={handleCopy}
	class="border-border-default hover:border-border-strong flex cursor-pointer items-center gap-1.5 rounded-lg border bg-bg-inset px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
	title={tKey('common.shareableUrl')}
>
	{#if copied}
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
		<span class="text-emerald">{tKey('common.copied')}</span>
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
			><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
				d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
			/></svg
		>
		<span>{tKey('common.copyLink')}</span>
	{/if}
</button>
