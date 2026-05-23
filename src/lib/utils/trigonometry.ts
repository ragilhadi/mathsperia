import { safeNumber } from './format';

export interface TrigResult {
	sine: number;
	cosine: number;
	tangent: number;
	cosecant: number;
	secant: number;
	cotangent: number;
	sides?: {
		opposite: number;
		adjacent: number;
		hypotenuse: number;
	};
	angles?: {
		A: number;
		B: number;
		C: number;
	};
}

export function solveRightTriangle(
	knownAngle: number | null,
	knownSide: { type: 'opposite' | 'adjacent' | 'hypotenuse'; value: number } | null
): TrigResult | null {
	if (knownAngle === null || knownSide === null) return null;

	const angleRad = (knownAngle * Math.PI) / 180;
	const compRad = ((90 - knownAngle) * Math.PI) / 180;

	let opposite: number;
	let adjacent: number;
	let hypotenuse: number;

	switch (knownSide.type) {
		case 'opposite':
			opposite = knownSide.value;
			hypotenuse = opposite / Math.sin(angleRad);
			adjacent = opposite / Math.tan(angleRad);
			break;
		case 'adjacent':
			adjacent = knownSide.value;
			hypotenuse = adjacent / Math.cos(angleRad);
			opposite = adjacent * Math.tan(angleRad);
			break;
		case 'hypotenuse':
			hypotenuse = knownSide.value;
			opposite = hypotenuse * Math.sin(angleRad);
			adjacent = hypotenuse * Math.cos(angleRad);
			break;
		default:
			return null;
	}

	return {
		sine: safeNumber(Math.sin(angleRad)),
		cosine: safeNumber(Math.cos(angleRad)),
		tangent: safeNumber(Math.tan(angleRad)),
		cosecant: safeNumber(1 / Math.sin(angleRad)),
		secant: safeNumber(1 / Math.cos(angleRad)),
		cotangent: safeNumber(1 / Math.tan(angleRad)),
		sides: {
			opposite: safeNumber(opposite),
			adjacent: safeNumber(adjacent),
			hypotenuse: safeNumber(hypotenuse)
		},
		angles: {
			A: knownAngle,
			B: 90 - knownAngle,
			C: 90
		}
	};
}

export interface TrigTableEntry {
	degrees: number;
	radians: string;
	sin: number;
	cos: number;
	tan: number;
}

export const COMMON_ANGLES: TrigTableEntry[] = [
	{ degrees: 0, radians: '0', sin: 0, cos: 1, tan: 0 },
	{
		degrees: 30,
		radians: '\\frac{\\pi}{6}',
		sin: 0.5,
		cos: Math.sqrt(3) / 2,
		tan: Math.sqrt(3) / 3
	},
	{ degrees: 45, radians: '\\frac{\\pi}{4}', sin: Math.sqrt(2) / 2, cos: Math.sqrt(2) / 2, tan: 1 },
	{ degrees: 60, radians: '\\frac{\\pi}{3}', sin: Math.sqrt(3) / 2, cos: 0.5, tan: Math.sqrt(3) },
	{ degrees: 90, radians: '\\frac{\\pi}{2}', sin: 1, cos: 0, tan: Infinity },
	{
		degrees: 120,
		radians: '\\frac{2\\pi}{3}',
		sin: Math.sqrt(3) / 2,
		cos: -0.5,
		tan: -Math.sqrt(3)
	},
	{
		degrees: 135,
		radians: '\\frac{3\\pi}{4}',
		sin: Math.sqrt(2) / 2,
		cos: -Math.sqrt(2) / 2,
		tan: -1
	},
	{
		degrees: 150,
		radians: '\\frac{5\\pi}{6}',
		sin: 0.5,
		cos: -Math.sqrt(3) / 2,
		tan: -Math.sqrt(3) / 3
	},
	{ degrees: 180, radians: '\\pi', sin: 0, cos: -1, tan: 0 },
	{
		degrees: 210,
		radians: '\\frac{7\\pi}{6}',
		sin: -0.5,
		cos: -Math.sqrt(3) / 2,
		tan: Math.sqrt(3) / 3
	},
	{
		degrees: 225,
		radians: '\\frac{5\\pi}{4}',
		sin: -Math.sqrt(2) / 2,
		cos: -Math.sqrt(2) / 2,
		tan: 1
	},
	{
		degrees: 240,
		radians: '\\frac{4\\pi}{3}',
		sin: -Math.sqrt(3) / 2,
		cos: -0.5,
		tan: Math.sqrt(3)
	},
	{ degrees: 270, radians: '\\frac{3\\pi}{2}', sin: -1, cos: 0, tan: -Infinity },
	{
		degrees: 300,
		radians: '\\frac{5\\pi}{3}',
		sin: -Math.sqrt(3) / 2,
		cos: 0.5,
		tan: -Math.sqrt(3)
	},
	{
		degrees: 315,
		radians: '\\frac{7\\pi}{4}',
		sin: -Math.sqrt(2) / 2,
		cos: Math.sqrt(2) / 2,
		tan: -1
	},
	{
		degrees: 330,
		radians: '\\frac{11\\pi}{6}',
		sin: -0.5,
		cos: Math.sqrt(3) / 2,
		tan: -Math.sqrt(3) / 3
	},
	{ degrees: 360, radians: '2\\pi', sin: 0, cos: 1, tan: 0 }
];

export function getUnitCirclePoint(degrees: number): { x: number; y: number } {
	const rad = (degrees * Math.PI) / 180;
	return {
		x: safeNumber(Math.cos(rad)),
		y: safeNumber(Math.sin(rad))
	};
}
