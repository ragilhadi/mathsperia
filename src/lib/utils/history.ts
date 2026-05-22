// Calculation history stored per-shape in localStorage
export interface HistoryEntry {
	inputs: string; // 'r=5' or 's=6,a=4,h=5' etc.
	results: string; // 'A=78.54, P=31.42'
	unit: string;
	timestamp: number;
}

export function getHistoryKey(shapeId: string): string {
	return `mathsperia:history:${shapeId}`;
}

export function loadHistory(shapeId: string): HistoryEntry[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(getHistoryKey(shapeId));
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed;
	} catch {
		// ignore corrupted storage
	}
	return [];
}

export function saveHistory(shapeId: string, entries: HistoryEntry[]): void {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(getHistoryKey(shapeId), JSON.stringify(entries));
	} catch {
		// ignore storage full
	}
}

export function addToHistory(shapeId: string, entry: HistoryEntry): void {
	const entries = loadHistory(shapeId);
	// Prepend new, keep max 10
	const next = [entry, ...entries].slice(0, 10);
	saveHistory(shapeId, next);
}

export function clearHistory(shapeId: string): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.removeItem(getHistoryKey(shapeId));
}
