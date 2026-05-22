import type { Unit } from './units';
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
	calculateKite,
	type ShapeResult
} from './shapes';
import {
	calculateCube,
	calculateRectangularPrism,
	calculateSphere,
	calculateCylinder,
	calculateCone,
	calculatePyramid,
	calculateTorus,
	type Shape3DResult
} from './shapes3d';

export interface InputField {
	id: string;
	label: string;
	symbol: string;
	defaultValue: number;
	min?: number;
}

export interface CalcResult {
	primary: { label: string; value: number; formula: string }[];
	secondary?: { label: string; value: number; formula: string }[];
}

export interface ShapeConfig {
	id: string;
	name: string;
	category: '2d' | '3d';
	description: string;
	inputs: InputField[];
	calculate: (values: number[], unit: Unit) => CalcResult;
	svgComponent?: any;
}

function wrap2D(
	fn: (...args: number[]) => ShapeResult,
	labels: { label: string; formulaKey: 'area' | 'perimeter' }[]
): (values: number[], _unit: Unit) => CalcResult {
	return (values) => {
		const r = fn(...(values as []));
		const primary = labels.map((l) => ({
			label: l.label,
			value: l.formulaKey === 'area' ? r.area : r.perimeter,
			formula: l.formulaKey === 'area' ? r.formulas.area : r.formulas.perimeter
		}));
		return { primary };
	};
}

function wrap3D(
	fn: (...args: number[]) => Shape3DResult,
	labels: { label: string; formulaKey: 'volume' | 'area' }[]
): (values: number[], _unit: Unit) => CalcResult {
	return (values) => {
		const r = fn(...(values as []));
		const primary = labels.map((l) => ({
			label: l.label,
			value: l.formulaKey === 'volume' ? r.volume : r.area,
			formula: l.formulaKey === 'volume' ? r.formulas.volume : r.formulas.area
		}));
		return { primary };
	};
}

export const ALL_SHAPES: ShapeConfig[] = [
	// ── 2D ─────────────────────────────────────────
	{
		id: 'circle',
		name: 'Circle',
		category: '2d',
		description: 'Calculate area and circumference of a circle',
		inputs: [{ id: 'radius', label: 'Radius', symbol: 'r', defaultValue: 5 }],
		calculate: wrap2D(calculateCircle, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Circumference', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'square',
		name: 'Square',
		category: '2d',
		description: 'Calculate area and perimeter of a square',
		inputs: [{ id: 'side', label: 'Side', symbol: 's', defaultValue: 6 }],
		calculate: wrap2D(calculateSquare, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'rectangle',
		name: 'Rectangle',
		category: '2d',
		description: 'Calculate area and perimeter of a rectangle',
		inputs: [
			{ id: 'length', label: 'Length', symbol: 'l', defaultValue: 8 },
			{ id: 'width', label: 'Width', symbol: 'w', defaultValue: 5 }
		],
		calculate: wrap2D(calculateRectangle, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'equilateral-triangle',
		name: 'Equilateral Triangle',
		category: '2d',
		description: 'Calculate area and perimeter of an equilateral triangle',
		inputs: [{ id: 'side', label: 'Side', symbol: 's', defaultValue: 6 }],
		calculate: wrap2D(calculateEquilateralTriangle, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'isosceles-triangle',
		name: 'Isosceles Triangle',
		category: '2d',
		description: 'Calculate area and perimeter of an isosceles triangle',
		inputs: [
			{ id: 'base', label: 'Base', symbol: 'b', defaultValue: 6 },
			{ id: 'equalSide', label: 'Equal Side', symbol: 's', defaultValue: 5 }
		],
		calculate: wrap2D(calculateIsoscelesTriangle, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'right-triangle',
		name: 'Right Triangle',
		category: '2d',
		description: 'Calculate area and perimeter of a right triangle',
		inputs: [
			{ id: 'base', label: 'Base', symbol: 'a', defaultValue: 6 },
			{ id: 'height', label: 'Height', symbol: 'b', defaultValue: 4 }
		],
		calculate: wrap2D(calculateRightTriangle, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'scalene-triangle',
		name: 'Scalene Triangle',
		category: '2d',
		description: 'Calculate area and perimeter of a scalene triangle',
		inputs: [
			{ id: 'sideA', label: 'Side a', symbol: 'a', defaultValue: 5 },
			{ id: 'sideB', label: 'Side b', symbol: 'b', defaultValue: 6 },
			{ id: 'sideC', label: 'Side c', symbol: 'c', defaultValue: 7 }
		],
		calculate: wrap2D(calculateScaleneTriangle, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'trapezoid',
		name: 'Trapezoid',
		category: '2d',
		description: 'Calculate area and perimeter of a trapezoid',
		inputs: [
			{ id: 'baseA', label: 'Base a', symbol: 'a', defaultValue: 8 },
			{ id: 'baseB', label: 'Base b', symbol: 'b', defaultValue: 5 },
			{ id: 'height', label: 'Height', symbol: 'h', defaultValue: 4 }
		],
		calculate: wrap2D(calculateTrapezoid, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'parallelogram',
		name: 'Parallelogram',
		category: '2d',
		description: 'Calculate area and perimeter of a parallelogram',
		inputs: [
			{ id: 'base', label: 'Base', symbol: 'b', defaultValue: 8 },
			{ id: 'height', label: 'Height', symbol: 'h', defaultValue: 5 },
			{ id: 'side', label: 'Side', symbol: 's', defaultValue: 6 }
		],
		calculate: wrap2D(calculateParallelogram, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'ellipse',
		name: 'Ellipse',
		category: '2d',
		description: 'Calculate area and approximate perimeter of an ellipse',
		inputs: [
			{ id: 'semiMajor', label: 'Semi-major axis', symbol: 'a', defaultValue: 7 },
			{ id: 'semiMinor', label: 'Semi-minor axis', symbol: 'b', defaultValue: 4 }
		],
		calculate: wrap2D(calculateEllipse, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter (approx)', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'rhombus',
		name: 'Rhombus',
		category: '2d',
		description: 'Calculate area and perimeter of a rhombus',
		inputs: [
			{ id: 'diagonal1', label: 'Diagonal 1', symbol: 'd₁', defaultValue: 8 },
			{ id: 'diagonal2', label: 'Diagonal 2', symbol: 'd₂', defaultValue: 6 }
		],
		calculate: wrap2D(calculateRhombus, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter', formulaKey: 'perimeter' }
		])
	},
	{
		id: 'kite',
		name: 'Kite',
		category: '2d',
		description: 'Calculate area and perimeter of a kite',
		inputs: [
			{ id: 'diagonal1', label: 'Diagonal 1', symbol: 'd₁', defaultValue: 8 },
			{ id: 'diagonal2', label: 'Diagonal 2', symbol: 'd₂', defaultValue: 5 }
		],
		calculate: wrap2D(calculateKite, [
			{ label: 'Area', formulaKey: 'area' },
			{ label: 'Perimeter (approx)', formulaKey: 'perimeter' }
		])
	},
	// ── 3D ─────────────────────────────────────────
	{
		id: 'cube',
		name: 'Cube',
		category: '3d',
		description: 'Calculate volume and surface area of a cube',
		inputs: [{ id: 'side', label: 'Side', symbol: 's', defaultValue: 5 }],
		calculate: wrap3D(calculateCube, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Surface Area', formulaKey: 'area' }
		])
	},
	{
		id: 'rectangular-prism',
		name: 'Rectangular Prism',
		category: '3d',
		description: 'Calculate volume and surface area of a rectangular prism',
		inputs: [
			{ id: 'length', label: 'Length', symbol: 'l', defaultValue: 6 },
			{ id: 'width', label: 'Width', symbol: 'w', defaultValue: 4 },
			{ id: 'height', label: 'Height', symbol: 'h', defaultValue: 3 }
		],
		calculate: wrap3D(calculateRectangularPrism, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Surface Area', formulaKey: 'area' }
		])
	},
	{
		id: 'sphere',
		name: 'Sphere',
		category: '3d',
		description: 'Calculate volume and surface area of a sphere',
		inputs: [{ id: 'radius', label: 'Radius', symbol: 'r', defaultValue: 5 }],
		calculate: wrap3D(calculateSphere, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Surface Area', formulaKey: 'area' }
		])
	},
	{
		id: 'cylinder',
		name: 'Cylinder',
		category: '3d',
		description: 'Calculate volume and surface area of a cylinder',
		inputs: [
			{ id: 'radius', label: 'Radius', symbol: 'r', defaultValue: 4 },
			{ id: 'height', label: 'Height', symbol: 'h', defaultValue: 8 }
		],
		calculate: wrap3D(calculateCylinder, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Total Surface Area', formulaKey: 'area' }
		])
	},
	{
		id: 'cone',
		name: 'Cone',
		category: '3d',
		description: 'Calculate volume and surface area of a cone',
		inputs: [
			{ id: 'radius', label: 'Radius', symbol: 'r', defaultValue: 4 },
			{ id: 'height', label: 'Height', symbol: 'h', defaultValue: 6 }
		],
		calculate: wrap3D(calculateCone, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Total Surface Area', formulaKey: 'area' }
		])
	},
	{
		id: 'pyramid',
		name: 'Pyramid',
		category: '3d',
		description: 'Calculate volume and surface area of a square pyramid',
		inputs: [
			{ id: 'baseSide', label: 'Base Side', symbol: 's', defaultValue: 6 },
			{ id: 'height', label: 'Height', symbol: 'h', defaultValue: 5 }
		],
		calculate: wrap3D(calculatePyramid, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Total Surface Area', formulaKey: 'area' }
		])
	},
	{
		id: 'torus',
		name: 'Torus',
		category: '3d',
		description: 'Calculate volume and surface area of a torus',
		inputs: [
			{ id: 'majorRadius', label: 'Major Radius', symbol: 'R', defaultValue: 7 },
			{ id: 'minorRadius', label: 'Minor Radius', symbol: 'r', defaultValue: 3 }
		],
		calculate: wrap3D(calculateTorus, [
			{ label: 'Volume', formulaKey: 'volume' },
			{ label: 'Surface Area', formulaKey: 'area' }
		])
	}
];

export function getShapeConfig(id: string): ShapeConfig | undefined {
	return ALL_SHAPES.find((s) => s.id === id);
}
