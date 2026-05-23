import { describe, it, expect } from 'vitest';
import { GLOSSARY, searchGlossary, getGlossaryByLetter, getGlossaryCategories } from './glossary';

describe('glossary', () => {
	describe('GLOSSARY', () => {
		it('has the expected number of terms', () => {
			expect(GLOSSARY.length).toBeGreaterThan(0);
		});
	});

	describe('searchGlossary', () => {
		it('returns results including Circle when searching for circle', () => {
			const results = searchGlossary('circle');
			expect(results.length).toBeGreaterThan(0);
			expect(results.some((t) => t.term === 'Circle')).toBe(true);
		});

		it('returns all terms when query is empty', () => {
			const results = searchGlossary('');
			expect(results).toHaveLength(GLOSSARY.length);
		});

		it('returns all terms when query is whitespace', () => {
			const results = searchGlossary('   ');
			expect(results).toHaveLength(GLOSSARY.length);
		});

		it('searches case insensitively', () => {
			const lower = searchGlossary('circle');
			const upper = searchGlossary('Circle');
			expect(lower.length).toBe(upper.length);
		});

		it('searches in definitions', () => {
			const results = searchGlossary('ratio');
			expect(results.length).toBeGreaterThan(0);
		});

		it('searches in categories', () => {
			const results = searchGlossary('trigonometry');
			expect(results.length).toBeGreaterThan(0);
		});
	});

	describe('getGlossaryCategories', () => {
		it('returns sorted array of unique categories', () => {
			const categories = getGlossaryCategories();
			const sorted = [...categories].sort();
			expect(categories).toEqual(sorted);
		});

		it('contains expected categories', () => {
			const categories = getGlossaryCategories();
			expect(categories).toContain('Shapes');
			expect(categories).toContain('Angles');
			expect(categories).toContain('Formulas');
		});
	});

	describe('getGlossaryByLetter', () => {
		it('returns a Map', () => {
			const result = getGlossaryByLetter();
			expect(result).toBeInstanceOf(Map);
		});

		it('groups terms by first letter', () => {
			const result = getGlossaryByLetter();
			const cTerms = result.get('C');
			expect(cTerms).toBeDefined();
			expect(cTerms!.length).toBeGreaterThan(0);
			expect(cTerms!.every((t) => t.term.startsWith('C'))).toBe(true);
		});
	});
});
