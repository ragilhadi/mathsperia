// Mathematical calculation utilities for 2D shapes
// No external math libraries - pure TypeScript implementation

export interface ShapeResult {
	area: number;
	perimeter: number;
	formulas: {
		area: string;
		perimeter: string;
	};
}

// Circle calculations
export function calculateCircle(radius: number): ShapeResult {
	const area = Math.PI * radius * radius;
	const perimeter = 2 * Math.PI * radius;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\pi r^2',
			perimeter: 'C = 2\\pi r'
		}
	};
}

// Rectangle calculations
export function calculateRectangle(length: number, width: number): ShapeResult {
	const area = length * width;
	const perimeter = 2 * (length + width);

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = l \\times w',
			perimeter: 'P = 2(l + w)'
		}
	};
}

// Square calculations
export function calculateSquare(side: number): ShapeResult {
	const area = side * side;
	const perimeter = 4 * side;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = s^2',
			perimeter: 'P = 4s'
		}
	};
}

// Triangle calculations

// Equilateral Triangle (all sides equal)
export function calculateEquilateralTriangle(side: number): ShapeResult {
	const height = (side * Math.sqrt(3)) / 2;
	const area = (Math.sqrt(3) / 4) * side * side;
	const perimeter = 3 * side;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\frac{\\sqrt{3}}{4}s^2',
			perimeter: 'P = 3s'
		}
	};
}

// Isosceles Triangle (two sides equal)
export function calculateIsoscelesTriangle(base: number, equalSide: number): ShapeResult {
	const height = Math.sqrt(equalSide * equalSide - (base / 2) * (base / 2));
	const area = 0.5 * base * height;
	const perimeter = base + 2 * equalSide;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\frac{1}{2}bh',
			perimeter: 'P = b + 2s'
		}
	};
}

// Right Triangle (90° angle)
export function calculateRightTriangle(base: number, height: number): ShapeResult {
	const hypotenuse = Math.sqrt(base * base + height * height);
	const area = 0.5 * base * height;
	const perimeter = base + height + hypotenuse;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\frac{1}{2}ab',
			perimeter: 'P = a + b + c'
		}
	};
}

// Scalene Triangle (all sides different) - using Heron's formula
export function calculateScaleneTriangle(sideA: number, sideB: number, sideC: number): ShapeResult {
	const perimeter = sideA + sideB + sideC;
	const s = perimeter / 2; // semi-perimeter
	const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

	return {
		area,
		perimeter,
		formulas: {
			area: "A = \\sqrt{s(s-a)(s-b)(s-c)}",
			perimeter: 'P = a + b + c'
		}
	};
}

// Trapezoid calculations
export function calculateTrapezoid(a: number, b: number, height: number, side1?: number, side2?: number): ShapeResult {
	const area = 0.5 * (a + b) * height;
	
	// If sides provided, use them; otherwise estimate using height
	const s1 = side1 || Math.sqrt(height * height + ((b - a) / 2) * ((b - a) / 2));
	const s2 = side2 || s1;
	const perimeter = a + b + s1 + s2;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\frac{1}{2}(a + b)h',
			perimeter: 'P = a + b + c + d'
		}
	};
}

// Parallelogram calculations
export function calculateParallelogram(base: number, height: number, side: number): ShapeResult {
	const area = base * height;
	const perimeter = 2 * (base + side);

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = b \\times h',
			perimeter: 'P = 2(b + s)'
		}
	};
}

// Ellipse calculations
export function calculateEllipse(semiMajor: number, semiMinor: number): ShapeResult {
	const area = Math.PI * semiMajor * semiMinor;
	
	// Ramanujan's approximation for ellipse perimeter
	const h = Math.pow(semiMajor - semiMinor, 2) / Math.pow(semiMajor + semiMinor, 2);
	const perimeter = Math.PI * (semiMajor + semiMinor) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\pi a b',
			perimeter: 'P \\approx \\pi(a + b)\\left(1 + \\frac{3h}{10 + \\sqrt{4 - 3h}}\\right)'
		}
	};
}

// Rhombus calculations
export function calculateRhombus(diagonal1: number, diagonal2: number, side?: number): ShapeResult {
	const area = (diagonal1 * diagonal2) / 2;
	
	// If side is provided, use it; otherwise calculate from diagonals
	const calculatedSide = side || Math.sqrt((diagonal1 / 2) ** 2 + (diagonal2 / 2) ** 2);
	const perimeter = 4 * calculatedSide;

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\frac{d_1 \\times d_2}{2}',
			perimeter: 'P = 4s'
		}
	};
}

// Kite calculations
export function calculateKite(diagonal1: number, diagonal2: number): ShapeResult {
	const area = (diagonal1 * diagonal2) / 2;
	
	// For perimeter, we'd need the side lengths, so we approximate based on diagonals
	// This is an estimation - exact perimeter requires all 4 side lengths
	const perimeter = 2 * Math.sqrt(diagonal1 ** 2 + diagonal2 ** 2);

	return {
		area,
		perimeter,
		formulas: {
			area: 'A = \\frac{d_1 \\times d_2}{2}',
			perimeter: 'P = 2(a + b)'
		}
	};
}

// Shape metadata for the homepage
export interface ShapeMetadata {
	id: string;
	name: string;
	description: string;
	color: 'blue' | 'cyan' | 'violet';
}

export const shapes: ShapeMetadata[] = [
	{
		id: 'circle',
		name: 'Circle',
		description: 'Calculate area and circumference of a circle',
		color: 'blue'
	},
	{
		id: 'rectangle',
		name: 'Rectangle',
		description: 'Calculate area and perimeter of a rectangle',
		color: 'cyan'
	},
	{
		id: 'square',
		name: 'Square',
		description: 'Calculate area and perimeter of a square',
		color: 'violet'
	},
	{
		id: 'triangle',
		name: 'Triangle',
		description: 'Calculate area and perimeter of a triangle',
		color: 'blue'
	},
	{
		id: 'trapezoid',
		name: 'Trapezoid',
		description: 'Calculate area and perimeter of a trapezoid',
		color: 'cyan'
	},
	{
		id: 'parallelogram',
		name: 'Parallelogram',
		description: 'Calculate area and perimeter of a parallelogram',
		color: 'violet'
	},
	{
		id: 'ellipse',
		name: 'Ellipse',
		description: 'Calculate area and approximate perimeter of an ellipse',
		color: 'blue'
	},
	{
		id: 'rhombus',
		name: 'Rhombus',
		description: 'Calculate area and perimeter of a rhombus',
		color: 'cyan'
	},
	{
		id: 'kite',
		name: 'Kite',
		description: 'Calculate area and perimeter of a kite',
		color: 'violet'
	}
];
