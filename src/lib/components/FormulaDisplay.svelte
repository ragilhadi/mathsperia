<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import katex from 'katex';

	interface Props {
		template: string;
		evaluated: string;
	}

	let { template, evaluated }: Props = $props();
	let templateElement: HTMLDivElement | undefined = $state(undefined);
	let evaluatedElement: HTMLDivElement | undefined = $state(undefined);

	function renderKatex(element: HTMLDivElement | undefined, formula: string) {
		if (browser && element && formula) {
			try {
				katex.render(formula, element, {
					throwOnError: false,
					displayMode: true
				});
			} catch (error) {
				console.error('KaTeX rendering error:', error);
				element.textContent = formula;
			}
		}
	}

	onMount(() => {
		renderKatex(templateElement, template);
		renderKatex(evaluatedElement, evaluated);
	});

	$effect(() => {
		renderKatex(templateElement, template);
		renderKatex(evaluatedElement, evaluated);
	});
</script>

<div class="formula-panel flex flex-col gap-3">
	<!-- Template -->
	<div>
		<p class="micro-label mb-1.5" style="color: rgba(252, 211, 77, 0.6)">Template</p>
		<div bind:this={templateElement} class="katex-template"></div>
	</div>
	<!-- Divider -->
	<hr class="border-border-divider" />
	<!-- Evaluated -->
	<div>
		<p class="micro-label mb-1.5" style="color: rgba(252, 211, 77, 0.6)">Calculation</p>
		<div bind:this={evaluatedElement} class="katex-evaluated font-mono text-amber"></div>
	</div>
</div>

<style>
	:global(.katex-template .katex),
	:global(.katex-evaluated .katex) {
		font-size: 1.1em;
	}
	:global(.katex-template .katex-display),
	:global(.katex-evaluated .katex-display) {
		margin: 0;
	}
	:global(.katex) {
		color: var(--color-text-primary);
	}
</style>
