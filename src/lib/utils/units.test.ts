import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	toBase,
	fromBase,
	convert,
	getLastUnit,
	setLastUnit,
	formatLength,
	formatArea,
	areaUnitLabel,
	volumeUnitLabel,
	convertValue,
	convertAreaValue,
	convertVolumeValue
} from './units';

let store: Record<string, string> = {};

const localStorageMock = {
	getItem: (key: string) => store[key] ?? null,
	setItem: (key: string, value: string) => {
		store[key] = value;
	},
	removeItem: (key: string) => {
		delete store[key];
	},
	clear: () => {
		store = {};
	}
};

describe('unit conversions', () => {
	describe('toBase', () => {
		it('converts mm to cm', () => {
			expect(toBase(10, 'mm')).toBeCloseTo(1, 10);
		});

		it('converts cm to cm', () => {
			expect(toBase(5, 'cm')).toBe(5);
		});

		it('converts m to cm', () => {
			expect(toBase(2, 'm')).toBe(200);
		});

		it('converts km to cm', () => {
			expect(toBase(1, 'km')).toBe(100000);
		});

		it('converts in to cm', () => {
			expect(toBase(1, 'in')).toBeCloseTo(2.54, 10);
		});

		it('converts ft to cm', () => {
			expect(toBase(1, 'ft')).toBeCloseTo(30.48, 10);
		});

		it('converts yd to cm', () => {
			expect(toBase(1, 'yd')).toBeCloseTo(91.44, 10);
		});

		it('returns 0 for value 0', () => {
			expect(toBase(0, 'm')).toBe(0);
		});
	});

	describe('fromBase', () => {
		it('converts cm to mm', () => {
			expect(fromBase(1, 'mm')).toBeCloseTo(10, 10);
		});

		it('converts cm to cm', () => {
			expect(fromBase(5, 'cm')).toBe(5);
		});

		it('converts cm to m', () => {
			expect(fromBase(200, 'm')).toBeCloseTo(2, 10);
		});

		it('converts cm to km', () => {
			expect(fromBase(100000, 'km')).toBeCloseTo(1, 10);
		});

		it('converts cm to in', () => {
			expect(fromBase(2.54, 'in')).toBeCloseTo(1, 10);
		});

		it('converts cm to ft', () => {
			expect(fromBase(30.48, 'ft')).toBeCloseTo(1, 10);
		});

		it('converts cm to yd', () => {
			expect(fromBase(91.44, 'yd')).toBeCloseTo(1, 10);
		});

		it('returns 0 for value 0', () => {
			expect(fromBase(0, 'm')).toBe(0);
		});
	});

	describe('convert', () => {
		it('returns same value when units are equal', () => {
			expect(convert(10, 'cm', 'cm')).toBe(10);
		});

		it('converts m to km', () => {
			expect(convert(1000, 'm', 'km')).toBeCloseTo(1, 10);
		});

		it('converts in to ft', () => {
			expect(convert(12, 'in', 'ft')).toBeCloseTo(1, 10);
		});

		it('converts yd to m', () => {
			expect(convert(1, 'yd', 'm')).toBeCloseTo(0.9144, 4);
		});

		it('converts mm to km', () => {
			expect(convert(1000000, 'mm', 'km')).toBeCloseTo(1, 10);
		});

		it('converts ft to in', () => {
			expect(convert(1, 'ft', 'in')).toBeCloseTo(12, 10);
		});
	});

	describe('convertValue', () => {
		it('returns same value when units are equal', () => {
			expect(convertValue(5, 'm', 'm')).toBe(5);
		});

		it('delegates to convert for different units', () => {
			expect(convertValue(100, 'cm', 'm')).toBeCloseTo(1, 10);
		});
	});

	describe('convertAreaValue', () => {
		it('returns same value when units are equal', () => {
			expect(convertAreaValue(25, 'm', 'm')).toBe(25);
		});

		it('converts area from m to cm', () => {
			expect(convertAreaValue(1, 'm', 'cm')).toBeCloseTo(10000, 5);
		});

		it('converts area from cm to m', () => {
			expect(convertAreaValue(10000, 'cm', 'm')).toBeCloseTo(1, 5);
		});

		it('converts area from ft to in', () => {
			expect(convertAreaValue(1, 'ft', 'in')).toBeCloseTo(144, 5);
		});

		it('converts area from km to m', () => {
			expect(convertAreaValue(1, 'km', 'm')).toBeCloseTo(1000000, 0);
		});
	});

	describe('convertVolumeValue', () => {
		it('returns same value when units are equal', () => {
			expect(convertVolumeValue(8, 'm', 'm')).toBe(8);
		});

		it('converts volume from m to cm', () => {
			expect(convertVolumeValue(1, 'm', 'cm')).toBeCloseTo(1000000, 0);
		});

		it('converts volume from cm to m', () => {
			expect(convertVolumeValue(1000000, 'cm', 'm')).toBeCloseTo(1, 5);
		});

		it('converts volume from ft to in', () => {
			expect(convertVolumeValue(1, 'ft', 'in')).toBeCloseTo(1728, 5);
		});

		it('converts volume from km to m', () => {
			expect(convertVolumeValue(1, 'km', 'm')).toBeCloseTo(1000000000, -2);
		});
	});

	describe('formatLength', () => {
		it('formats integer length', () => {
			expect(formatLength(5, 'cm')).toBe('5 cm');
		});

		it('formats decimal length', () => {
			expect(formatLength(2.5, 'm')).toBe('2.5 m');
		});

		it('formats with km unit', () => {
			expect(formatLength(100, 'km')).toBe('100 km');
		});
	});

	describe('formatArea', () => {
		it('formats integer area', () => {
			expect(formatArea(25, 'cm')).toBe('25 cm\u00B2');
		});

		it('formats decimal area', () => {
			expect(formatArea(1.5, 'm')).toBe('1.5 m\u00B2');
		});
	});

	describe('areaUnitLabel', () => {
		it('returns squared label for cm', () => {
			expect(areaUnitLabel('cm')).toBe('cm\u00B2');
		});

		it('returns squared label for m', () => {
			expect(areaUnitLabel('m')).toBe('m\u00B2');
		});

		it('returns squared label for km', () => {
			expect(areaUnitLabel('km')).toBe('km\u00B2');
		});

		it('returns squared label for mm', () => {
			expect(areaUnitLabel('mm')).toBe('mm\u00B2');
		});

		it('returns squared label for in', () => {
			expect(areaUnitLabel('in')).toBe('in\u00B2');
		});

		it('returns squared label for ft', () => {
			expect(areaUnitLabel('ft')).toBe('ft\u00B2');
		});

		it('returns squared label for yd', () => {
			expect(areaUnitLabel('yd')).toBe('yd\u00B2');
		});
	});

	describe('volumeUnitLabel', () => {
		it('returns cubed label for cm', () => {
			expect(volumeUnitLabel('cm')).toBe('cm\u00B3');
		});

		it('returns cubed label for m', () => {
			expect(volumeUnitLabel('m')).toBe('m\u00B3');
		});

		it('returns cubed label for km', () => {
			expect(volumeUnitLabel('km')).toBe('km\u00B3');
		});

		it('returns cubed label for mm', () => {
			expect(volumeUnitLabel('mm')).toBe('mm\u00B3');
		});

		it('returns cubed label for in', () => {
			expect(volumeUnitLabel('in')).toBe('in\u00B3');
		});

		it('returns cubed label for ft', () => {
			expect(volumeUnitLabel('ft')).toBe('ft\u00B3');
		});

		it('returns cubed label for yd', () => {
			expect(volumeUnitLabel('yd')).toBe('yd\u00B3');
		});
	});

	describe('getLastUnit', () => {
		beforeEach(() => {
			store = {};
			vi.stubGlobal('localStorage', localStorageMock);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('returns cm when localStorage is empty', () => {
			expect(getLastUnit()).toBe('cm');
		});

		it('returns saved unit from localStorage', () => {
			localStorage.setItem('mathsperia:lastUnit', 'm');
			expect(getLastUnit()).toBe('m');
		});

		it('returns cm for invalid saved unit', () => {
			localStorage.setItem('mathsperia:lastUnit', 'invalid');
			expect(getLastUnit()).toBe('cm');
		});

		it('returns saved unit for each valid unit', () => {
			const units = ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd'];
			for (const unit of units) {
				localStorage.setItem('mathsperia:lastUnit', unit);
				expect(getLastUnit()).toBe(unit);
			}
		});

		it('returns cm when localStorage is unavailable', () => {
			vi.stubGlobal('localStorage', undefined);
			expect(getLastUnit()).toBe('cm');
		});
	});

	describe('setLastUnit', () => {
		beforeEach(() => {
			store = {};
			vi.stubGlobal('localStorage', localStorageMock);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('saves unit to localStorage', () => {
			setLastUnit('m');
			expect(localStorage.getItem('mathsperia:lastUnit')).toBe('m');
		});

		it('overwrites previous unit', () => {
			setLastUnit('m');
			setLastUnit('ft');
			expect(localStorage.getItem('mathsperia:lastUnit')).toBe('ft');
		});

		it('does not throw when localStorage is unavailable', () => {
			vi.stubGlobal('localStorage', undefined);
			expect(() => setLastUnit('m')).not.toThrow();
		});
	});
});
