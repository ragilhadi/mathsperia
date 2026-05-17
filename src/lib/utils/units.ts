// Unit conversion system for Mathsperia
// Supports: mm, cm, m, km, in, ft, yd

import { formatNumber } from './format';

export type Unit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd';

export const UNITS: { value: Unit; label: string }[] = [
	{ value: 'mm', label: 'mm' },
	{ value: 'cm', label: 'cm' },
	{ value: 'm', label: 'm' },
	{ value: 'km', label: 'km' },
	{ value: 'in', label: 'in' },
	{ value: 'ft', label: 'ft' },
	{ value: 'yd', label: 'yd' }
];

// Conversion rates to a base unit (cm)
const TO_CM: Record<Unit, number> = {
	mm: 0.1,
	cm: 1,
	m: 100,
	km: 100_000,
	in: 2.54,
	ft: 30.48,
	yd: 91.44
};

/**
 * Convert a value FROM a given unit TO centimeters (base)
 */
export function toBase(value: number, fromUnit: Unit): number {
	return value * TO_CM[fromUnit];
}

/**
 * Convert a value FROM centimeters (base) TO a given unit
 */
export function fromBase(value: number, toUnit: Unit): number {
	if (toUnit === 'cm') return value;
	return value / TO_CM[toUnit];
}

/**
 * Convert a value from one unit to another
 */
export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
	if (fromUnit === toUnit) return value;
	const inCm = toBase(value, fromUnit);
	return fromBase(inCm, toUnit);
}

const UNIT_STORAGE_KEY = 'mathsperia:lastUnit';

export function getLastUnit(): Unit {
	if (typeof localStorage === 'undefined') return 'cm';
	const saved = localStorage.getItem(UNIT_STORAGE_KEY);
	if (saved && UNITS.some((u) => u.value === saved)) {
		return saved as Unit;
	}
	return 'cm';
}

export function setLastUnit(unit: Unit): void {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(UNIT_STORAGE_KEY, unit);
	}
}

/**
 * Format a number as a length with unit suffix
 */
export function formatLength(value: number, unit: Unit): string {
	return `${formatNumber(value)} ${unit}`;
}

/**
 * Format a number as an area with unit suffix
 */
export function formatArea(value: number, unit: Unit): string {
	return `${formatNumber(value)} ${unit}\u00B2`;
}

/**
 * Format a number as an area with unit label (for chip labels)
 */
export function areaUnitLabel(unit: Unit): string {
	return `${unit}\u00B2`;
}

/**
 * Format a number as a volume with unit label (for chip labels)
 */
export function volumeUnitLabel(unit: Unit): string {
	return `${unit}\u00B3`;
}
