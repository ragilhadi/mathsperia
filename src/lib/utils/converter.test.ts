import { describe, it, expect } from 'vitest';
import { convertAngle, convertLength, convertArea, convertVolume } from './converter';

describe('convertAngle', () => {
	describe('identity', () => {
		it('returns same degrees when from is deg', () => {
			const result = convertAngle(90, 'deg');
			expect(result.degrees).toBe(90);
		});

		it('returns same radians when from is rad', () => {
			const result = convertAngle(Math.PI / 4, 'rad');
			expect(result.radians).toBeCloseTo(Math.PI / 4, 10);
		});

		it('returns same gradians when from is grad', () => {
			const result = convertAngle(100, 'grad');
			expect(result.gradians).toBe(100);
		});
	});

	describe('degrees conversions', () => {
		it('converts 180 degrees to radians', () => {
			const result = convertAngle(180, 'deg');
			expect(result.radians).toBeCloseTo(Math.PI, 10);
		});

		it('converts 90 degrees to gradians', () => {
			const result = convertAngle(90, 'deg');
			expect(result.gradians).toBeCloseTo(100, 5);
		});

		it('converts 0 degrees', () => {
			const result = convertAngle(0, 'deg');
			expect(result.degrees).toBe(0);
			expect(result.radians).toBe(0);
			expect(result.gradians).toBe(0);
		});
	});

	describe('radians conversions', () => {
		it('converts pi radians to degrees', () => {
			const result = convertAngle(Math.PI, 'rad');
			expect(result.degrees).toBeCloseTo(180, 5);
		});

		it('converts pi/2 radians to gradians', () => {
			const result = convertAngle(Math.PI / 2, 'rad');
			expect(result.gradians).toBeCloseTo(100, 5);
		});
	});

	describe('gradians conversions', () => {
		it('converts 100 gradians to degrees', () => {
			const result = convertAngle(100, 'grad');
			expect(result.degrees).toBeCloseTo(90, 5);
		});

		it('converts 200 gradians to radians', () => {
			const result = convertAngle(200, 'grad');
			expect(result.radians).toBeCloseTo(Math.PI, 5);
		});
	});

	describe('round-trip', () => {
		it('deg → rad → deg returns original', () => {
			const original = 45;
			const radResult = convertAngle(original, 'deg');
			const backResult = convertAngle(radResult.radians, 'rad');
			expect(backResult.degrees).toBeCloseTo(original, 10);
		});

		it('grad → deg → grad returns original', () => {
			const original = 250;
			const degResult = convertAngle(original, 'grad');
			const backResult = convertAngle(degResult.degrees, 'deg');
			expect(backResult.gradians).toBeCloseTo(original, 5);
		});
	});
});

describe('convertLength', () => {
	describe('identity', () => {
		it('returns same value when from and to are same', () => {
			expect(convertLength(5, 'm', 'm')).toBe(5);
			expect(convertLength(3, 'cm', 'cm')).toBe(3);
			expect(convertLength(10, 'km', 'km')).toBe(10);
		});
	});

	describe('common conversions', () => {
		it('converts cm to m', () => {
			expect(convertLength(100, 'cm', 'm')).toBeCloseTo(1, 10);
		});

		it('converts m to km', () => {
			expect(convertLength(1000, 'm', 'km')).toBeCloseTo(1, 10);
		});

		it('converts km to m', () => {
			expect(convertLength(1, 'km', 'm')).toBeCloseTo(1000, 5);
		});

		it('converts mm to cm', () => {
			expect(convertLength(10, 'mm', 'cm')).toBeCloseTo(1, 5);
		});

		it('converts in to ft', () => {
			expect(convertLength(12, 'in', 'ft')).toBeCloseTo(1, 5);
		});

		it('converts ft to yd', () => {
			expect(convertLength(3, 'ft', 'yd')).toBeCloseTo(1, 5);
		});

		it('converts yd to mi', () => {
			expect(convertLength(1760, 'yd', 'mi')).toBeCloseTo(1, 3);
		});

		it('converts mi to km', () => {
			expect(convertLength(1, 'mi', 'km')).toBeCloseTo(1.609344, 5);
		});
	});

	describe('round-trip', () => {
		it('m → km → m returns original', () => {
			const original = 5.5;
			const km = convertLength(original, 'm', 'km');
			expect(convertLength(km, 'km', 'm')).toBeCloseTo(original, 10);
		});

		it('in → cm → in returns original', () => {
			const original = 7;
			const cm = convertLength(original, 'in', 'cm');
			expect(convertLength(cm, 'cm', 'in')).toBeCloseTo(original, 5);
		});
	});

	describe('edge cases', () => {
		it('converts 0', () => {
			expect(convertLength(0, 'm', 'km')).toBe(0);
		});

		it('handles large values', () => {
			expect(convertLength(1000000, 'mm', 'km')).toBeCloseTo(1, 5);
		});
	});
});

describe('convertArea', () => {
	describe('identity', () => {
		it('returns same value when from and to are same', () => {
			expect(convertArea(5, 'm²', 'm²')).toBe(5);
			expect(convertArea(3, 'cm²', 'cm²')).toBe(3);
		});
	});

	describe('common conversions', () => {
		it('converts cm² to m²', () => {
			expect(convertArea(10000, 'cm²', 'm²')).toBeCloseTo(1, 5);
		});

		it('converts m² to km²', () => {
			expect(convertArea(1000000, 'm²', 'km²')).toBeCloseTo(1, 5);
		});

		it('converts ha to m²', () => {
			expect(convertArea(1, 'ha', 'm²')).toBeCloseTo(10000, 5);
		});

		it('converts acre to m²', () => {
			expect(convertArea(1, 'acre', 'm²')).toBeCloseTo(4046.86, 2);
		});

		it('converts ft² to yd²', () => {
			expect(convertArea(9, 'ft²', 'yd²')).toBeCloseTo(1, 3);
		});

		it('converts mm² to cm²', () => {
			expect(convertArea(100, 'mm²', 'cm²')).toBeCloseTo(1, 5);
		});
	});

	describe('round-trip', () => {
		it('m² → ha → m² returns original', () => {
			const original = 5000;
			const ha = convertArea(original, 'm²', 'ha');
			expect(convertArea(ha, 'ha', 'm²')).toBeCloseTo(original, 3);
		});

		it('acre → m² → acre returns original', () => {
			const original = 2.5;
			const m2 = convertArea(original, 'acre', 'm²');
			expect(convertArea(m2, 'm²', 'acre')).toBeCloseTo(original, 3);
		});
	});

	describe('edge cases', () => {
		it('converts 0', () => {
			expect(convertArea(0, 'm²', 'km²')).toBe(0);
		});
	});
});

describe('convertVolume', () => {
	describe('identity', () => {
		it('returns same value when from and to are same', () => {
			expect(convertVolume(5, 'm³', 'm³')).toBe(5);
			expect(convertVolume(3, 'L', 'L')).toBe(3);
		});
	});

	describe('common conversions', () => {
		it('converts L to m³', () => {
			expect(convertVolume(1000, 'L', 'm³')).toBeCloseTo(1, 5);
		});

		it('converts m³ to L', () => {
			expect(convertVolume(1, 'm³', 'L')).toBeCloseTo(1000, 5);
		});

		it('converts mL to L', () => {
			expect(convertVolume(1000, 'mL', 'L')).toBeCloseTo(1, 5);
		});

		it('converts gal to L', () => {
			expect(convertVolume(1, 'gal', 'L')).toBeCloseTo(3.785, 2);
		});

		it('converts cm³ to mL', () => {
			expect(convertVolume(1, 'cm³', 'mL')).toBeCloseTo(1, 5);
		});

		it('converts km³ to m³', () => {
			expect(convertVolume(1, 'km³', 'm³')).toBeCloseTo(1e9, 0);
		});
	});

	describe('round-trip', () => {
		it('L → gal → L returns original', () => {
			const original = 10;
			const gal = convertVolume(original, 'L', 'gal');
			expect(convertVolume(gal, 'gal', 'L')).toBeCloseTo(original, 3);
		});

		it('m³ → ft³ → m³ returns original', () => {
			const original = 5;
			const ft3 = convertVolume(original, 'm³', 'ft³');
			expect(convertVolume(ft3, 'ft³', 'm³')).toBeCloseTo(original, 3);
		});
	});

	describe('edge cases', () => {
		it('converts 0', () => {
			expect(convertVolume(0, 'm³', 'L')).toBe(0);
		});
	});
});
