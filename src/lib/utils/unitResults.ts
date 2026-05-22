// Unit-aware calculation wrappers for shape results
// Ensures NaN/Infinity guards and converts outputs to selected units

import { safeNumber } from './format';
import { convertAreaValue, convertVolumeValue, convertValue, type Unit } from './units';
import type { ShapeResult } from './shapes';
import type { Shape3DResult } from './shapes3d';

export interface Safe2DResult {
	area: number;
	perimeter: number;
	areaConverted: number;
	perimeterConverted: number;
	formulas: ShapeResult['formulas'];
}

export interface Safe3DResult {
	volume: number;
	area: number;
	volumeConverted: number;
	areaConverted: number;
	formulas: Shape3DResult['formulas'];
}

function run2D(raw: ShapeResult, unit: Unit, baseUnit: Unit = 'cm'): Safe2DResult {
	return {
		area: safeNumber(raw.area, 0),
		perimeter: safeNumber(raw.perimeter, 0),
		areaConverted: safeNumber(convertAreaValue(raw.area, baseUnit, unit), 0),
		perimeterConverted: safeNumber(convertValue(raw.perimeter, baseUnit, unit), 0),
		formulas: raw.formulas
	};
}

function run3D(raw: Shape3DResult, unit: Unit, baseUnit: Unit = 'cm'): Safe3DResult {
	return {
		volume: safeNumber(raw.volume, 0),
		area: safeNumber(raw.area, 0),
		volumeConverted: safeNumber(convertVolumeValue(raw.volume, baseUnit, unit), 0),
		areaConverted: safeNumber(convertVolumeValue(raw.area, baseUnit, unit), 0),
		formulas: raw.formulas
	};
}

// ── 2D shape safe/conversion wrappers ──────────────────────────

import {
	calculateCircle as _calcCircle,
	calculateRectangle as _calcRectangle,
	calculateSquare as _calcSquare,
	calculateEquilateralTriangle as _calcEquilateral,
	calculateIsoscelesTriangle as _calcIsosceles,
	calculateRightTriangle as _calcRightTriangle,
	calculateScaleneTriangle as _calcScalene,
	calculateTrapezoid as _calcTrapezoid,
	calculateParallelogram as _calcParallelogram,
	calculateEllipse as _calcEllipse,
	calculateRhombus as _calcRhombus,
	calculateKite as _calcKite
} from './shapes';

import {
	calculateCube as _calcCube,
	calculateRectangularPrism as _calcRectPrism,
	calculateSphere as _calcSphere,
	calculateCylinder as _calcCylinder,
	calculateCone as _calcCone,
	calculatePyramid as _calcPyramid,
	calculateTorus as _calcTorus
} from './shapes3d';

export function calculateCircle(radius: number, unit: Unit): Safe2DResult {
	return run2D(_calcCircle(radius), unit);
}

export function calculateRectangle(length: number, width: number, unit: Unit): Safe2DResult {
	return run2D(_calcRectangle(length, width), unit);
}

export function calculateSquare(side: number, unit: Unit): Safe2DResult {
	return run2D(_calcSquare(side), unit);
}

export function calculateEquilateralTriangle(side: number, unit: Unit): Safe2DResult {
	return run2D(_calcEquilateral(side), unit);
}

export function calculateIsoscelesTriangle(
	base: number,
	equalSide: number,
	unit: Unit
): Safe2DResult {
	return run2D(_calcIsosceles(base, equalSide), unit);
}

export function calculateRightTriangle(base: number, height: number, unit: Unit): Safe2DResult {
	return run2D(_calcRightTriangle(base, height), unit);
}

export function calculateScaleneTriangle(
	sideA: number,
	sideB: number,
	sideC: number,
	unit: Unit
): Safe2DResult {
	return run2D(_calcScalene(sideA, sideB, sideC), unit);
}

export function calculateTrapezoid(
	a: number,
	b: number,
	height: number,
	unit: Unit,
	side1?: number,
	side2?: number
): Safe2DResult {
	return run2D(_calcTrapezoid(a, b, height, side1, side2), unit);
}

export function calculateParallelogram(
	base: number,
	height: number,
	side: number,
	unit: Unit
): Safe2DResult {
	return run2D(_calcParallelogram(base, height, side), unit);
}

export function calculateEllipse(semiMajor: number, semiMinor: number, unit: Unit): Safe2DResult {
	return run2D(_calcEllipse(semiMajor, semiMinor), unit);
}

export function calculateRhombus(
	diagonal1: number,
	diagonal2: number,
	unit: Unit,
	side?: number
): Safe2DResult {
	return run2D(_calcRhombus(diagonal1, diagonal2, side), unit);
}

export function calculateKite(diagonal1: number, diagonal2: number, unit: Unit): Safe2DResult {
	return run2D(_calcKite(diagonal1, diagonal2), unit);
}

// ── 3D shape safe/conversion wrappers ──────────────────────────

export function calculateCube(side: number, unit: Unit): Safe3DResult {
	return run3D(_calcCube(side), unit);
}

export function calculateRectangularPrism(
	length: number,
	width: number,
	height: number,
	unit: Unit
): Safe3DResult {
	return run3D(_calcRectPrism(length, width, height), unit);
}

export function calculateSphere(radius: number, unit: Unit): Safe3DResult {
	return run3D(_calcSphere(radius), unit);
}

export function calculateCylinder(radius: number, height: number, unit: Unit): Safe3DResult {
	return run3D(_calcCylinder(radius, height), unit);
}

export function calculateCone(radius: number, height: number, unit: Unit): Safe3DResult {
	return run3D(_calcCone(radius, height), unit);
}

export function calculatePyramid(baseSide: number, height: number, unit: Unit): Safe3DResult {
	return run3D(_calcPyramid(baseSide, height), unit);
}

export function calculateTorus(majorRadius: number, minorRadius: number, unit: Unit): Safe3DResult {
	return run3D(_calcTorus(majorRadius, minorRadius), unit);
}
