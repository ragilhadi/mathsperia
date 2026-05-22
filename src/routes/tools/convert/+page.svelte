<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import {
		convertLength,
		convertArea,
		convertVolume,
		convertAngle,
		LENGTH_UNITS,
		AREA_UNITS,
		VOLUME_UNITS,
		ANGLE_UNITS,
		type LengthUnit,
		type AreaUnit,
		type VolumeUnit,
		type AngleUnit,
		type ConversionCategory
	} from '$lib/utils/converter';
	import { formatNumber } from '$lib/utils/format';
	import { tKey } from '$lib/stores/lang.svelte';

	const categories: { key: ConversionCategory; label: string }[] = [
		{ key: 'length', label: tKey('pages.convert.length') },
		{ key: 'area', label: tKey('pages.convert.areaUnit') },
		{ key: 'volume', label: tKey('pages.convert.volume') },
		{ key: 'angle', label: tKey('pages.convert.angle') }
	];

	const defaultFromUnits: Record<ConversionCategory, string> = {
		length: 'm',
		area: 'm²',
		volume: 'm³',
		angle: 'deg'
	};

	const defaultToUnits: Record<ConversionCategory, string> = {
		length: 'ft',
		area: 'ft²',
		volume: 'ft³',
		angle: 'rad'
	};

	let category = $state<ConversionCategory>('length');
	let fromValue = $state(1);
	let toValue = $state(1);
	let direction = $state<'from' | 'to'>('from');

	let fromUnit = $state<string>('m');
	let toUnit = $state<string>('ft');

	let currentUnits = $derived.by(() => {
		switch (category) {
			case 'length':
				return LENGTH_UNITS;
			case 'area':
				return AREA_UNITS;
			case 'volume':
				return VOLUME_UNITS;
			case 'angle':
				return ANGLE_UNITS;
		}
	});

	let conversionFactor = $derived.by(() => {
		switch (category) {
			case 'length':
				return convertLength(1, fromUnit as LengthUnit, toUnit as LengthUnit);
			case 'area':
				return convertArea(1, fromUnit as AreaUnit, toUnit as AreaUnit);
			case 'volume':
				return convertVolume(1, fromUnit as VolumeUnit, toUnit as VolumeUnit);
			case 'angle': {
				const result = convertAngle(1, fromUnit as AngleUnit);
				const targetKey = toUnit as AngleUnit;
				if (targetKey === 'deg') return result.degrees;
				if (targetKey === 'rad') return result.radians;
				return result.gradians;
			}
		}
	});

	$effect(() => {
		if (direction === 'from') {
			switch (category) {
				case 'length':
					toValue = convertLength(fromValue, fromUnit as LengthUnit, toUnit as LengthUnit);
					break;
				case 'area':
					toValue = convertArea(fromValue, fromUnit as AreaUnit, toUnit as AreaUnit);
					break;
				case 'volume':
					toValue = convertVolume(fromValue, fromUnit as VolumeUnit, toUnit as VolumeUnit);
					break;
				case 'angle': {
					const result = convertAngle(fromValue, fromUnit as AngleUnit);
					if (toUnit === 'deg') toValue = result.degrees;
					else if (toUnit === 'rad') toValue = result.radians;
					else toValue = result.gradians;
					break;
				}
			}
		}
	});

	$effect(() => {
		if (direction === 'to') {
			switch (category) {
				case 'length':
					fromValue = convertLength(toValue, toUnit as LengthUnit, fromUnit as LengthUnit);
					break;
				case 'area':
					fromValue = convertArea(toValue, toUnit as AreaUnit, fromUnit as AreaUnit);
					break;
				case 'volume':
					fromValue = convertVolume(toValue, toUnit as VolumeUnit, fromUnit as VolumeUnit);
					break;
				case 'angle': {
					const result = convertAngle(toValue, toUnit as AngleUnit);
					if (fromUnit === 'deg') fromValue = result.degrees;
					else if (fromUnit === 'rad') fromValue = result.radians;
					else fromValue = result.gradians;
					break;
				}
			}
		}
	});

	function handleFromInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = parseFloat(target.value);
		if (!isNaN(val)) {
			fromValue = val;
			direction = 'from';
		}
	}

	function handleToInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = parseFloat(target.value);
		if (!isNaN(val)) {
			toValue = val;
			direction = 'to';
		}
	}

	function swapUnits() {
		const tempUnit = fromUnit;
		fromUnit = toUnit;
		toUnit = tempUnit;
		direction = 'from';
	}

	function setCategory(cat: ConversionCategory) {
		category = cat;
		fromUnit = defaultFromUnits[cat];
		toUnit = defaultToUnits[cat];
		fromValue = 1;
		direction = 'from';
	}

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('cat', category);
		params.set('from', fromUnit);
		params.set('to', toUnit);
		if (direction === 'from') {
			params.set('val', String(fromValue));
		} else {
			params.set('val', String(toValue));
			params.set('dir', 'to');
		}
		const newUrl = `?${params.toString()}`;
		if (newUrl !== window.location.search && newUrl !== '?') {
			history.replaceState(history.state, '', newUrl);
		}
	}

	$effect(() => {
		category;
		fromUnit;
		toUnit;
		fromValue;
		toValue;
		updateUrl();
	});

	onMount(() => {
		const sp = $page.url.searchParams;
		const cat = sp.get('cat');
		if (cat && ['length', 'area', 'volume', 'angle'].includes(cat)) {
			category = cat as ConversionCategory;
		}
		const from = sp.get('from');
		const to = sp.get('to');
		const val = sp.get('val');
		const dir = sp.get('dir');

		if (from) {
			const validUnits = currentUnits.map((u) => u.value) as string[];
			if (validUnits.includes(from)) fromUnit = from;
		} else {
			fromUnit = defaultFromUnits[category];
		}

		if (to) {
			const validUnits = currentUnits.map((u) => u.value) as string[];
			if (validUnits.includes(to)) toUnit = to;
		} else {
			toUnit = defaultToUnits[category];
		}

		if (val !== null) {
			const v = parseFloat(val);
			if (!isNaN(v)) {
				if (dir === 'to') {
					toValue = v;
					direction = 'to';
				} else {
					fromValue = v;
					direction = 'from';
				}
			}
		}
	});

	const conversionTableData = $derived.by(() => {
		const baseValues: Record<ConversionCategory, number[]> = {
			length: [1, 10, 100, 1000],
			area: [1, 10, 100, 1000],
			volume: [1, 10, 100, 1000],
			angle: [1, 30, 45, 90, 180, 360]
		};
		return baseValues[category];
	});

	const fromUnitLabel = $derived(currentUnits.find((u) => u.value === fromUnit)?.label ?? fromUnit);
	const toUnitLabel = $derived(currentUnits.find((u) => u.value === toUnit)?.label ?? toUnit);
</script>

<SeoHead
	title="Unit Converter — Length, Area, Volume, Angle"
	description="Free online unit converter. Convert between length, area, volume, and angle units instantly with live results and conversion tables."
	canonicalPath="/tools/convert"
	keywords="unit converter, length converter, area converter, volume converter, angle converter, metric to imperial, meters to feet, degrees to radians"
/>

<Breadcrumb
	items={[{ label: tKey('nav.home'), href: '/' }, { label: tKey('nav.tools'), href: '/tools' }, { label: tKey('pages.convert.title') }]}
/>

<BackButton href="/tools" />

<div class="mb-8">
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">{tKey('pages.convert.title')}</h1>
	<p class="mt-2 text-text-secondary">{tKey('pages.convert.desc')}</p>
</div>

<!-- Category tabs -->
<div class="mb-6 flex flex-wrap gap-2">
	{#each categories as cat}
		<button
			onclick={() => setCategory(cat.key)}
			class={category === cat.key
				? 'micro-label rounded-lg border border-indigo bg-indigo/20 px-4 py-2 text-indigo'
				: 'micro-label rounded-lg border border-border-default px-4 py-2 text-text-secondary transition-colors duration-150 hover:text-text-primary'}
		>
			{cat.label}
		</button>
	{/each}
</div>

<!-- Converter -->
<div class="surface-panel p-6">
	<div class="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
		<!-- From column -->
		<div class="flex flex-col gap-3">
			<p class="micro-label">{tKey('pages.convert.from')}</p>
			<select
				bind:value={fromUnit}
				class="bg-bg-inset border border-border-default rounded-lg px-3 py-2 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20"
			>
				{#each currentUnits as unit}
					<option value={unit.value}>{unit.label}</option>
				{/each}
			</select>
			<input
				type="number"
				value={direction === 'from' ? fromValue : formatNumber(fromValue)}
				oninput={handleFromInput}
				onfocus={() => (direction = 'from')}
				class="bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-2xl text-text-primary focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20"
			/>
			<span class="font-mono text-xs text-text-muted">{fromUnitLabel}</span>
		</div>

		<!-- Swap button -->
		<div class="flex items-center justify-center">
			<button
				onclick={swapUnits}
				class="flex h-10 w-10 items-center justify-center rounded-full bg-bg-inset transition-colors duration-150 hover:bg-bg-overlay"
				aria-label="Swap units"
			>
				<svg
					class="h-5 w-5 text-text-secondary"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 16V4m0 0L3 8m4-4l4 4" />
					<path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
				</svg>
			</button>
		</div>

		<!-- To column -->
		<div class="flex flex-col gap-3">
			<p class="micro-label">{tKey('pages.convert.to')}</p>
			<select
				bind:value={toUnit}
				class="bg-bg-inset border border-border-default rounded-lg px-3 py-2 font-mono text-sm text-text-primary focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20"
			>
				{#each currentUnits as unit}
					<option value={unit.value}>{unit.label}</option>
				{/each}
			</select>
			<input
				type="number"
				value={direction === 'to' ? toValue : formatNumber(toValue)}
				oninput={handleToInput}
				onfocus={() => (direction = 'to')}
				class="bg-bg-inset border border-border-default rounded-lg px-4 py-2.5 font-mono text-2xl text-emerald-bright focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-indigo/20"
			/>
			<span class="font-mono text-xs text-text-muted">{toUnitLabel}</span>
		</div>
	</div>

	<!-- Conversion factor -->
	<div class="formula-panel mt-6 text-center">
		<span class="font-mono text-sm text-amber">
			1 {fromUnit} = {formatNumber(conversionFactor, 8)} {toUnit}
		</span>
	</div>
</div>

<!-- Conversion table -->
<div class="surface-panel mt-6 p-6">
	<p class="micro-label mb-4">{tKey('pages.convert.result')}</p>
	<div class="overflow-x-auto">
		<table class="w-full text-left">
			<thead>
				<tr class="border-b border-border-default">
					<th class="pb-2 pr-4 font-mono text-sm font-medium text-text-secondary">{fromUnit}</th>
					<th class="pb-2 pr-4 font-mono text-sm font-medium text-text-secondary">{toUnit}</th>
				</tr>
			</thead>
			<tbody>
				{#each conversionTableData as val}
					{@const converted =
						category === 'length'
							? convertLength(val, fromUnit as LengthUnit, toUnit as LengthUnit)
							: category === 'area'
								? convertArea(val, fromUnit as AreaUnit, toUnit as AreaUnit)
								: category === 'volume'
									? convertVolume(val, fromUnit as VolumeUnit, toUnit as VolumeUnit)
									: (() => {
											const r = convertAngle(val, fromUnit as AngleUnit);
											if (toUnit === 'deg') return r.degrees;
											if (toUnit === 'rad') return r.radians;
											return r.gradians;
										})()}
					<tr class="border-b border-border-divider">
						<td class="py-2 pr-4 font-mono text-sm text-text-primary">{formatNumber(val)} {fromUnit}</td>
						<td class="py-2 pr-4 font-mono text-sm text-emerald-bright">{formatNumber(converted, 6)} {toUnit}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>