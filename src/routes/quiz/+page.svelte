<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import ShapeCard from '$lib/components/ShapeCard.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { tKey } from '$lib/stores/lang.svelte';

	const quizzes = [
		{
			nameKey: 'pages.quiz.quiz2dName',
			descKey: 'pages.quiz.quiz2dDesc',
			id: '2d',
			href: '/quiz/2d',
			available: true,
			svgPreview: `<svg viewBox="0 0 100 100" class="w-16 h-16"><circle cx="50" cy="50" r="32" fill="rgba(99,102,241,0.08)" stroke="#818CF8" stroke-width="2"/><text x="50" y="58" text-anchor="middle" fill="#818CF8" font-family="Space Grotesk, system-ui, sans-serif" font-size="32" font-weight="700">?</text></svg>`
		},
		{
			nameKey: 'pages.quiz.quiz3dName',
			descKey: 'pages.quiz.quiz3dDesc',
			id: '3d',
			href: '',
			available: false,
			svgPreview: `<svg viewBox="0 0 100 100" class="w-16 h-16"><rect x="26" y="26" width="48" height="48" rx="6" fill="rgba(71,85,105,0.06)" stroke="#475569" stroke-width="2"/><text x="50" y="58" text-anchor="middle" fill="#475569" font-family="Space Grotesk, system-ui, sans-serif" font-size="32" font-weight="700">?</text></svg>`
		}
	];

	const pageData = categoryPageData({
		name: 'Geometry Quiz — Test Your Knowledge | Mathsperia',
		urlPath: '/quiz',
		description:
			'Test your knowledge with interactive geometry quizzes. Challenge yourself on 2D shapes, circles, triangles, polygons and more.',
		itemList: [{ name: '2D Geometry Quiz', url: '/quiz/2d' }]
	});
</script>

<SeoHead
	title="Geometry Quiz — Test Your Knowledge | Mathsperia"
	description="Test your knowledge with interactive geometry quizzes. Challenge yourself on 2D shapes, circles, triangles, polygons and more."
	canonicalPath="/quiz"
	keywords="geometry quiz, math quiz, 2D geometry quiz, circle quiz, triangle quiz, polygon quiz, math test"
	structuredData={pageData}
/>

<Breadcrumb items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('nav.quiz') }]} />
<p class="micro-label mb-3">{tKey('pages.quiz.subtitle')}</p>
<h1 class="mb-2 font-display text-4xl font-bold tracking-tight text-text-primary">
	{tKey('pages.quiz.title')}
</h1>
<p class="mb-10 text-text-secondary">{tKey('pages.quiz.desc')}</p>

<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
	{#each quizzes as quiz}
		{#if quiz.available}
			<ShapeCard
				name={tKey(quiz.nameKey)}
				description={tKey(quiz.descKey)}
				href={quiz.href}
				svgPreview={quiz.svgPreview}
			/>
		{:else}
			<div class="surface-panel group block cursor-not-allowed overflow-hidden opacity-50">
				<div class="glow-panel m-3 flex h-28 items-center justify-center">
					<div class="opacity-60">
						{@html quiz.svgPreview}
					</div>
				</div>
				<div class="px-4 pt-2 pb-4">
					<div class="flex items-center gap-2">
						<h3 class="font-display text-base font-semibold text-text-muted">
							{tKey(quiz.nameKey)}
						</h3>
						<span
							class="rounded-full bg-bg-inset px-2 py-0.5 text-xs font-semibold tracking-wider text-text-muted uppercase"
							>{tKey('pages.quiz.comingSoon')}</span
						>
					</div>
					<p class="mt-0.5 text-xs leading-snug text-text-muted">{tKey(quiz.descKey)}</p>
				</div>
			</div>
		{/if}
	{/each}
</div>
