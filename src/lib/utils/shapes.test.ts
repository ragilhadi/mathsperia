import { describe, it, expect } from 'vitest';
import {
	calculateCircle,
	calculateSquare,
	calculateRectangle,
	calculateEquilateralTriangle,
	calculateIsoscelesTriangle,
	calculateRightTriangle,
	calculateScaleneTriangle,
	calculateTrapezoid,
	calculateParallelogram,
	calculateEllipse,
	calculateRhombus,
	calculateKite
} from './shapes';

describe('2D shape calculations', () => {
	describe('calculateCircle', () => {
		it('calculates area and circumference for radius 1', () => {
			const result = calculateCircle(1);
			expect(result.area).toBeCloseTo(Math.PI, 5);
			expect(result.perimeter).toBeCloseTo(2 * Math.PI, 5);
		});

		it('calculates area and circumference for radius 5', () => {
			const result = calculateCircle(5);
			expect(result.area).toBeCloseTo(25 * Math.PI, 5);
			expect(result.perimeter).toBeCloseTo(10 * Math.PI, 5);
		});

		it('returns zero for radius 0', () => {
			const result = calculateCircle(0);
			expect(result.area).toBe(0);
			expect(result.perimeter).toBe(0);
		});
	});

	describe('calculateSquare', () => {
		it('calculates area and perimeter for side 4', () => {
			const result = calculateSquare(4);
			expect(result.area).toBe(16);
			expect(result.perimeter).toBe(16);
		});

		it('calculates area and perimeter for side 0', () => {
			const result = calculateSquare(0);
			expect(result.area).toBe(0);
			expect(result.perimeter).toBe(0);
		});
	});

	describe('calculateRectangle', () => {
		it('calculates area and perimeter', () => {
			const result = calculateRectangle(4, 3);
			expect(result.area).toBe(12);
			expect(result.perimeter).toBe(14);
		});
	});

	describe('calculateEquilateralTriangle', () => {
		it('calculates area and perimeter for side 2', () => {
			const result = calculateEquilateralTriangle(2);
			expect(result.perimeter).toBe(6);
			expect(result.area).toBeCloseTo(Math.sqrt(3), 5);
		});
	});

	describe('calculateRightTriangle', () => {
		it('calculates area and perimeter for 3-4-5 triangle', () => {
			const result = calculateRightTriangle(3, 4);
			expect(result.area).toBe(6);
			expect(result.perimeter).toBe(12); // 3 + 4 + 5
		});
	});

	describe('calculateScaleneTriangle', () => {
		it('calculates area using Herons formula for 3-4-5 triangle', () => {
			const result = calculateScaleneTriangle(3, 4, 5);
			expect(result.area).toBe(6);
			expect(result.perimeter).toBe(12);
		});

		it('returns NaN for invalid triangle', () => {
			const result = calculateScaleneTriangle(1, 1, 10);
			expect(Number.isNaN(result.area)).toBe(true);
		});
	});

	describe('calculateParallelogram', () => {
		it('calculates area and perimeter', () => {
			const result = calculateParallelogram(5, 3, 4);
			expect(result.area).toBe(15);
			expect(result.perimeter).toBe(18);
		});
	});

	describe('calculateRhombus', () => {
		it('calculates area from diagonals', () => {
			const result = calculateRhombus(6, 8);
			expect(result.area).toBe(24);
			expect(result.perimeter).toBeCloseTo(20, 5); // 4 * 5
		});
	});

	describe('calculateKite', () => {
		it('calculates area from diagonals', () => {
			const result = calculateKite(6, 8);
			expect(result.area).toBe(24);
			expect(result.perimeter).toBeCloseTo(20, 5);
		});
	});

	describe('calculateEllipse', () => {
		it('calculates area', () => {
			const result = calculateEllipse(3, 2);
			expect(result.area).toBeCloseTo(6 * Math.PI, 5);
			expect(result.perimeter).toBeGreaterThan(0);
		});
	});

	describe('calculateTrapezoid', () => {
		it('calculates area', () => {
			const result = calculateTrapezoid(4, 6, 3);
			expect(result.area).toBe(15);
			expect(result.perimeter).toBeGreaterThan(0);
		});
	});

	describe('calculateIsoscelesTriangle', () => {
		it('calculates area and perimeter', () => {
			const result = calculateIsoscelesTriangle(6, 5);
			expect(result.area).toBeCloseTo(12, 1);
			expect(result.perimeter).toBe(16);
		});
	});
});
