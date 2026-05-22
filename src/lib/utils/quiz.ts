export interface QuizQuestion {
	id: string;
	shapeId: string;
	question: string;
	options: string[];
	correctIndex: number;
	explanation: string;
	difficulty: 'easy' | 'medium' | 'hard';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
	{
		id: 'q1',
		shapeId: 'circle',
		question: 'What is the area of a circle with radius 7?',
		options: ['154 cm²', '49π cm²', '44 cm²', '14π cm²'],
		correctIndex: 1,
		explanation: 'Area = πr² = π × 7² = 49π cm² ≈ 153.94 cm²',
		difficulty: 'easy'
	},
	{
		id: 'q2',
		shapeId: 'circle',
		question: 'What is the circumference of a circle with radius 5?',
		options: ['10π', '25π', '5π', '10'],
		correctIndex: 0,
		explanation: 'Circumference = 2πr = 2π × 5 = 10π ≈ 31.42',
		difficulty: 'easy'
	},
	{
		id: 'q3',
		shapeId: 'square',
		question: 'What is the area of a square with side 9?',
		options: ['36', '81', '18', '27'],
		correctIndex: 1,
		explanation: 'Area = s² = 9² = 81',
		difficulty: 'easy'
	},
	{
		id: 'q4',
		shapeId: 'square',
		question: 'What is the perimeter of a square with area 64?',
		options: ['32', '16', '64', '8'],
		correctIndex: 0,
		explanation: 'If A = 64, then s = 8. Perimeter = 4 × 8 = 32',
		difficulty: 'medium'
	},
	{
		id: 'q5',
		shapeId: 'rectangle',
		question: 'A rectangle has length 10 and width 4. What is the area?',
		options: ['40', '28', '14', '80'],
		correctIndex: 0,
		explanation: 'Area = l × w = 10 × 4 = 40',
		difficulty: 'easy'
	},
	{
		id: 'q6',
		shapeId: 'rectangle',
		question: 'A rectangle has perimeter 36 and length 12. What is the width?',
		options: ['6', '12', '8', '24'],
		correctIndex: 0,
		explanation: 'P = 2(l + w) → 36 = 2(12 + w) → w = 6',
		difficulty: 'medium'
	},
	{
		id: 'q7',
		shapeId: 'triangle',
		question: 'What is the area of an equilateral triangle with side 6?',
		options: ['9√3', '18', '9', '36'],
		correctIndex: 0,
		explanation: 'A = (√3/4) × s² = (√3/4) × 36 = 9√3 ≈ 15.59',
		difficulty: 'medium'
	},
	{
		id: 'q8',
		shapeId: 'triangle',
		question: 'What is the area of a right triangle with base 8 and height 6?',
		options: ['48', '24', '14', '28'],
		correctIndex: 1,
		explanation: 'A = ½ × b × h = ½ × 8 × 6 = 24',
		difficulty: 'easy'
	},
	{
		id: 'q9',
		shapeId: 'triangle',
		question: 'A right triangle has legs 3 and 4. What is the hypotenuse?',
		options: ['7', '5', '12', '25'],
		correctIndex: 1,
		explanation: 'c = √(a² + b²) = √(9 + 16) = √25 = 5',
		difficulty: 'easy'
	},
	{
		id: 'q10',
		shapeId: 'trapezoid',
		question: 'A trapezoid has bases 10 and 6, and height 4. What is the area?',
		options: ['40', '32', '16', '24'],
		correctIndex: 1,
		explanation: 'A = ½(a + b)h = ½(10 + 6) × 4 = 32',
		difficulty: 'easy'
	},
	{
		id: 'q11',
		shapeId: 'parallelogram',
		question: 'A parallelogram has base 12 and height 5. What is the area?',
		options: ['60', '34', '17', '120'],
		correctIndex: 0,
		explanation: 'Area = b × h = 12 × 5 = 60',
		difficulty: 'easy'
	},
	{
		id: 'q12',
		shapeId: 'ellipse',
		question: 'What is the area of an ellipse with semi-major axis 5 and semi-minor axis 3?',
		options: ['15π', '8π', '15', '25π'],
		correctIndex: 0,
		explanation: 'A = πab = π × 5 × 3 = 15π ≈ 47.12',
		difficulty: 'medium'
	},
	{
		id: 'q13',
		shapeId: 'rhombus',
		question: 'A rhombus has diagonals 10 and 8. What is the area?',
		options: ['80', '40', '20', '18'],
		correctIndex: 1,
		explanation: 'A = (d₁ × d₂) / 2 = (10 × 8) / 2 = 40',
		difficulty: 'easy'
	},
	{
		id: 'q14',
		shapeId: 'kite',
		question: 'A kite has diagonals 12 and 7. What is the area?',
		options: ['42', '84', '19', '38'],
		correctIndex: 0,
		explanation: 'A = (d₁ × d₂) / 2 = (12 × 7) / 2 = 42',
		difficulty: 'easy'
	},
	{
		id: 'q15',
		shapeId: 'circle',
		question: 'A circle has area 144π. What is its radius?',
		options: ['12', '6', '24', '144'],
		correctIndex: 0,
		explanation: 'A = πr² → 144π = πr² → r² = 144 → r = 12',
		difficulty: 'hard'
	},
	{
		id: 'q16',
		shapeId: 'triangle',
		question: 'A scalene triangle has sides 5, 6, and 7. What is its area? (Heron\'s formula)',
		options: ['6√6 ≈ 14.70', '21', '30', '18'],
		correctIndex: 0,
		explanation: 's = (5+6+7)/2 = 9. A = √(9×4×3×2) = √216 = 6√6 ≈ 14.70',
		difficulty: 'hard'
	},
	{
		id: 'q17',
		shapeId: 'rectangle',
		question: 'A rectangle has diagonal 13 and width 5. What is its area?',
		options: ['60', '65', '30', '25'],
		correctIndex: 0,
		explanation: 'Using Pythagoras: l = √(13² - 5²) = √144 = 12. A = 12 × 5 = 60',
		difficulty: 'hard'
	},
	{
		id: 'q18',
		shapeId: 'parallelogram',
		question: 'A parallelogram has base 10 and side 6. Its area is 40. What is the height?',
		options: ['4', '10', '6', '8'],
		correctIndex: 0,
		explanation: 'A = b × h → 40 = 10 × h → h = 4',
		difficulty: 'medium'
	},
	{
		id: 'q19',
		shapeId: 'trapezoid',
		question: 'A trapezoid has area 50, height 5, and one base 8. What is the other base?',
		options: ['12', '10', '14', '6'],
		correctIndex: 0,
		explanation: 'A = ½(a+b)h → 50 = ½(8+b)×5 → 8+b = 20 → b = 12',
		difficulty: 'hard'
	},
	{
		id: 'q20',
		shapeId: 'ellipse',
		question: 'If the area of an ellipse is 20π and one axis is 5, what is the other?',
		options: ['4', '5', '10', '8'],
		correctIndex: 0,
		explanation: 'A = πab → 20π = π × 5 × b → b = 4',
		difficulty: 'hard'
	}
];

export function getQuestionsByShape(shapeId?: string, difficulty?: string): QuizQuestion[] {
	let filtered = QUIZ_QUESTIONS;
	if (shapeId) {
		filtered = filtered.filter((q) => q.shapeId === shapeId);
	}
	if (difficulty) {
		filtered = filtered.filter((q) => q.difficulty === difficulty);
	}
	return filtered;
}

export function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
	const shuffled = [...questions];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

const QUIZ_SCORE_KEY = 'mathsperia:quiz';

export interface QuizScore {
	totalQuestions: number;
	correctAnswers: number;
	lastUpdated: number;
}

export function saveQuizScore(correct: number, total: number): void {
	if (typeof localStorage === 'undefined') return;
	try {
		const existing = getQuizScore();
		const newScore: QuizScore = {
			totalQuestions: (existing?.totalQuestions || 0) + total,
			correctAnswers: (existing?.correctAnswers || 0) + correct,
			lastUpdated: Date.now()
		};
		localStorage.setItem(QUIZ_SCORE_KEY, JSON.stringify(newScore));
	} catch {
		// ignore
	}
}

export function getQuizScore(): QuizScore | null {
	if (typeof localStorage === 'undefined') return null;
	try {
		const raw = localStorage.getItem(QUIZ_SCORE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

export function resetQuizScore(): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.removeItem(QUIZ_SCORE_KEY);
}