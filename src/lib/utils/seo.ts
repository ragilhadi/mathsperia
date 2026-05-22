// SEO helpers for generating JSON-LD structured data
// https://schema.org

interface MathSolverProps {
	shape: string;
	urlPath: string;
	category: '2D' | '3D';
	resultType: string;
	keywords?: string;
}

/**
 * Generate MathSolver structured data for a calculator page
 */
export function mathSolverData(props: MathSolverProps): Record<string, unknown> {
	const { shape, urlPath, category, resultType, keywords } = props;
	return {
		'@context': 'https://schema.org',
		'@type': 'MathSolver',
		name: `${shape} Calculator — Mathsperia`,
		url: `https://mathsperia.web.id${urlPath}`,
		description: `Interactive ${shape.toLowerCase()} calculator. Calculate ${resultType} with step-by-step formulas, visual diagrams, and instant results. Free — no signup required.`,
		potentialAction: {
			'@type': 'SolveMathAction',
			target: { '@type': 'EntryPoint', urlTemplate: `https://mathsperia.web.id${urlPath}` },
			'mathExpression-input': 'required',
			eduQuestionType: 'Geometry',
			about: {
				'@type': 'Thing',
				name: shape,
				category: `${category} Geometry`
			}
		},
		applicationCategory: 'EducationApplication',
		subjectOf: {
			'@type': 'Thing',
			name: `${shape}`,
			category: `${category} Geometry`
		},
		isAccessibleForFree: true,
		eduLevel: ['HighSchool', 'Undergraduate', 'K-12'],
		keywords:
			keywords ||
			`${shape}, ${category.toLowerCase()} geometry calculator, area, perimeter, volume, surface area, math solver, step by step`
	};
}

/**
 * Generate WebPage / ItemList structured data for category/landing pages
 */
export function categoryPageData({
	name,
	urlPath,
	description,
	itemList
}: {
	name: string;
	urlPath: string;
	description: string;
	itemList: { name: string; url: string }[];
}): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name,
		url: `https://mathsperia.web.id${urlPath}`,
		description,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: itemList.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				url: `https://mathsperia.web.id${item.url}`
			}))
		}
	};
}
