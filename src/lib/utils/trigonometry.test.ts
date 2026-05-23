import { describe, it, expect } from 'vitest';
import { solveRightTriangle, COMMON_ANGLES, getUnitCirclePoint } from './trigonometry';

describe('trigonometry', () => {
	describe('solveRightTriangle', () => {
		it('returns null when knownAngle is null', () => {
			const result = solveRightTriangle(null, { type: 'opposite', value: 5 });
			expect(result).toBeNull();
		});

		it('returns null when knownSide is null', () => {
			const result = solveRightTriangle(30, null);
			expect(result).toBeNull();
		});

		it('returns null when both inputs are null', () => {
			const result = solveRightTriangle(null, null);
			expect(result).toBeNull();
		});

		it('solves triangle with angle 30 and opposite side 5', () => {
			const result = solveRightTriangle(30, { type: 'opposite', value: 5 });
			expect(result).not.toBeNull();
			expect(result!.sine).toBeCloseTo(0.5, 5);
			expect(result!.cosine).toBeCloseTo(Math.sqrt(3) / 2, 5);
			expect(result!.tangent).toBeCloseTo(1 / Math.sqrt(3), 5);
			expect(result!.sides!.opposite).toBeCloseTo(5, 5);
			expect(result!.sides!.hypotenuse).toBeCloseTo(10, 5);
		});

		it('solves triangle with angle 45 and hypotenuse 10', () => {
			const result = solveRightTriangle(45, { type: 'hypotenuse', value: 10 });
			expect(result).not.toBeNull();
			expect(result!.sine).toBeCloseTo(Math.sqrt(2) / 2, 5);
			expect(result!.cosine).toBeCloseTo(Math.sqrt(2) / 2, 5);
			expect(result!.tangent).toBeCloseTo(1, 5);
			expect(result!.sides!.hypotenuse).toBeCloseTo(10, 5);
			expect(result!.sides!.opposite).toBeCloseTo((10 * Math.sqrt(2)) / 2, 5);
		});

		it('solves triangle with angle 60 and adjacent side 5', () => {
			const result = solveRightTriangle(60, { type: 'adjacent', value: 5 });
			expect(result).not.toBeNull();
			expect(result!.sine).toBeCloseTo(Math.sqrt(3) / 2, 5);
			expect(result!.cosine).toBeCloseTo(0.5, 5);
			expect(result!.tangent).toBeCloseTo(Math.sqrt(3), 5);
			expect(result!.sides!.adjacent).toBeCloseTo(5, 5);
			expect(result!.sides!.opposite).toBeCloseTo(5 * Math.sqrt(3), 5);
		});

		it('calculates angles correctly', () => {
			const result = solveRightTriangle(30, { type: 'opposite', value: 5 });
			expect(result!.angles!.A).toBe(30);
			expect(result!.angles!.B).toBe(60);
			expect(result!.angles!.C).toBe(90);
		});
	});

	describe('COMMON_ANGLES', () => {
		it('has 17 entries', () => {
			expect(COMMON_ANGLES).toHaveLength(17);
		});

		it('includes 0 degrees', () => {
			const entry = COMMON_ANGLES.find((e) => e.degrees === 0);
			expect(entry).toBeDefined();
			expect(entry!.sin).toBe(0);
			expect(entry!.cos).toBe(1);
			expect(entry!.tan).toBe(0);
		});

		it('includes 90 degrees', () => {
			const entry = COMMON_ANGLES.find((e) => e.degrees === 90);
			expect(entry).toBeDefined();
			expect(entry!.sin).toBe(1);
			expect(entry!.cos).toBe(0);
		});
	});

	describe('getUnitCirclePoint', () => {
		it('returns (1, 0) for 0 degrees', () => {
			const point = getUnitCirclePoint(0);
			expect(point.x).toBeCloseTo(1, 5);
			expect(point.y).toBeCloseTo(0, 5);
		});

		it('returns (0, 1) for 90 degrees', () => {
			const point = getUnitCirclePoint(90);
			expect(point.x).toBeCloseTo(0, 5);
			expect(point.y).toBeCloseTo(1, 5);
		});

		it('returns (-1, 0) for 180 degrees', () => {
			const point = getUnitCirclePoint(180);
			expect(point.x).toBeCloseTo(-1, 5);
			expect(point.y).toBeCloseTo(0, 5);
		});

		it('returns (1, 0) for 360 degrees', () => {
			const point = getUnitCirclePoint(360);
			expect(point.x).toBeCloseTo(1, 5);
			expect(point.y).toBeCloseTo(0, 5);
		});
	});
});
