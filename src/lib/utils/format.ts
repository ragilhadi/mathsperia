// Smart number formatting utilities

/**
 * Format a number intelligently - show decimals only if needed
 * @param value - The number to format
 * @param maxDecimals - Maximum decimal places to show (default: 2)
 * @returns Formatted string
 */
export function formatNumber(value: number, maxDecimals: number = 2): string {
	// Check if the number is effectively an integer
	if (Math.abs(value - Math.round(value)) < 0.0001) {
		return Math.round(value).toString();
	}

	// Has decimals - format with appropriate precision
	const formatted = value.toFixed(maxDecimals);
	
	// Remove trailing zeros after decimal point
	return formatted.replace(/\.?0+$/, '');
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}
