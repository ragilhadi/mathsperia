import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getHistoryKey, loadHistory, saveHistory, addToHistory, clearHistory } from './history';
import type { HistoryEntry } from './history';

const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		}
	};
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('history', () => {
	beforeEach(() => {
		localStorageMock.clear();
	});

	describe('getHistoryKey', () => {
		it('returns correct key for circle', () => {
			expect(getHistoryKey('circle')).toBe('mathsperia:history:circle');
		});

		it('returns correct key for triangle', () => {
			expect(getHistoryKey('triangle')).toBe('mathsperia:history:triangle');
		});
	});

	describe('loadHistory', () => {
		it('returns empty array when no data exists', () => {
			const result = loadHistory('circle');
			expect(result).toEqual([]);
		});

		it('returns saved entries', () => {
			const entries: HistoryEntry[] = [
				{ inputs: 'r=5', results: 'A=78.54, P=31.42', unit: 'cm', timestamp: 1000 }
			];
			localStorage.setItem(getHistoryKey('circle'), JSON.stringify(entries));
			const result = loadHistory('circle');
			expect(result).toEqual(entries);
		});
	});

	describe('saveHistory', () => {
		it('persists entries to localStorage', () => {
			const entries: HistoryEntry[] = [
				{ inputs: 'r=5', results: 'A=78.54, P=31.42', unit: 'cm', timestamp: 1000 }
			];
			saveHistory('circle', entries);
			const raw = localStorage.getItem(getHistoryKey('circle'));
			expect(raw).not.toBeNull();
			expect(JSON.parse(raw!)).toEqual(entries);
		});
	});

	describe('addToHistory', () => {
		it('prepends new entry to existing history', () => {
			const entry1: HistoryEntry = {
				inputs: 'r=5',
				results: 'A=78.54',
				unit: 'cm',
				timestamp: 1000
			};
			const entry2: HistoryEntry = {
				inputs: 'r=10',
				results: 'A=314.16',
				unit: 'cm',
				timestamp: 2000
			};
			saveHistory('circle', [entry1]);
			addToHistory('circle', entry2);
			const result = loadHistory('circle');
			expect(result).toHaveLength(2);
			expect(result[0].inputs).toBe('r=10');
		});

		it('caps history at 10 entries', () => {
			const shapeId = 'square';
			for (let i = 0; i < 12; i++) {
				addToHistory(shapeId, {
					inputs: `s=${i}`,
					results: `A=${i}`,
					unit: 'cm',
					timestamp: i
				});
			}
			const result = loadHistory(shapeId);
			expect(result).toHaveLength(10);
		});

		it('prepends entry to empty history', () => {
			const entry: HistoryEntry = {
				inputs: 'r=5',
				results: 'A=78.54',
				unit: 'cm',
				timestamp: 1000
			};
			addToHistory('circle', entry);
			const result = loadHistory('circle');
			expect(result).toHaveLength(1);
			expect(result[0].inputs).toBe('r=5');
		});
	});

	describe('clearHistory', () => {
		it('removes history entry from localStorage', () => {
			const entries: HistoryEntry[] = [
				{ inputs: 'r=5', results: 'A=78.54', unit: 'cm', timestamp: 1000 }
			];
			saveHistory('circle', entries);
			expect(loadHistory('circle')).toHaveLength(1);
			clearHistory('circle');
			expect(loadHistory('circle')).toEqual([]);
		});
	});
});
