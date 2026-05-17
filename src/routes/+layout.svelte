<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

<div class="bg-bg-base geo-grid min-h-screen text-text-primary antialiased">
	<Header />
	<main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		{@render children?.()}
	</main>
	<Footer />
</div>
