<script lang="ts">
	import {
		QUIZ_QUESTIONS,
		type QuizQuestion,
		shuffleQuestions,
		getQuestionsByShape,
		saveQuizScore,
		getQuizScore,
		resetQuizScore
	} from '$lib/utils/quiz';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { categoryPageData } from '$lib/utils/seo';
	import { tKey } from '$lib/stores/lang.svelte';

	const seoData = categoryPageData({
		name: '2D Geometry Quiz',
		urlPath: '/quiz/2d',
		description:
			'Test your knowledge of 2D geometry with interactive questions on circles, squares, rectangles, triangles, and more.',
		itemList: [{ name: '2D Geometry Quiz', url: '/quiz/2d' }]
	});

	type Phase = 'config' | 'playing' | 'results';

	const SHAPES = [
		{ id: 'all', labelKey: 'pages.quiz2d.all' },
		{ id: 'circle', labelKey: 'shapes.circle.name' },
		{ id: 'square', labelKey: 'shapes.square.name' },
		{ id: 'rectangle', labelKey: 'shapes.rectangle.name' },
		{ id: 'triangle', labelKey: 'shapes.equilateral-triangle.name' },
		{ id: 'trapezoid', labelKey: 'shapes.trapezoid.name' },
		{ id: 'parallelogram', labelKey: 'shapes.parallelogram.name' },
		{ id: 'ellipse', labelKey: 'shapes.ellipse.name' },
		{ id: 'rhombus', labelKey: 'shapes.rhombus.name' },
		{ id: 'kite', labelKey: 'shapes.kite.name' }
	];

	const DIFFICULTIES = [
		{ id: 'all', labelKey: 'pages.quiz2d.all' },
		{ id: 'easy', labelKey: 'pages.quiz2d.easy' },
		{ id: 'medium', labelKey: 'pages.quiz2d.medium' },
		{ id: 'hard', labelKey: 'pages.quiz2d.hard' }
	];

	let phase = $state<Phase>('config');
	let selectedDifficulty = $state('all');
	let selectedShape = $state('all');
	let questions = $state<QuizQuestion[]>([]);
	let currentQuestionIndex = $state(0);
	let selectedAnswer = $state<number | null>(null);
	let showExplanation = $state(false);
	let correctCount = $state(0);
	let totalQuestions = $state(0);
	let showReview = $state(false);
	let savedScore = $state(getQuizScore());

	let currentQuestion = $derived(questions[currentQuestionIndex] ?? null);

	let scorePercentage = $derived(
		savedScore && savedScore.totalQuestions > 0
			? Math.round((savedScore.correctAnswers / savedScore.totalQuestions) * 100)
			: 0
	);

	function startQuiz() {
		const shape = selectedShape === 'all' ? undefined : selectedShape;
		const difficulty = selectedDifficulty === 'all' ? undefined : selectedDifficulty;
		const filtered = getQuestionsByShape(shape, difficulty);
		questions = shuffleQuestions(filtered);
		totalQuestions = questions.length;
		currentQuestionIndex = 0;
		selectedAnswer = null;
		showExplanation = false;
		correctCount = 0;
		phase = 'playing';
	}

	function selectAnswer(index: number) {
		if (showExplanation) return;
		selectedAnswer = index;
	}

	function checkAnswer() {
		if (selectedAnswer === null || !currentQuestion) return;
		showExplanation = true;
		if (selectedAnswer === currentQuestion.correctIndex) {
			correctCount++;
		}
	}

	function nextQuestion() {
		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
			selectedAnswer = null;
			showExplanation = false;
		} else {
			saveQuizScore(correctCount, totalQuestions);
			savedScore = getQuizScore();
			phase = 'results';
		}
	}

	function getPerformanceMessage(percentage: number): string {
		if (percentage >= 90) return 'Outstanding!';
		if (percentage >= 70) return 'Great work!';
		if (percentage >= 50) return 'Good effort!';
		return 'Keep practicing!';
	}

	function resetQuiz() {
		phase = 'config';
		selectedDifficulty = 'all';
		selectedShape = 'all';
		questions = [];
		currentQuestionIndex = 0;
		selectedAnswer = null;
		showExplanation = false;
		correctCount = 0;
		totalQuestions = 0;
		showReview = false;
	}

	function handleResetScore() {
		resetQuizScore();
		savedScore = getQuizScore();
	}

	function isCorrectAnswer(qIndex: number, aIndex: number): boolean {
		return questions[qIndex].correctIndex === aIndex;
	}
</script>

<SeoHead
	title="2D Geometry Quiz — Test Your Knowledge"
	description="Test your knowledge of 2D geometry with interactive questions covering circles, squares, rectangles, triangles, trapezoids, and more."
	canonicalPath="/quiz/2d"
	keywords="2D geometry quiz, circle quiz, triangle quiz, area quiz, perimeter quiz, math test, geometry test"
	structuredData={seoData}
/>

<Breadcrumb
	items={[
		{ label: tKey('nav.home'), href: '/' },
		{ label: tKey('nav.quiz'), href: '/quiz' },
		{ label: tKey('common.geometry2d') }
	]}
/>

<BackButton href="/quiz" />

<div class="mb-8">
	<p class="micro-label mb-2">{tKey('pages.quiz2d.subtitle')}</p>
	<h1 class="font-display text-4xl font-bold tracking-tight text-text-primary">
		{tKey('pages.quiz2d.title')}
	</h1>
	<p class="mt-2 text-text-secondary">
		{tKey('pages.quiz2d.desc')}
	</p>
</div>

{#if phase === 'config'}
	<div class="surface-panel animate-fade-slide-up p-6">
		<h2 class="mb-6 font-display text-xl font-semibold text-text-primary">
			{tKey('pages.quiz2d.configTitle')}
		</h2>

		<div class="mb-6">
			<p class="micro-label mb-3">{tKey('pages.quiz2d.difficulty')}</p>
			<div class="flex flex-wrap gap-2">
				{#each DIFFICULTIES as diff}
					<button
						onclick={() => (selectedDifficulty = diff.id)}
						class="rounded-lg border px-4 py-2 text-sm transition-colors duration-150 {selectedDifficulty ===
						diff.id
							? 'border-indigo bg-indigo-dim text-indigo'
							: 'border-border-default hover:border-border-strong bg-bg-inset text-text-secondary hover:text-text-primary'}"
					>
						{tKey(diff.labelKey)}
					</button>
				{/each}
			</div>
		</div>

		<div class="mb-6">
			<p class="micro-label mb-3">{tKey('pages.quiz2d.shape')}</p>
			<div class="flex flex-wrap gap-2">
				{#each SHAPES as shape}
					<button
						onclick={() => (selectedShape = shape.id)}
						class="rounded-lg border px-4 py-2 text-sm transition-colors duration-150 {selectedShape ===
						shape.id
							? 'border-indigo bg-indigo-dim text-indigo'
							: 'border-border-default hover:border-border-strong bg-bg-inset text-text-secondary hover:text-text-primary'}"
					>
						{tKey(shape.labelKey)}
					</button>
				{/each}
			</div>
		</div>

		<div class="flex items-center gap-4">
			<button
				onclick={startQuiz}
				class="rounded-lg bg-indigo px-6 py-2.5 font-medium text-white transition-colors duration-150 hover:bg-indigo-bright active:scale-[0.97]"
			>
				{tKey('pages.quiz2d.startQuiz')}
			</button>

			{#if savedScore && savedScore.totalQuestions > 0}
				<div class="flex items-center gap-3">
					<span class="text-sm text-text-secondary">
						{tKey('pages.quiz2d.score')}:
						<span class="font-mono text-emerald-bright">{savedScore.correctAnswers}</span>/<span
							class="font-mono">{savedScore.totalQuestions}</span
						>
						<span class="text-text-muted">({scorePercentage}%)</span>
					</span>
					<button
						onclick={handleResetScore}
						class="text-xs text-text-muted transition-colors hover:text-rose"
					>
						{tKey('common.reset')}
					</button>
				</div>
			{/if}
		</div>

		{#if getQuestionsByShape(selectedShape === 'all' ? undefined : selectedShape, selectedDifficulty === 'all' ? undefined : selectedDifficulty).length === 0}
			<p class="mt-4 text-sm text-rose">{tKey('pages.quiz2d.noQuestions')}</p>
		{/if}
	</div>
{:else if phase === 'playing' && currentQuestion}
	<div class="animate-fade-slide-up">
		<div class="mb-6">
			<p class="micro-label mb-1">
				{tKey('pages.quiz2d.question')}
				{currentQuestionIndex + 1}
				{tKey('pages.quiz2d.questionOf')}
				{totalQuestions}
			</p>
			<div class="mt-3 h-1 overflow-hidden rounded-full bg-bg-elevated">
				<div
					class="h-full rounded-full bg-indigo transition-all duration-300"
					style="width: {((currentQuestionIndex + 1) / totalQuestions) * 100}%"
				></div>
			</div>
		</div>

		<div class="surface-panel mb-6 p-6">
			<h2 class="font-display text-2xl tracking-tight text-text-primary">
				{currentQuestion.question}
			</h2>

			<div class="mt-2 flex items-center gap-2">
				<span
					class="rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider uppercase {currentQuestion.difficulty ===
					'easy'
						? 'bg-emerald-dim text-emerald'
						: currentQuestion.difficulty === 'medium'
							? 'bg-amber-dim text-amber'
							: 'bg-rose-dim text-rose'}"
				>
					{currentQuestion.difficulty}
				</span>
				<span class="text-xs tracking-wider text-text-muted uppercase">
					{currentQuestion.shapeId}
				</span>
			</div>
		</div>

		<div class="mb-6 grid grid-cols-2 gap-3">
			{#each currentQuestion.options as option, i}
				{@const isSelected = selectedAnswer === i}
				{@const isCorrect = currentQuestion.correctIndex === i}
				{@const isWrongSelection = isSelected && !isCorrect}
				<button
					onclick={() => selectAnswer(i)}
					disabled={showExplanation}
					class="surface-panel flex items-center gap-3 rounded-xl border p-4 text-left transition-colors duration-150 {showExplanation
						? isCorrect
							? 'border-emerald bg-emerald-dim'
							: isWrongSelection
								? 'border-rose bg-rose-dim'
								: 'border-border-subtle opacity-60'
						: isSelected
							? 'border-indigo bg-indigo-dim'
							: 'border-border-default hover:border-border-strong'} {showExplanation
						? 'cursor-default'
						: 'cursor-pointer hover:-translate-y-0.5 active:scale-[0.97]'}"
				>
					<span
						class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold {showExplanation &&
						isCorrect
							? 'text-text-inverse bg-emerald'
							: showExplanation && isWrongSelection
								? 'text-text-inverse bg-rose'
								: isSelected
									? 'bg-indigo text-white'
									: 'border-border-default border bg-bg-inset text-text-secondary'}"
					>
						{showExplanation && isCorrect
							? '✓'
							: showExplanation && isWrongSelection
								? '✗'
								: String.fromCharCode(65 + i)}
					</span>
					<span
						class="text-sm {showExplanation && isCorrect
							? 'font-medium text-emerald-bright'
							: showExplanation && isWrongSelection
								? 'font-medium text-rose'
								: 'text-text-primary'}"
					>
						{option}
					</span>
				</button>
			{/each}
		</div>

		{#if !showExplanation && selectedAnswer !== null}
			<button
				onclick={checkAnswer}
				class="rounded-lg bg-indigo px-6 py-2.5 font-medium text-white transition-colors duration-150 hover:bg-indigo-bright active:scale-[0.97]"
			>
				{tKey('pages.quiz2d.checkAnswer')}
			</button>
		{/if}

		{#if showExplanation}
			<div class="formula-panel animate-fade-slide-up mb-6">
				<p class="micro-label mb-2">{tKey('pages.quiz2d.explanation')}</p>
				<p class="font-mono text-sm text-amber-bright">{currentQuestion.explanation}</p>
			</div>

			{#if currentQuestionIndex < totalQuestions - 1}
				<button
					onclick={nextQuestion}
					class="rounded-lg bg-indigo px-6 py-2.5 font-medium text-white transition-colors duration-150 hover:bg-indigo-bright active:scale-[0.97]"
				>
					{tKey('pages.quiz2d.nextQuestion')}
				</button>
			{:else}
				<button
					onclick={nextQuestion}
					class="rounded-lg bg-emerald px-6 py-2.5 font-medium text-white transition-colors duration-150 hover:bg-emerald-bright active:scale-[0.97]"
				>
					{tKey('pages.quiz2d.submitQuiz')}
				</button>
			{/if}
		{/if}
	</div>
{:else if phase === 'results'}
	{@const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}
	<div class="animate-fade-slide-up">
		<div class="surface-panel mb-6 p-8 text-center">
			<p class="micro-label mb-4">{tKey('pages.quiz2d.quizComplete')}</p>
			<div class="result-chip mb-4 inline-flex flex-col items-center px-8 py-5">
				<span class="font-mono text-4xl font-medium text-emerald-bright">
					{correctCount}/{totalQuestions}
				</span>
				<span class="mt-1 font-mono text-lg text-emerald-bright">{percentage}%</span>
			</div>
			<p class="mt-4 font-display text-2xl font-bold text-text-primary">
				{getPerformanceMessage(percentage)}
			</p>
		</div>

		<div class="mb-6 flex items-center gap-3">
			<button
				onclick={resetQuiz}
				class="rounded-lg bg-indigo px-6 py-2.5 font-medium text-white transition-colors duration-150 hover:bg-indigo-bright active:scale-[0.97]"
			>
				{tKey('pages.quiz2d.tryAgain')}
			</button>
			<button
				onclick={() => (showReview = !showReview)}
				class="border-border-default hover:border-border-strong rounded-lg border px-6 py-2.5 font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary active:scale-[0.97]"
			>
				{showReview ? tKey('pages.quiz2d.hideAnswers') : tKey('pages.quiz2d.reviewAnswers')}
			</button>
		</div>

		{#if showReview}
			<div class="animate-fade-slide-up space-y-3">
				{#each questions as q, qi}
					<div class="surface-panel p-4">
						<div class="flex items-start gap-3">
							<span
								class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold {isCorrectAnswer(
									qi,
									questions[qi].correctIndex
								)
									? 'bg-emerald-dim text-emerald'
									: 'bg-rose-dim text-rose'}"
							>
								{isCorrectAnswer(qi, questions[qi].correctIndex) ? '✓' : '✗'}
							</span>
							<div class="min-w-0 flex-1">
								<p class="text-sm text-text-primary">{q.question}</p>
								<p class="mt-1 text-xs font-medium text-emerald">
									{tKey('pages.quiz2d.correctAnswer')}
									{q.options[q.correctIndex]}
								</p>
								<p class="mt-0.5 font-mono text-xs text-text-muted">{q.explanation}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		{#if savedScore && savedScore.totalQuestions > 0}
			<div class="surface-panel mt-6 p-4">
				<p class="micro-label mb-2">{tKey('pages.quiz2d.lifetimeScore')}</p>
				<p class="text-sm text-text-secondary">
					{tKey('pages.quiz2d.totalCorrect')}:
					<span class="font-mono text-emerald-bright">{savedScore.correctAnswers}</span>
					/ <span class="font-mono">{savedScore.totalQuestions}</span>
					<span class="text-text-muted">({scorePercentage}%)</span>
				</p>
			</div>
		{/if}
	</div>
{/if}
