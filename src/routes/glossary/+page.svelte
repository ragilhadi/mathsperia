<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import {
		GLOSSARY,
		searchGlossary,
		getGlossaryByLetter,
		getGlossaryCategories
	} from '$lib/utils/glossary';
	import { categoryPageData } from '$lib/utils/seo';
	import { tKey } from '$lib/stores/lang.svelte';

	const pageData = categoryPageData({
		name: 'Geometry Glossary',
		urlPath: '/glossary',
		description:
			'Searchable glossary of geometry terms and definitions. Browse by letter or category for quick reference.',
		itemList: GLOSSARY.map((t) => ({
			name: t.term,
			url: `/glossary#${t.term.toLowerCase().replace(/\s+/g, '-')}`
		}))
	});

	const categories = getGlossaryCategories();
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const byLetter = getGlossaryByLetter();

	let searchQuery = $state('');
	let activeCategory = $state('All');

	let filteredTerms = $derived(() => {
		let results = searchGlossary(searchQuery);
		if (activeCategory !== 'All') {
			results = results.filter((t) => t.category === activeCategory);
		}
		return results;
	});

	let groupedTerms = $derived(() => {
		const terms = filteredTerms();
		const map = new Map<string, typeof terms>();
		for (const term of terms) {
			const letter = term.term[0].toUpperCase();
			if (!map.has(letter)) map.set(letter, []);
			map.get(letter)!.push(term);
		}
		return map;
	});

	function scrollToLetter(letter: string) {
		const el = document.getElementById(`letter-${letter}`);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function termId(term: string) {
		return term.toLowerCase().replace(/\s+/g, '-');
	}

	function relatedShapeUrl(shape?: string) {
		if (!shape) return '';
		if (shape === 'triangle') return '/2d/triangle';
		return `/2d/${shape}`;
	}
</script>

<SeoHead
	title="Geometry Glossary — Terms & Definitions"
	description="Searchable glossary of geometry terms and definitions. Browse by letter or category for quick reference. Covers angles, triangles, polygons, measurements, and more."
	canonicalPath="/glossary"
	keywords="geometry glossary, geometry terms, geometry definitions, angles, triangles, polygons, circles, area, perimeter, coordinate geometry, trigonometry"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('nav.glossary') }]} />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.glossary.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.glossary.title')}
	</h1>
	<p class="mt-2 text-text-secondary">{tKey('pages.glossary.desc')}</p>
</div>

<!-- Search -->
<div class="relative mb-4">
	<svg
		class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-muted"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<circle cx="11" cy="11" r="8" />
		<line x1="21" y1="21" x2="16.65" y2="16.65" />
	</svg>
	<input
		type="text"
		bind:value={searchQuery}
		placeholder={tKey('pages.glossary.searchPlaceholder')}
		class="border-border-default w-full rounded-xl border bg-bg-inset px-4 py-3 pl-12 text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:ring-2 focus:ring-indigo/20 focus:outline-none"
	/>
</div>

<!-- Category pills -->
<div class="mb-6 flex flex-wrap gap-2">
	<button
		class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors {activeCategory === 'All'
			? 'bg-indigo text-white'
			: 'border-border-default border bg-bg-inset text-text-secondary hover:text-text-primary'}"
		onclick={() => (activeCategory = 'All')}
	>
		{tKey('pages.glossary.all')}
	</button>
	{#each categories as category}
		<button
			class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors {activeCategory ===
			category
				? 'bg-indigo text-white'
				: 'border-border-default border bg-bg-inset text-text-secondary hover:text-text-primary'}"
			onclick={() => (activeCategory = category)}
		>
			{category}
		</button>
	{/each}
</div>

<!-- Alphabetical quick-jump -->
<div class="surface-panel mb-8 flex flex-wrap items-center justify-center gap-1 p-3 sm:gap-2">
	{#each letters as letter}
		{#if byLetter.has(letter)}
			<button
				onclick={() => scrollToLetter(letter)}
				class="px-1.5 py-0.5 text-sm font-medium text-text-secondary transition-colors hover:text-indigo"
			>
				{letter}
			</button>
		{:else}
			<span class="px-1.5 py-0.5 text-sm text-text-muted">{letter}</span>
		{/if}
	{/each}
</div>

<!-- Glossary content -->
{#if groupedTerms().size === 0}
	<div class="surface-panel p-8 text-center">
		<p class="text-text-muted">{tKey('pages.glossary.noResults')}</p>
	</div>
{:else}
	{#each Array.from(groupedTerms().entries()).sort( ([a], [b]) => a.localeCompare(b) ) as [letter, terms]}
		<section id="letter-{letter}" class="mb-10 scroll-mt-24">
			<h2
				class="border-border-default mb-4 border-b pb-2 font-display text-2xl font-bold text-indigo"
			>
				{letter}
			</h2>
			<div class="space-y-4">
				{#each terms as termItem}
					<article id={termId(termItem.term)} class="surface-panel scroll-mt-24 p-5">
						<div class="mb-2 flex items-start justify-between gap-3">
							<h3 class="font-display text-lg font-semibold text-text-primary">
								{termItem.term}
							</h3>
							<span class="micro-label shrink-0">{termItem.category}</span>
						</div>
						<p class="text-sm leading-relaxed text-text-secondary">
							{termItem.definition}
						</p>
						{#if termItem.formula}
							<div class="formula-panel mt-3">
								<p class="font-mono text-sm text-amber">{termItem.formula}</p>
							</div>
						{/if}
						<div class="mt-3 flex flex-wrap items-center gap-3">
							{#if termItem.relatedShape}
								<a
									href={relatedShapeUrl(termItem.relatedShape)}
									class="text-sm font-medium text-indigo transition-colors hover:text-indigo-bright"
								>
									&rarr; {tKey('common.viewCalculator')}
								</a>
							{/if}
							{#if termItem.seeAlso && termItem.seeAlso.length > 0}
								<span class="text-xs text-text-muted">{tKey('common.seeAlso')}</span>
								{#each termItem.seeAlso as ref, i}
									<a
										href="#{termId(ref)}"
										class="text-sm text-indigo transition-colors hover:text-indigo-bright"
									>
										{ref}{#if i < termItem.seeAlso!.length - 1},{/if}
									</a>
								{/each}
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/each}
{/if}
