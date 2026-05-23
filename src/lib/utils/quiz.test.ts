import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
	QUIZ_QUESTIONS,
	getQuestionsByShape,
	shuffleQuestions,
	saveQuizScore,
	getQuizScore,
	resetQuizScore
} from './quiz';

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

describe('quiz', () => {
	describe('getQuestionsByShape', () => {
		it('returns all 40 questions with no filters', () => {
			const result = getQuestionsByShape();
			expect(result).toHaveLength(40);
		});

		it('returns only circle questions', () => {
			const result = getQuestionsByShape('circle');
			expect(result.length).toBeGreaterThan(0);
			expect(result.every((q) => q.shapeId === 'circle')).toBe(true);
		});

		it('returns only easy questions', () => {
			const result = getQuestionsByShape(undefined, 'easy');
			expect(result.length).toBeGreaterThan(0);
			expect(result.every((q) => q.difficulty === 'easy')).toBe(true);
		});

		it('returns questions filtered by both shapeId and difficulty', () => {
			const result = getQuestionsByShape('circle', 'easy');
			expect(result.every((q) => q.shapeId === 'circle')).toBe(true);
			expect(result.every((q) => q.difficulty === 'easy')).toBe(true);
		});
	});

	describe('shuffleQuestions', () => {
		it('returns same number of questions', () => {
			const shuffled = shuffleQuestions(QUIZ_QUESTIONS);
			expect(shuffled).toHaveLength(QUIZ_QUESTIONS.length);
		});

		it('preserves all question ids', () => {
			const shuffled = shuffleQuestions(QUIZ_QUESTIONS);
			const originalIds = QUIZ_QUESTIONS.map((q) => q.id).sort();
			const shuffledIds = shuffled.map((q) => q.id).sort();
			expect(shuffledIds).toEqual(originalIds);
		});

		it('returns a new array (does not mutate original)', () => {
			const shuffled = shuffleQuestions(QUIZ_QUESTIONS);
			expect(shuffled).not.toBe(QUIZ_QUESTIONS);
		});
	});

	describe('quiz score (localStorage)', () => {
		beforeEach(() => {
			localStorageMock.clear();
		});

		it('returns null when no score saved', () => {
			expect(getQuizScore()).toBeNull();
		});

		it('saves and retrieves a score', () => {
			saveQuizScore(8, 10);
			const score = getQuizScore();
			expect(score).not.toBeNull();
			expect(score!.correctAnswers).toBe(8);
			expect(score!.totalQuestions).toBe(10);
		});

		it('accumulates scores on repeated saves', () => {
			saveQuizScore(8, 10);
			saveQuizScore(3, 5);
			const score = getQuizScore();
			expect(score!.correctAnswers).toBe(11);
			expect(score!.totalQuestions).toBe(15);
		});

		it('resets the score', () => {
			saveQuizScore(5, 10);
			resetQuizScore();
			expect(getQuizScore()).toBeNull();
		});
	});
});
