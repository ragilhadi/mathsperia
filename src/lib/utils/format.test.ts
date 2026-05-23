import { describe, it, expect } from 'vitest';
import { formatNumber, clamp, safeNumber, formatDate } from './format';

describe('formatNumber', () => {
	it('returns integer string for whole numbers', () => {
		expect(formatNumber(5)).toBe('5');
		expect(formatNumber(100)).toBe('100');
		expect(formatNumber(0)).toBe('0');
		expect(formatNumber(-3)).toBe('-3');
	});

	it('formats decimals with max 2 places by default', () => {
		expect(formatNumber(3.14159)).toBe('3.14');
		expect(formatNumber(2.5)).toBe('2.5');
		expect(formatNumber(0.99)).toBe('0.99');
	});

	it('removes trailing zeros', () => {
		expect(formatNumber(2.0)).toBe('2');
		expect(formatNumber(2.5)).toBe('2.5');
	});

	it('respects custom maxDecimals', () => {
		expect(formatNumber(3.14159, 4)).toBe('3.1416');
		expect(formatNumber(3.14159, 0)).toBe('3');
	});

	it('handles near-integer values as integers', () => {
		expect(formatNumber(5.00001)).toBe('5');
		expect(formatNumber(4.9999)).toBe('5');
	});
});

describe('clamp', () => {
	it('returns value within range', () => {
		expect(clamp(5, 0, 10)).toBe(5);
		expect(clamp(0, 0, 10)).toBe(0);
		expect(clamp(10, 0, 10)).toBe(10);
	});

	it('clamps below min', () => {
		expect(clamp(-5, 0, 10)).toBe(0);
		expect(clamp(-100, -10, 10)).toBe(-10);
	});

	it('clamps above max', () => {
		expect(clamp(15, 0, 10)).toBe(10);
		expect(clamp(100, -10, 10)).toBe(10);
	});
});

describe('safeNumber', () => {
	it('returns valid numbers', () => {
		expect(safeNumber(5)).toBe(5);
		expect(safeNumber(-3)).toBe(-3);
		expect(safeNumber(0)).toBe(0);
		expect(safeNumber(3.14)).toBe(3.14);
	});

	it('returns fallback for NaN', () => {
		expect(safeNumber(NaN)).toBe(0);
		expect(safeNumber(NaN, 42)).toBe(42);
	});

	it('returns fallback for Infinity', () => {
		expect(safeNumber(Infinity)).toBe(0);
		expect(safeNumber(-Infinity, 99)).toBe(99);
	});

	it('returns fallback for null/undefined', () => {
		expect(safeNumber(null as unknown as number)).toBe(0);
		expect(safeNumber(undefined as unknown as number, 7)).toBe(7);
	});
});

describe('formatDate', () => {
	it('returns just now for recent timestamps', () => {
		expect(formatDate(Date.now())).toBe('just now');
	});

	it('returns seconds ago', () => {
		expect(formatDate(Date.now() - 30_000)).toBe('30s ago');
	});

	it('returns minutes ago', () => {
		expect(formatDate(Date.now() - 120_000)).toBe('2m ago');
	});

	it('returns hours ago', () => {
		expect(formatDate(Date.now() - 3_600_000)).toBe('1h ago');
	});

	it('returns days ago', () => {
		expect(formatDate(Date.now() - 172_800_000)).toBe('2d ago');
	});

	it('returns date string for old timestamps', () => {
		const old = Date.now() - 30 * 24 * 60 * 60 * 1000;
		expect(formatDate(old)).toBe(new Date(old).toLocaleDateString());
	});
});
