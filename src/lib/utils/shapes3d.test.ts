import { describe, it, expect } from 'vitest';
import {
	calculateCube,
	calculateRectangularPrism,
	calculateSphere,
	calculateCylinder,
	calculateCone,
	calculatePyramid,
	calculateTorus
} from './shapes3d';

describe('3D shape calculations', () => {
	describe('calculateCube', () => {
		it('calculates volume and area for side 3', () => {
			const result = calculateCube(3);
			expect(result.volume).toBeCloseTo(27, 5);
			expect(result.area).toBeCloseTo(54, 5);
			expect(result.formulas.volume).toBe('V = s^3');
			expect(result.formulas.area).toBe('A = 6s^2');
		});

		it('calculates volume and area for side 1', () => {
			const result = calculateCube(1);
			expect(result.volume).toBeCloseTo(1, 5);
			expect(result.area).toBeCloseTo(6, 5);
		});

		it('returns zero for side 0', () => {
			const result = calculateCube(0);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});
	});

	describe('calculateRectangularPrism', () => {
		it('calculates volume and area for 3x4x5', () => {
			const result = calculateRectangularPrism(3, 4, 5);
			expect(result.volume).toBeCloseTo(60, 5);
			expect(result.area).toBeCloseTo(2 * (3 * 4 + 3 * 5 + 4 * 5), 5);
			expect(result.formulas.volume).toBe('V = l \\times w \\times h');
			expect(result.formulas.area).toBe('A = 2(lw + lh + wh)');
		});

		it('calculates volume and area for 1x1x1', () => {
			const result = calculateRectangularPrism(1, 1, 1);
			expect(result.volume).toBeCloseTo(1, 5);
			expect(result.area).toBeCloseTo(6, 5);
		});

		it('returns zero when any dimension is 0', () => {
			const result = calculateRectangularPrism(0, 4, 5);
			expect(result.volume).toBe(0);
		});
	});

	describe('calculateSphere', () => {
		it('calculates volume and area for radius 1', () => {
			const result = calculateSphere(1);
			expect(result.volume).toBeCloseTo((4 / 3) * Math.PI, 5);
			expect(result.area).toBeCloseTo(4 * Math.PI, 5);
			expect(result.formulas.volume).toBe('V = \\frac{4}{3}\\pi r^3');
			expect(result.formulas.area).toBe('A = 4\\pi r^2');
		});

		it('calculates volume and area for radius 3', () => {
			const result = calculateSphere(3);
			expect(result.volume).toBeCloseTo((4 / 3) * Math.PI * 27, 5);
			expect(result.area).toBeCloseTo(4 * Math.PI * 9, 5);
		});

		it('returns zero for radius 0', () => {
			const result = calculateSphere(0);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});
	});

	describe('calculateCylinder', () => {
		it('calculates volume and area for radius 3 height 5', () => {
			const result = calculateCylinder(3, 5);
			expect(result.volume).toBeCloseTo(Math.PI * 9 * 5, 5);
			expect(result.area).toBeCloseTo(2 * Math.PI * 3 * (3 + 5), 5);
			expect(result.formulas.volume).toBe('V = \\pi r^2 h');
		});

		it('calculates volume and area for radius 1 height 1', () => {
			const result = calculateCylinder(1, 1);
			expect(result.volume).toBeCloseTo(Math.PI, 5);
			expect(result.area).toBeCloseTo(4 * Math.PI, 5);
		});

		it('returns zero when radius is 0', () => {
			const result = calculateCylinder(0, 5);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});

		it('returns zero when height is 0', () => {
			const result = calculateCylinder(3, 0);
			expect(result.volume).toBe(0);
		});
	});

	describe('calculateCone', () => {
		it('calculates volume and area for radius 3 height 4', () => {
			const result = calculateCone(3, 4);
			expect(result.volume).toBeCloseTo((1 / 3) * Math.PI * 9 * 4, 5);
			expect(result.area).toBeCloseTo(Math.PI * 3 * (3 + 5), 5);
			expect(result.formulas.volume).toBe('V = \\frac{1}{3}\\pi r^2 h');
		});

		it('calculates volume and area for radius 1 height 1', () => {
			const result = calculateCone(1, 1);
			expect(result.volume).toBeCloseTo(Math.PI / 3, 5);
			const slant = Math.sqrt(2);
			expect(result.area).toBeCloseTo(Math.PI * (1 + slant), 5);
		});

		it('returns zero when radius is 0', () => {
			const result = calculateCone(0, 4);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});

		it('returns zero when height is 0', () => {
			const result = calculateCone(3, 0);
			expect(result.volume).toBe(0);
		});
	});

	describe('calculatePyramid', () => {
		it('calculates volume and area for base 4 height 3', () => {
			const result = calculatePyramid(4, 3);
			expect(result.volume).toBeCloseTo((1 / 3) * 16 * 3, 5);
			const slantHeight = Math.sqrt(9 + 4);
			expect(result.area).toBeCloseTo(16 + 2 * 4 * slantHeight, 5);
			expect(result.formulas.volume).toBe('V = \\frac{1}{3}B h = \\frac{1}{3}s^2 h');
		});

		it('calculates volume and area for base 1 height 1', () => {
			const result = calculatePyramid(1, 1);
			expect(result.volume).toBeCloseTo(1 / 3, 5);
			const slantHeight = Math.sqrt(1 + 0.25);
			expect(result.area).toBeCloseTo(1 + 2 * slantHeight, 5);
		});

		it('returns zero when base is 0', () => {
			const result = calculatePyramid(0, 3);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});

		it('returns zero when height is 0', () => {
			const result = calculatePyramid(4, 0);
			expect(result.volume).toBe(0);
		});
	});

	describe('calculateTorus', () => {
		it('calculates volume and area for major 3 minor 1', () => {
			const result = calculateTorus(3, 1);
			expect(result.volume).toBeCloseTo(2 * Math.PI ** 2 * 3 * 1, 5);
			expect(result.area).toBeCloseTo(4 * Math.PI ** 2 * 3 * 1, 5);
			expect(result.formulas.volume).toBe('V = 2\\pi^2 R r^2');
			expect(result.formulas.area).toBe('A = 4\\pi^2 R r');
		});

		it('calculates volume and area for major 5 minor 2', () => {
			const result = calculateTorus(5, 2);
			expect(result.volume).toBeCloseTo(2 * Math.PI ** 2 * 5 * 4, 5);
			expect(result.area).toBeCloseTo(4 * Math.PI ** 2 * 5 * 2, 5);
		});

		it('returns zero when minor radius is 0', () => {
			const result = calculateTorus(5, 0);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});

		it('returns zero when major radius is 0', () => {
			const result = calculateTorus(0, 2);
			expect(result.volume).toBe(0);
			expect(result.area).toBe(0);
		});
	});
});
