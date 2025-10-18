<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import katex from 'katex';

	interface Props {
		formula: string;
		label?: string;
	}

	let { formula, label }: Props = $props();
	let formulaElement: HTMLDivElement | undefined = $state(undefined);

	function renderFormula() {
		if (browser && formulaElement && formula) {
			try {
				katex.render(formula, formulaElement, {
					throwOnError: false,
					displayMode: true
				});
			} catch (error) {
				console.error('KaTeX rendering error:', error);
				formulaElement.textContent = formula;
			}
		}
	}

	onMount(() => {
		renderFormula();
	});

	$effect(() => {
		renderFormula();
	});
</script>

<div class="bg-[#1a1a1d] border border-gray-700 rounded-lg p-4 my-3">
	{#if label}
		<div class="text-sm text-[#9ca3af] mb-2 font-semibold">{label}</div>
	{/if}
	<div bind:this={formulaElement} class="text-center text-[#e5e7eb] katex-formula"></div>
</div>

<style>
	:global(.katex-formula .katex) {
		font-size: 1.2em;
	}

	:global(.katex-formula .katex-display) {
		margin: 0;
	}
</style>
