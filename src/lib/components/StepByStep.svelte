<script lang="ts">
	import 'katex/dist/katex.min.css';
	import katex from 'katex';

	interface Props {
		steps: string[];
	}

	let { steps }: Props = $props();
	let showSteps = $state(false);

	function render(formula: string): string {
		try {
			return katex.renderToString(formula, {
				throwOnError: false,
				displayMode: true
			});
		} catch {
			return formula;
		}
	}
</script>

<div class="mt-3">
	<button
		onclick={() => (showSteps = !showSteps)}
		class="flex cursor-pointer items-center gap-2 text-sm font-medium text-indigo transition-colors hover:text-indigo-bright"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="transition-transform duration-200"
			class:rotate-90={showSteps}><polyline points="9 18 15 12 9 6"></polyline></svg
		>
		{showSteps ? 'Hide steps' : 'Show steps'}
	</button>

	{#if showSteps}
		<div class="formula-panel animate-fade-slide-up mt-3 flex flex-col gap-2">
			{#each steps as step, i (i)}
				<div class="flex items-start gap-2">
					<span class="mt-1.5 w-5 shrink-0 font-mono text-xs text-text-muted">{i + 1}</span>
					<div class="katex-step">{@html render(step)}</div>
				</div>
				{#if i < steps.length - 1}
					<hr class="border-border-divider ml-7" />
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(.katex-step .katex-display) {
		margin: 0;
	}
	:global(.katex-step .katex) {
		font-size: 1em;
	}
</style>
