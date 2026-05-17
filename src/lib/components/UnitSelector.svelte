<script lang="ts">
	import { UNITS, getLastUnit, setLastUnit, type Unit } from '$lib/utils/units';

	interface Props {
		unit: Unit;
		onChange?: (unit: Unit) => void;
	}

	let { unit = $bindable(), onChange }: Props = $props();

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const newUnit = target.value as Unit;
		unit = newUnit;
		setLastUnit(newUnit);
		onChange?.(newUnit);
	}
</script>

<div class="flex items-center gap-2">
	<label for="unit-select" class="micro-label">Unit</label>
	<select
		id="unit-select"
		value={unit}
		onchange={handleChange}
		class="bg-bg-inset border border-border-default rounded-lg px-3 py-1.5 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20 transition-colors duration-150 cursor-pointer"
	>
		{#each UNITS as u}
			<option value={u.value}>{u.label}</option>
		{/each}
	</select>
</div>
