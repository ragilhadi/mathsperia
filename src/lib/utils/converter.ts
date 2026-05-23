import { safeNumber } from './format';

// Angle conversion factors
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const GRAD_TO_DEG = 0.9;
const DEG_TO_GRAD = 1 / 0.9;

export type AngleUnit = 'deg' | 'rad' | 'grad';

export interface AngleConversionResult {
	degrees: number;
	radians: number;
	gradians: number;
}

export function convertAngle(value: number, from: AngleUnit): AngleConversionResult {
	switch (from) {
		case 'deg':
			return {
				degrees: value,
				radians: safeNumber(value * DEG_TO_RAD),
				gradians: safeNumber(value * DEG_TO_GRAD)
			};
		case 'rad':
			return {
				degrees: safeNumber(value * RAD_TO_DEG),
				radians: value,
				gradians: safeNumber(value * RAD_TO_DEG * DEG_TO_GRAD)
			};
		case 'grad':
			return {
				degrees: safeNumber(value * GRAD_TO_DEG),
				radians: safeNumber(value * GRAD_TO_DEG * DEG_TO_RAD),
				gradians: value
			};
	}
}

export type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi';
export type AreaUnit = 'mm²' | 'cm²' | 'm²' | 'km²' | 'in²' | 'ft²' | 'yd²' | 'ha' | 'acre';
export type VolumeUnit = 'mm³' | 'cm³' | 'm³' | 'km³' | 'in³' | 'ft³' | 'L' | 'gal' | 'mL';
export type ConversionCategory = 'length' | 'area' | 'volume' | 'angle';

const LENGTH_TO_M: Record<LengthUnit, number> = {
	mm: 0.001,
	cm: 0.01,
	m: 1,
	km: 1000,
	in: 0.0254,
	ft: 0.3048,
	yd: 0.9144,
	mi: 1609.344
};

const AREA_TO_M2: Record<AreaUnit, number> = {
	'mm²': 1e-6,
	'cm²': 1e-4,
	'm²': 1,
	'km²': 1e6,
	'in²': 6.4516e-4,
	'ft²': 0.0929,
	'yd²': 0.8361,
	ha: 10000,
	acre: 4046.86
};

const VOLUME_TO_M3: Record<VolumeUnit, number> = {
	'mm³': 1e-9,
	'cm³': 1e-6,
	'm³': 1,
	'km³': 1e9,
	'in³': 1.6387e-5,
	'ft³': 0.0283,
	L: 0.001,
	gal: 0.003785,
	mL: 1e-6
};

export const LENGTH_UNITS: { value: LengthUnit; label: string }[] = [
	{ value: 'mm', label: 'Millimeter (mm)' },
	{ value: 'cm', label: 'Centimeter (cm)' },
	{ value: 'm', label: 'Meter (m)' },
	{ value: 'km', label: 'Kilometer (km)' },
	{ value: 'in', label: 'Inch (in)' },
	{ value: 'ft', label: 'Foot (ft)' },
	{ value: 'yd', label: 'Yard (yd)' },
	{ value: 'mi', label: 'Mile (mi)' }
];

export const AREA_UNITS: { value: AreaUnit; label: string }[] = [
	{ value: 'mm²', label: 'Square Millimeter (mm²)' },
	{ value: 'cm²', label: 'Square Centimeter (cm²)' },
	{ value: 'm²', label: 'Square Meter (m²)' },
	{ value: 'km²', label: 'Square Kilometer (km²)' },
	{ value: 'in²', label: 'Square Inch (in²)' },
	{ value: 'ft²', label: 'Square Foot (ft²)' },
	{ value: 'yd²', label: 'Square Yard (yd²)' },
	{ value: 'ha', label: 'Hectare (ha)' },
	{ value: 'acre', label: 'Acre' }
];

export const VOLUME_UNITS: { value: VolumeUnit; label: string }[] = [
	{ value: 'mm³', label: 'Cubic Millimeter (mm³)' },
	{ value: 'cm³', label: 'Cubic Centimeter (cm³)' },
	{ value: 'm³', label: 'Cubic Meter (m³)' },
	{ value: 'km³', label: 'Cubic Kilometer (km³)' },
	{ value: 'in³', label: 'Cubic Inch (in³)' },
	{ value: 'ft³', label: 'Cubic Foot (ft³)' },
	{ value: 'L', label: 'Liter (L)' },
	{ value: 'gal', label: 'Gallon (gal)' },
	{ value: 'mL', label: 'Milliliter (mL)' }
];

export const ANGLE_UNITS: { value: AngleUnit; label: string }[] = [
	{ value: 'deg', label: 'Degrees (°)' },
	{ value: 'rad', label: 'Radians (rad)' },
	{ value: 'grad', label: 'Gradians (grad)' }
];

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
	if (from === to) return value;
	const inMeters = value * LENGTH_TO_M[from];
	return safeNumber(inMeters / LENGTH_TO_M[to]);
}

export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
	if (from === to) return value;
	const inM2 = value * AREA_TO_M2[from];
	return safeNumber(inM2 / AREA_TO_M2[to]);
}

export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
	if (from === to) return value;
	const inM3 = value * VOLUME_TO_M3[from];
	return safeNumber(inM3 / VOLUME_TO_M3[to]);
}
