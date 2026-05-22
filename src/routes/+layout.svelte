<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { lang } from '$lib/stores/lang.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	let themeColor = $derived(theme.current === 'light' ? '#FFFFFF' : '#07090F');

	onMount(() => {
		theme.initFromStorage();
		lang.initFromStorage();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<div class="geo-grid min-h-screen bg-bg-base text-text-primary antialiased">
	<Header />
	<main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		{@render children?.()}
	</main>
	<Footer />
</div>
