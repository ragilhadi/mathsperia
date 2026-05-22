import { safeNumber } from './format';

export interface CoordinateResult {
	value: number;
	formula: string;
}

export function calculateDistance(
	x1: number,
	y1: number,
	x2: number,
	y2: number
): CoordinateResult {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const dist = Math.sqrt(dx * dx + dy * dy);
	return {
		value: safeNumber(dist),
		formula: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}'
	};
}

export function distanceSteps(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	result: number
): string[] {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const dxForm = x2 - x1;
	const dyForm = y2 - y1;
	return [
		`d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`,
		`d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2}`,
		`d = \\sqrt{(${dxForm})^2 + (${dyForm})^2}`,
		`d = \\sqrt{${(dx * dx).toFixed(2)} + ${(dy * dy).toFixed(2)}}`,
		`d = \\sqrt{${(dx * dx + dy * dy).toFixed(2)}}`,
		`d \\approx ${result.toFixed(4)}`
	];
}

export function calculateMidpoint(
	x1: number,
	y1: number,
	x2: number,
	y2: number
): { x: CoordinateResult; y: CoordinateResult } {
	const mx = (x1 + x2) / 2;
	const my = (y1 + y2) / 2;
	return {
		x: {
			value: safeNumber(mx),
			formula: 'M_x = \\frac{x_1 + x_2}{2}'
		},
		y: {
			value: safeNumber(my),
			formula: 'M_y = \\frac{y_1 + y_2}{2}'
		}
	};
}

export function midpointSteps(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	mx: number,
	my: number
): string[] {
	return [
		`M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)`,
		`M = \\left(\\frac{${x1} + ${x2}}{2}, \\frac{${y1} + ${y2}}{2}\\right)`,
		`M = \\left(\\frac{${x1 + x2}}{2}, \\frac{${y1 + y2}}{2}\\right)`,
		`M \\approx (${mx.toFixed(4)}, ${my.toFixed(4)})`
	];
}

export function calculateSlope(
	x1: number,
	y1: number,
	x2: number,
	y2: number
): { slope: CoordinateResult; equation: string } {
	const dx = x2 - x1;
	const dy = y2 - y1;
	if (Math.abs(dx) < 0.0001) {
		return {
			slope: {
				value: dx === 0 ? (dy >= 0 ? Infinity : -Infinity) : safeNumber(dy / dx),
				formula: 'm = \\frac{y_2 - y_1}{x_2 - x_1}'
			},
			equation: dx === 0 ? `x = ${x1}` : ''
		};
	}
	const m = dy / dx;
	const b = y1 - m * x1;
	const bSign = b >= 0 ? '+' : '-';
	const bAbs = Math.abs(b);
	return {
		slope: {
			value: safeNumber(m),
			formula: 'm = \\frac{y_2 - y_1}{x_2 - x_1}'
		},
		equation: `y = ${m.toFixed(4)}x ${bSign} ${bAbs.toFixed(4)}`
	};
}

export function slopeSteps(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	slope: number,
	equation: string
): string[] {
	const dy = y2 - y1;
	const dx = x2 - x1;
	const steps: string[] = [
		`m = \\frac{y_2 - y_1}{x_2 - x_1}`,
		`m = \\frac{${y2} - ${y1}}{${x2} - ${x1}}`,
		`m = \\frac{${dy}}{${dx}}`
	];
	if (Math.abs(dx) < 0.0001) {
		steps.push(`\\text{Vertical line: } x = ${x1}`);
	} else {
		steps.push(`m \\approx ${slope.toFixed(4)}`);
		if (equation) {
			steps.push(`\\text{Equation: } ${equation}`);
		}
	}
	return steps;
}

export function calculateShoelaceArea(coordinates: { x: number; y: number }[]): CoordinateResult {
	const n = coordinates.length;
	if (n < 3) return { value: 0, formula: 'A = \\frac{1}{2}|\\sum_{i=1}^{n}(x_i y_{i+1} - x_{i+1} y_i)|' };
	let sum = 0;
	for (let i = 0; i < n; i++) {
		const j = (i + 1) % n;
		sum += coordinates[i].x * coordinates[j].y;
		sum -= coordinates[j].x * coordinates[i].y;
	}
	const area = Math.abs(sum) / 2;
	return {
		value: safeNumber(area),
		formula: 'A = \\frac{1}{2}|\\sum_{i=1}^{n}(x_i y_{i+1} - x_{i+1} y_i)|'
	};
}

export function shoelaceSteps(coordinates: { x: number; y: number }[], result: number): string[] {
	const n = coordinates.length;
	const steps: string[] = ['A = \\frac{1}{2}|\\sum_{i=1}^{n}(x_i y_{i+1} - x_{i+1} y_i)|'];

	let posSum = 0;
	let negSum = 0;
	for (let i = 0; i < n; i++) {
		const j = (i + n + 1) % n;
		const term = coordinates[i].x * coordinates[j].y - coordinates[j].x * coordinates[i].y;
		steps.push(
			`(${coordinates[i].x})( ${coordinates[j].y}) - (${coordinates[j].x})(${coordinates[i].y}) = ${term.toFixed(2)}`
		);
		posSum += coordinates[i].x * coordinates[j].y;
		negSum += coordinates[j].x * coordinates[i].y;
	}

	steps.push(`\\text{Positive sum} = ${posSum.toFixed(2)}`);
	steps.push(`\\text{Negative sum} = ${negSum.toFixed(2)}`);
	steps.push(`\\text{Cross sum} = ${Math.abs(posSum - negSum).toFixed(2)}`);
	steps.push(`A = \\frac{1}{2} \\times ${Math.abs(posSum - negSum).toFixed(2)} = ${result.toFixed(4)}`);

	return steps;
}