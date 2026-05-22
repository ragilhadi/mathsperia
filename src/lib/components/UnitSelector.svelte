<script lang="ts">
	import { UNITS, getLastUnit, setLastUnit, type Unit } from '$lib/utils/units';
	import { tKey } from '$lib/stores/lang.svelte';

	interface Props {
		unit: Unit;
		onChange?: (oldUnit: Unit, newUnit: Unit) => void;
	}

	let { unit = $bindable(), onChange }: Props = $props();

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const oldUnit = unit;
		const newUnit = target.value as Unit;
		unit = newUnit;
		setLastUnit(newUnit);
		onChange?.(oldUnit, newUnit);
	}
</script>

<div class="flex items-center gap-2">
	<label for="unit-select" class="micro-label">{tKey('common.unit')}</label>
	<select
		id="unit-select"
		value={unit}
		onchange={handleChange}
		class="border-border-default focus:border-border-strong cursor-pointer rounded-lg border bg-bg-inset px-3 py-1.5 font-mono text-sm text-text-primary transition-colors duration-150 focus:ring-2 focus:ring-indigo/20 focus:outline-none"
	>
		{#each UNITS as u}
			<option value={u.value}>{u.label}</option>
		{/each}
	</select>
</div>
