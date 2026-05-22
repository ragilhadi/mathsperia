<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageToggle from './LanguageToggle.svelte';
	import { tKey } from '$lib/stores/lang.svelte';
</script>

<header
	class="border-border-subtle fixed top-0 right-0 left-0 z-50 border-b bg-bg-base/80 backdrop-blur-md"
>
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="group flex items-center gap-2">
			<span class="font-display text-xl font-bold text-indigo">&#120120;</span>
			<span class="font-display text-base font-semibold tracking-tight text-text-primary">
				mathsperia
			</span>
		</a>
		<!-- Nav + Toggles -->
		<div class="flex items-center gap-4">
			<nav class="flex items-center gap-4">
				<a
					href="/2d"
					class="micro-label text-text-secondary transition-colors hover:text-text-primary"
					>{tKey('nav.shapes2d')}</a
				>
				<a
					href="/3d"
					class="micro-label text-text-secondary transition-colors hover:text-text-primary"
					>{tKey('nav.shapes3d')}</a
				>
				<a
					href="/tools"
					class="micro-label text-text-secondary transition-colors hover:text-text-primary"
					>{tKey('nav.tools')}</a
				>
				<a
					href="/formulas"
					class="micro-label text-text-secondary transition-colors hover:text-text-primary"
					>{tKey('nav.formulas')}</a
				>
				<a
					href="/quiz"
					class="micro-label text-text-secondary transition-colors hover:text-text-primary"
					>{tKey('nav.quiz')}</a
				>
				<a
					href="/glossary"
					class="micro-label text-text-secondary transition-colors hover:text-text-primary"
					>{tKey('nav.glossary')}</a
				>
			</nav>
			<div class="bg-border-divider h-5 w-px"></div>
			<div class="flex items-center gap-2">
				<ThemeToggle />
				<LanguageToggle />
			</div>
		</div>
	</div>
</header>
<!-- Spacer for fixed header -->
<div class="h-14"></div>
