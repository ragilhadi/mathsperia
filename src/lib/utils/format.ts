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

/**
 * Guard against NaN and Infinity - return 0 with a fallback
 */
export function safeNumber(value: number, fallback: number = 0): number {
	if (value === null || value === undefined) return fallback;
	if (Number.isNaN(value)) return fallback;
	if (!Number.isFinite(value)) return fallback;
	return value;
}

/**
 * Format a timestamp as a relative time string
 */
export function formatDate(timestamp: number): string {
	const now = Date.now();
	const diff = now - timestamp;
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 10) return 'just now';
	if (seconds < 60) return `${seconds}s ago`;
	if (minutes < 60) return `${minutes}m ago`;
	if (hours < 24) return `${hours}h ago`;
	if (days < 7) return `${days}d ago`;
	return new Date(timestamp).toLocaleDateString();
}
