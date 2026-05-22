<script lang="ts">
	import { tKey } from '$lib/stores/lang.svelte';

	interface Props {
		value: number;
		min: number;
		max: number;
		step?: number;
		label: string;
		placeholder?: string;
		unit?: string;
		onkeydown?: (e: KeyboardEvent) => void;
	}

	let {
		value = $bindable(),
		min,
		max,
		step = 1,
		label,
		placeholder = '',
		unit = '',
		onkeydown
	}: Props = $props();

	// Sync clamped range into number when slider changes
	function handleSlider(e: Event) {
		const target = e.target as HTMLInputElement;
		value = parseFloat(target.value);
	}
</script>

<div class="flex flex-col gap-1.5">
	<label class="micro-label" for={`slider-${label}`}>{label}</label>

	<div class="flex items-center gap-3">
		<input
			type="range"
			id={`slider-${label}`}
			{min}
			{max}
			{step}
			bind:value
			class="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-bg-inset accent-indigo"
			aria-label={`${label} slider`}
		/>
		<div class="relative w-28">
			<input
				type="number"
				{min}
				step={typeof step === 'number' && step < 1 ? step : 'any'}
				class="border-border-default focus:border-border-strong w-full rounded-lg border bg-bg-inset px-3
						 py-1.5 font-mono text-sm text-text-primary
						 transition-colors duration-150 placeholder:text-text-muted focus:ring-2
						 focus:ring-indigo/20 focus:outline-none"
				placeholder={placeholder || tKey('common.inputPlaceholder')}
				bind:value
				onkeydown={(e: KeyboardEvent) => onkeydown?.(e)}
			/>
			{#if unit}
				<span class="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-text-muted"
					>{unit}</span
				>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Custom range slider track */
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
	}
	input[type='range']::-webkit-slider-runnable-track {
		height: 6px;
		border-radius: 3px;
		background: var(--color-bg-inset);
		border: 1px solid var(--color-border-default);
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-indigo);
		margin-top: -6px;
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
		cursor: pointer;
		transition: transform 0.1s ease;
	}
	input[type='range']::-webkit-slider-thumb:hover {
		transform: scale(1.15);
	}
	input[type='range']::-moz-range-track {
		height: 6px;
		border-radius: 3px;
		background: var(--color-bg-inset);
		border: 1px solid var(--color-border-default);
	}
	input[type='range']::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-indigo);
		border: none;
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
		cursor: pointer;
		transition: transform 0.1s ease;
	}
	input[type='range']::-moz-range-thumb:hover {
		transform: scale(1.15);
	}
</style>
