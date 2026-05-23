<script lang="ts">
	import 'katex/dist/katex.min.css';
	import katex from 'katex';

	interface Props {
		template: string;
		evaluated: string;
	}

	let { template, evaluated }: Props = $props();

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

	let templateHtml = $derived(render(template));
	let evaluatedHtml = $derived(render(evaluated));
</script>

<div class="formula-panel flex flex-col gap-3">
	<div>
		<p class="micro-label mb-1.5" style="color: rgba(252, 211, 77, 0.6)">Template</p>
		<div class="katex-template">{@html templateHtml}</div>
	</div>
	<hr class="border-border-divider" />
	<div>
		<p class="micro-label mb-1.5" style="color: rgba(252, 211, 77, 0.6)">Calculation</p>
		<div class="katex-evaluated font-mono text-amber">{@html evaluatedHtml}</div>
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
