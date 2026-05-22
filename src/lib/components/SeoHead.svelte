<script lang="ts">
	interface Props {
		title: string;
		description: string;
		canonicalPath?: string;
		ogImage?: string;
		ogType?: 'website' | 'article';
		keywords?: string;
		structuredData?: Record<string, unknown> | null;
		noindex?: boolean;
	}

	let {
		title,
		description,
		canonicalPath = '',
		ogImage = 'https://mathsperia.web.id/og-image.png',
		ogType = 'website',
		keywords = '',
		structuredData = null,
		noindex = false
	}: Props = $props();

	const siteUrl = 'https://mathsperia.web.id';
	const canonical = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl;
	const fullTitle = title.includes('Mathsperia') ? title : `${title} | Mathsperia`;

	let jsonLdString = $derived(
		structuredData
			? `\u003cscript type="application/ld+json"\u003e${JSON.stringify(structuredData)}\u003c/script\u003e`
			: ''
	);
</script>

<svelte:head>
	<!-- Title & Meta -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
	<meta name="author" content="Mathsperia" />
	<meta name="theme-color" content="#07090F" />
	<meta
		name="robots"
		content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
	/>

	<!-- Canonical -->
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content="Mathsperia" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:site" content="@mathsperia" />

	<!-- Structured Data / JSON-LD -->
	{#if jsonLdString}
		{@html jsonLdString}
	{/if}
</svelte:head>
