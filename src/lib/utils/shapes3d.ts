// Mathematical calculation utilities for 3D shapes
// No external math libraries - pure TypeScript implementation

export interface Shape3DResult {
	volume: number;
	area: number; // surface area
	formulas: {
		volume: string;
		area: string;
	};
}

// Cube calculations
export function calculateCube(side: number): Shape3DResult {
	const volume = side ** 3;
	const area = 6 * side ** 2;

	return {
		volume,
		area,
		formulas: {
			volume: 'V = s^3',
			area: 'A = 6s^2'
		}
	};
}

// Rectangular Prism calculations
export function calculateRectangularPrism(length: number, width: number, height: number): Shape3DResult {
	const volume = length * width * height;
	const area = 2 * (length * width + length * height + width * height);

	return {
		volume,
		area,
		formulas: {
			volume: 'V = l \times w \times h',
			area: 'A = 2(lw + lh + wh)'
		}
	};
}

// Sphere calculations
export function calculateSphere(radius: number): Shape3DResult {
	const volume = (4 / 3) * Math.PI * radius ** 3;
	const area = 4 * Math.PI * radius ** 2;

	return {
		volume,
		area,
		formulas: {
			volume: 'V = \frac{4}{3}\pi r^3',
			area: 'A = 4\pi r^2'
		}
	};
}

// Cylinder calculations
export function calculateCylinder(radius: number, height: number): Shape3DResult {
	const volume = Math.PI * radius ** 2 * height;
	const lateralArea = 2 * Math.PI * radius * height;
	const totalArea = lateralArea + 2 * Math.PI * radius ** 2;

	return {
		volume,
		area: totalArea,
		formulas: {
			volume: 'V = \pi r^2 h',
			area: 'A_{lateral} = 2\pi r h \quad A_{total} = 2\pi r(r + h)'
		}
	};
}

// Cone calculations
export function calculateCone(radius: number, height: number): Shape3DResult {
	const slantHeight = Math.sqrt(radius ** 2 + height ** 2);
	const volume = (1 / 3) * Math.PI * radius ** 2 * height;
	const baseArea = Math.PI * radius ** 2;
	const lateralArea = Math.PI * radius * slantHeight;
	const totalArea = baseArea + lateralArea;

	return {
		volume,
		area: totalArea,
		formulas: {
			volume: 'V = \frac{1}{3}\pi r^2 h',
			area: 'A = \pi r(r + l) \quad l = \sqrt{r^2 + h^2}'
		}
	};
}

// Pyramid (square base) calculations
export function calculatePyramid(baseSide: number, height: number): Shape3DResult {
	const volume = (1 / 3) * baseSide ** 2 * height;
	const baseArea = baseSide ** 2;
	const slantHeight = Math.sqrt(height ** 2 + (baseSide / 2) ** 2);
	const lateralArea = 2 * baseSide * slantHeight;
	const totalArea = baseArea + lateralArea;

	return {
		volume,
		area: totalArea,
		formulas: {
			volume: 'V = \frac{1}{3}B h = \frac{1}{3}s^2 h',
			area: 'A = s^2 + 2sl \quad l = \sqrt{h^2 + (s/2)^2}'
		}
	};
}

// Torus calculations
export function calculateTorus(majorRadius: number, minorRadius: number): Shape3DResult {
	const volume = 2 * Math.PI ** 2 * majorRadius * minorRadius ** 2;
	const area = 4 * Math.PI ** 2 * majorRadius * minorRadius;

	return {
		volume,
		area,
		formulas: {
			volume: 'V = 2\pi^2 R r^2',
			area: 'A = 4\pi^2 R r'
		}
	};
}

// 3D Shape metadata for cards
export interface Shape3DMetadata {
	id: string;
	name: string;
	description: string;
	color: 'blue' | 'cyan' | 'violet';
}

export const shapes3d: Shape3DMetadata[] = [
	{ id: 'cube', name: 'Cube', description: 'Calculate volume and surface area of a cube', color: 'blue' },
	{ id: 'rectangular-prism', name: 'Rectangular Prism', description: 'Calculate volume and surface area of a rectangular prism', color: 'cyan' },
	{ id: 'sphere', name: 'Sphere', description: 'Calculate volume and surface area of a sphere', color: 'violet' },
	{ id: 'cylinder', name: 'Cylinder', description: 'Calculate volume and surface area of a cylinder', color: 'blue' },
	{ id: 'cone', name: 'Cone', description: 'Calculate volume and surface area of a cone', color: 'cyan' },
	{ id: 'pyramid', name: 'Pyramid', description: 'Calculate volume and surface area of a square pyramid', color: 'violet' },
	{ id: 'torus', name: 'Torus', description: 'Calculate volume and surface area of a torus', color: 'blue' }
];
