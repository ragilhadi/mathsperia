import { describe, it, expect } from 'vitest';
import {
	calculateDistance,
	distanceSteps,
	calculateMidpoint,
	midpointSteps,
	calculateSlope,
	slopeSteps,
	calculateShoelaceArea,
	shoelaceSteps
} from './coordinateGeometry';

describe('coordinate geometry', () => {
	describe('calculateDistance', () => {
		it('calculates distance between (0,0) and (3,4) as 5', () => {
			const result = calculateDistance(0, 0, 3, 4);
			expect(result.value).toBeCloseTo(5, 5);
		});

		it('returns 0 for same point', () => {
			const result = calculateDistance(2, 3, 2, 3);
			expect(result.value).toBe(0);
		});

		it('includes formula in result', () => {
			const result = calculateDistance(0, 0, 3, 4);
			expect(result.formula).toContain('sqrt');
		});
	});

	describe('distanceSteps', () => {
		it('returns array of steps', () => {
			const steps = distanceSteps(0, 0, 3, 4, 5);
			expect(steps.length).toBeGreaterThan(0);
			expect(steps[0]).toContain('sqrt');
		});
	});

	describe('calculateMidpoint', () => {
		it('calculates midpoint of (0,0) and (4,6) as (2,3)', () => {
			const result = calculateMidpoint(0, 0, 4, 6);
			expect(result.x.value).toBeCloseTo(2, 5);
			expect(result.y.value).toBeCloseTo(3, 5);
		});

		it('includes formulas in result', () => {
			const result = calculateMidpoint(0, 0, 4, 6);
			expect(result.x.formula).toContain('frac');
			expect(result.y.formula).toContain('frac');
		});
	});

	describe('midpointSteps', () => {
		it('returns array of steps', () => {
			const steps = midpointSteps(0, 0, 4, 6, 2, 3);
			expect(steps.length).toBeGreaterThan(0);
		});
	});

	describe('calculateSlope', () => {
		it('calculates slope of (0,0) and (1,1) as 1', () => {
			const result = calculateSlope(0, 0, 1, 1);
			expect(result.slope.value).toBeCloseTo(1, 5);
		});

		it('returns infinity for vertical line', () => {
			const result = calculateSlope(2, 0, 2, 5);
			expect(result.slope.value).toBe(Infinity);
		});

		it('returns vertical line equation for vertical line', () => {
			const result = calculateSlope(2, 0, 2, 5);
			expect(result.equation).toBe('x = 2');
		});

		it('returns slope formula in result', () => {
			const result = calculateSlope(0, 0, 1, 1);
			expect(result.slope.formula).toContain('frac');
		});
	});

	describe('slopeSteps', () => {
		it('returns array of steps', () => {
			const steps = slopeSteps(0, 0, 1, 1, 1, 'y = 1.0000x + 0.0000');
			expect(steps.length).toBeGreaterThan(0);
		});

		it('includes vertical line step for vertical slope', () => {
			const steps = slopeSteps(2, 0, 2, 5, Infinity, '');
			expect(steps.some((s) => s.includes('Vertical'))).toBe(true);
		});
	});

	describe('calculateShoelaceArea', () => {
		it('calculates area of triangle (0,0), (4,0), (0,3) as 6', () => {
			const result = calculateShoelaceArea([
				{ x: 0, y: 0 },
				{ x: 4, y: 0 },
				{ x: 0, y: 3 }
			]);
			expect(result.value).toBeCloseTo(6, 5);
		});

		it('returns 0 for less than 3 coordinates', () => {
			const result = calculateShoelaceArea([
				{ x: 0, y: 0 },
				{ x: 1, y: 1 }
			]);
			expect(result.value).toBe(0);
		});

		it('returns 0 for single coordinate', () => {
			const result = calculateShoelaceArea([{ x: 0, y: 0 }]);
			expect(result.value).toBe(0);
		});

		it('includes formula in result', () => {
			const result = calculateShoelaceArea([
				{ x: 0, y: 0 },
				{ x: 4, y: 0 },
				{ x: 0, y: 3 }
			]);
			expect(result.formula).toContain('frac');
		});
	});

	describe('shoelaceSteps', () => {
		it('returns array of steps', () => {
			const steps = shoelaceSteps(
				[
					{ x: 0, y: 0 },
					{ x: 4, y: 0 },
					{ x: 0, y: 3 }
				],
				6
			);
			expect(steps.length).toBeGreaterThan(0);
		});
	});
});
