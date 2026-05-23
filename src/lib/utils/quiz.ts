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
		question: "A scalene triangle has sides 5, 6, and 7. What is its area? (Heron's formula)",
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
	},
	{
		id: 'q21',
		shapeId: 'circle',
		question: 'What is the diameter of a circle with circumference 10π?',
		options: ['10', '5', '20', '25'],
		correctIndex: 0,
		explanation: 'C = πd → 10π = πd → d = 10',
		difficulty: 'medium'
	},
	{
		id: 'q22',
		shapeId: 'circle',
		question: 'A circle has area 25π. What is its circumference?',
		options: ['10π', '5π', '25π', '50π'],
		correctIndex: 0,
		explanation: 'A = πr² → 25π = πr² → r = 5. C = 2πr = 10π',
		difficulty: 'medium'
	},
	{
		id: 'q23',
		shapeId: 'square',
		question: 'What is the diagonal of a square with side length 8?',
		options: ['8√2', '16', '8', '4√2'],
		correctIndex: 0,
		explanation: 'd = s√2 = 8√2 ≈ 11.31',
		difficulty: 'medium'
	},
	{
		id: 'q24',
		shapeId: 'square',
		question: 'A square has diagonal 14√2. What is its area?',
		options: ['196', '392', '98', '28'],
		correctIndex: 0,
		explanation: 'd = s√2 → s = 14. A = s² = 196',
		difficulty: 'hard'
	},
	{
		id: 'q25',
		shapeId: 'rectangle',
		question: 'A rectangle has area 48 and length 8. What is its perimeter?',
		options: ['28', '24', '32', '16'],
		correctIndex: 0,
		explanation: 'w = 48/8 = 6. P = 2(8 + 6) = 28',
		difficulty: 'medium'
	},
	{
		id: 'q26',
		shapeId: 'triangle',
		question: 'An isosceles right triangle has legs of length 5. What is the area?',
		options: ['12.5', '25', '10', '5√2'],
		correctIndex: 0,
		explanation: 'A = ½ × 5 × 5 = 12.5',
		difficulty: 'medium'
	},
	{
		id: 'q27',
		shapeId: 'triangle',
		question: 'A 30-60-90 triangle has a hypotenuse of 10. What is the length of the shorter leg?',
		options: ['5', '5√3', '10', '10√3'],
		correctIndex: 0,
		explanation: 'In a 30-60-90 triangle, the shorter leg = hypotenuse / 2 = 10 / 2 = 5',
		difficulty: 'hard'
	},
	{
		id: 'q28',
		shapeId: 'trapezoid',
		question: 'A trapezoid has area 84, height 7, and one base 14. What is the other base?',
		options: ['10', '8', '12', '6'],
		correctIndex: 0,
		explanation: 'A = ½(a+b)h → 84 = ½(14+b)×7 → 14+b = 24 → b = 10',
		difficulty: 'medium'
	},
	{
		id: 'q29',
		shapeId: 'parallelogram',
		question: 'A parallelogram has sides 8 and 5 with area 32. What is its height?',
		options: ['4', '5', '8', '6.4'],
		correctIndex: 0,
		explanation: 'A = b × h → 32 = 8 × h → h = 4',
		difficulty: 'medium'
	},
	{
		id: 'q30',
		shapeId: 'ellipse',
		question: 'An ellipse has semi-axes 4 and 6. What is the approximate area?',
		options: ['75.40', '24π', '48', '37.70'],
		correctIndex: 0,
		explanation: 'A = πab = π × 4 × 6 = 24π ≈ 75.40',
		difficulty: 'medium'
	},
	{
		id: 'q31',
		shapeId: 'rhombus',
		question: 'A rhombus has side 13 and one diagonal 10. What is the other diagonal?',
		options: ['24', '20', '12', '26'],
		correctIndex: 0,
		explanation:
			'Half-diagonals form a right triangle: (d₁/2)² + (d₂/2)² = 13² → 5² + (d₂/2)² = 169 → d₂/2 = 12 → d₂ = 24',
		difficulty: 'hard'
	},
	{
		id: 'q32',
		shapeId: 'kite',
		question: 'A kite has side lengths 5 and 7 with diagonals 8 and 12. What is its perimeter?',
		options: ['24', '20', '28', '16'],
		correctIndex: 0,
		explanation: 'A kite has two pairs of equal sides. Perimeter = 2(5) + 2(7) = 10 + 14 = 24',
		difficulty: 'easy'
	},
	{
		id: 'q33',
		shapeId: 'circle',
		question:
			'A semicircle has radius 7. What is the area of the full circle minus the semicircle?',
		options: ['49π/2 ≈ 76.97', '98π', '49π', '14π'],
		correctIndex: 0,
		explanation:
			'Full circle area = π(7²) = 49π. Semicircle area = 49π/2. Difference = 49π - 49π/2 = 49π/2',
		difficulty: 'hard'
	},
	{
		id: 'q34',
		shapeId: 'square',
		question: 'What is the perimeter of a square inscribed in a circle of radius 5?',
		options: ['20√2', '40', '20', '10√2'],
		correctIndex: 0,
		explanation: 'Diagonal = 2r = 10. Side = 10/√2 = 5√2. Perimeter = 4 × 5√2 = 20√2',
		difficulty: 'hard'
	},
	{
		id: 'q35',
		shapeId: 'rectangle',
		question: 'A rectangle has diagonal √41 and width 5. What is its area?',
		options: ['20', '25', '41', '15'],
		correctIndex: 0,
		explanation: 'l = √(41 - 25) = √16 = 4. A = 4 × 5 = 20',
		difficulty: 'hard'
	},
	{
		id: 'q36',
		shapeId: 'trapezoid',
		question: 'An isosceles trapezoid has bases 12 and 8, and area 40. What is its height?',
		options: ['4', '5', '8', '10'],
		correctIndex: 0,
		explanation: 'A = ½(a+b)h → 40 = ½(12+8)h → 40 = 10h → h = 4',
		difficulty: 'medium'
	},
	{
		id: 'q37',
		shapeId: 'rhombus',
		question: 'A rhombus has area 60 and one diagonal 12. What is the other diagonal?',
		options: ['10', '12', '5', '20'],
		correctIndex: 0,
		explanation: 'A = (d₁ × d₂)/2 → 60 = (12 × d₂)/2 → d₂ = 10',
		difficulty: 'medium'
	},
	{
		id: 'q38',
		shapeId: 'parallelogram',
		question: 'A parallelogram has area 45 and height 9. What is the base length?',
		options: ['5', '9', '15', '3'],
		correctIndex: 0,
		explanation: 'A = b × h → 45 = b × 9 → b = 5',
		difficulty: 'easy'
	},
	{
		id: 'q39',
		shapeId: 'kite',
		question: 'A kite has area 36 and one diagonal 9. What is the other diagonal?',
		options: ['8', '6', '12', '4'],
		correctIndex: 0,
		explanation: 'A = (d₁ × d₂)/2 → 36 = (9 × d₂)/2 → d₂ = 8',
		difficulty: 'medium'
	},
	{
		id: 'q40',
		shapeId: 'triangle',
		question: 'A triangle has base 10 and area 35. What is its height?',
		options: ['7', '3.5', '14', '5'],
		correctIndex: 0,
		explanation: 'A = ½bh → 35 = ½(10)h → h = 7',
		difficulty: 'easy'
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
