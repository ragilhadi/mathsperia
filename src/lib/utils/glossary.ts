export interface GlossaryTerm {
	term: string;
	definition: string;
	category: string;
	relatedShape?: string;
	formula?: string;
	seeAlso?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
	{
		term: 'Acute angle',
		definition: 'An angle that measures less than 90 degrees.',
		category: 'Angles',
		seeAlso: ['Obtuse angle', 'Right angle']
	},
	{
		term: 'Acute triangle',
		definition: 'A triangle where all three angles are less than 90 degrees.',
		category: 'Triangles',
		relatedShape: 'triangle',
		seeAlso: ['Obtuse triangle', 'Right triangle']
	},
	{
		term: 'Adjacent sides',
		definition: 'Two sides of a polygon that share a common vertex.',
		category: 'General',
		seeAlso: ['Opposite sides']
	},
	{
		term: 'Altitude',
		definition:
			'The perpendicular distance from the base of a shape to its opposite vertex (height).',
		category: 'General',
		relatedShape: 'triangle',
		seeAlso: ['Height']
	},
	{
		term: 'Area',
		definition:
			'The measure of the two-dimensional surface enclosed by a shape. Measured in square units.',
		category: 'Measurements',
		formula: 'Varies by shape (e.g., A = πr² for a circle)',
		seeAlso: ['Perimeter', 'Surface area']
	},
	{
		term: 'Base',
		definition:
			'The side of a polygon or face of a solid on which the shape rests. Often used as the reference side for calculating area.',
		category: 'General',
		seeAlso: ['Altitude', 'Height']
	},
	{
		term: 'Circle',
		definition:
			'A shape consisting of all points in a plane that are at a given distance (radius) from a center point.',
		category: 'Shapes',
		relatedShape: 'circle',
		formula: 'A = πr², C = 2πr',
		seeAlso: ['Radius', 'Diameter']
	},
	{
		term: 'Circumference',
		definition:
			'The distance around the outside of a circle. Equivalent to the perimeter of a circle.',
		category: 'Measurements',
		relatedShape: 'circle',
		formula: 'C = 2πr = πd',
		seeAlso: ['Perimeter', 'Circle']
	},
	{
		term: 'Complementary angles',
		definition: 'Two angles that add up to 90 degrees.',
		category: 'Angles',
		seeAlso: ['Supplementary angles']
	},
	{
		term: 'Congruent',
		definition:
			'Having the same size and shape. Two figures are congruent if they can be mapped onto each other by rigid transformations.',
		category: 'General',
		seeAlso: ['Similar']
	},
	{
		term: 'Diagonal',
		definition: 'A line segment connecting two non-adjacent vertices of a polygon.',
		category: 'General',
		seeAlso: ['Vertex']
	},
	{
		term: 'Diameter',
		definition:
			'The distance across a circle passing through its center. Equal to twice the radius.',
		category: 'Measurements',
		relatedShape: 'circle',
		formula: 'd = 2r',
		seeAlso: ['Radius', 'Circle']
	},
	{
		term: 'Ellipse',
		definition:
			'A closed curve where the sum of the distances from any point on the curve to two fixed points (foci) is constant.',
		category: 'Shapes',
		relatedShape: 'ellipse',
		formula: 'A = πab',
		seeAlso: ['Circle']
	},
	{
		term: 'Equilateral triangle',
		definition: 'A triangle with all three sides equal and all three angles equal to 60 degrees.',
		category: 'Triangles',
		relatedShape: 'triangle',
		formula: 'A = (√3/4)s²',
		seeAlso: ['Isosceles triangle', 'Scalene triangle']
	},
	{
		term: "Heron's formula",
		definition:
			'A formula to find the area of a triangle from its three side lengths without needing to know the height.',
		category: 'Formulas',
		formula: 'A = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2',
		relatedShape: 'triangle',
		seeAlso: ['Scalene triangle']
	},
	{
		term: 'Hexagon',
		definition: 'A polygon with six sides and six angles.',
		category: 'Polygons',
		seeAlso: ['Pentagon', 'Octagon']
	},
	{
		term: 'Hypotenuse',
		definition: 'The longest side of a right triangle, opposite the right angle.',
		category: 'Triangles',
		relatedShape: 'triangle',
		seeAlso: ['Right triangle', 'Pythagorean theorem']
	},
	{
		term: 'Isosceles triangle',
		definition: 'A triangle with two equal sides and two equal angles opposite those sides.',
		category: 'Triangles',
		relatedShape: 'triangle',
		seeAlso: ['Equilateral triangle', 'Scalene triangle']
	},
	{
		term: 'Kite',
		definition:
			'A quadrilateral with two pairs of adjacent sides that are equal in length. The diagonals intersect at right angles.',
		category: 'Shapes',
		relatedShape: 'kite',
		formula: 'A = (d₁ × d₂)/2',
		seeAlso: ['Rhombus', 'Quadrilateral']
	},
	{
		term: 'Line of symmetry',
		definition:
			'A line that divides a shape into two identical halves that are mirror images of each other.',
		category: 'General',
		seeAlso: ['Reflection']
	},
	{
		term: 'Obtuse angle',
		definition: 'An angle that measures greater than 90 degrees but less than 180 degrees.',
		category: 'Angles',
		seeAlso: ['Acute angle', 'Right angle']
	},
	{
		term: 'Obtuse triangle',
		definition: 'A triangle with one angle greater than 90 degrees.',
		category: 'Triangles',
		seeAlso: ['Acute triangle', 'Right triangle']
	},
	{
		term: 'Parallelogram',
		definition: 'A quadrilateral with opposite sides parallel and equal in length.',
		category: 'Shapes',
		relatedShape: 'parallelogram',
		formula: 'A = b × h, P = 2(b + s)',
		seeAlso: ['Rectangle', 'Rhombus']
	},
	{
		term: 'Pentagon',
		definition: 'A polygon with five sides and five angles.',
		category: 'Polygons',
		seeAlso: ['Hexagon', 'Polygon']
	},
	{
		term: 'Perimeter',
		definition: 'The total distance around the boundary of a two-dimensional shape.',
		category: 'Measurements',
		seeAlso: ['Area', 'Circumference']
	},
	{
		term: 'Pi (π)',
		definition:
			"A mathematical constant approximately equal to 3.14159. The ratio of a circle's circumference to its diameter.",
		category: 'Constants',
		seeAlso: ['Circle', 'Circumference']
	},
	{
		term: 'Polygon',
		definition:
			'A closed two-dimensional shape formed by straight line segments. Examples include triangles, squares, and pentagons.',
		category: 'General',
		seeAlso: ['Quadrilateral', 'Triangle']
	},
	{
		term: 'Pythagorean theorem',
		definition:
			'In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.',
		category: 'Formulas',
		formula: 'a² + b² = c²',
		relatedShape: 'triangle',
		seeAlso: ['Hypotenuse', 'Right triangle']
	},
	{
		term: 'Quadrilateral',
		definition:
			'A polygon with four sides and four angles. The sum of interior angles is always 360 degrees.',
		category: 'Polygons',
		seeAlso: ['Square', 'Rectangle', 'Parallelogram']
	},
	{
		term: 'Radius',
		definition: 'The distance from the center of a circle to any point on its boundary.',
		category: 'Measurements',
		relatedShape: 'circle',
		formula: 'r = d/2',
		seeAlso: ['Diameter', 'Circle']
	},
	{
		term: 'Rectangle',
		definition: 'A quadrilateral with four right angles. Opposite sides are equal and parallel.',
		category: 'Shapes',
		relatedShape: 'rectangle',
		formula: 'A = l × w, P = 2(l + w)',
		seeAlso: ['Square', 'Parallelogram']
	},
	{
		term: 'Right angle',
		definition: 'An angle that measures exactly 90 degrees.',
		category: 'Angles',
		seeAlso: ['Acute angle', 'Obtuse angle']
	},
	{
		term: 'Right triangle',
		definition: 'A triangle with one angle exactly equal to 90 degrees.',
		category: 'Triangles',
		relatedShape: 'triangle',
		seeAlso: ['Pythagorean theorem', 'Hypotenuse']
	},
	{
		term: 'Rhombus',
		definition:
			'A quadrilateral with all four sides equal in length. Opposite sides are parallel and opposite angles are equal.',
		category: 'Shapes',
		relatedShape: 'rhombus',
		formula: 'A = (d₁ × d₂)/2',
		seeAlso: ['Parallelogram', 'Kite']
	},
	{
		term: 'Scalene triangle',
		definition:
			'A triangle with all three sides of different lengths and all three angles different.',
		category: 'Triangles',
		relatedShape: 'triangle',
		seeAlso: ['Equilateral triangle', 'Isosceles triangle']
	},
	{
		term: 'Shoelace formula',
		definition:
			'A method for calculating the area of a polygon when the coordinates of its vertices are known.',
		category: 'Formulas',
		formula: 'A = ½|Σ(xᵢyᵢ₊₁ - xᵢ₊₁yᵢ)|',
		seeAlso: ['Area', 'Coordinate geometry']
	},
	{
		term: 'Similar',
		definition:
			'Two figures are similar if they have the same shape but not necessarily the same size. Corresponding angles are equal and sides are proportional.',
		category: 'General',
		seeAlso: ['Congruent']
	},
	{
		term: 'Slope',
		definition:
			'The measure of the steepness of a line, calculated as the change in y divided by the change in x.',
		category: 'Coordinate geometry',
		formula: 'm = (y₂ - y₁) / (x₂ - x₁)',
		seeAlso: ['Midpoint', 'Line equation']
	},
	{
		term: 'Square',
		definition: 'A regular quadrilateral with four equal sides and four right angles.',
		category: 'Shapes',
		relatedShape: 'square',
		formula: 'A = s², P = 4s',
		seeAlso: ['Rectangle', 'Rhombus']
	},
	{
		term: 'Supplementary angles',
		definition: 'Two angles that add up to 180 degrees.',
		category: 'Angles',
		seeAlso: ['Complementary angles']
	},
	{
		term: 'Surface area',
		definition: 'The total area of the outer surface of a three-dimensional shape.',
		category: 'Measurements',
		seeAlso: ['Volume', 'Area']
	},
	{
		term: 'Trapezoid',
		definition: 'A quadrilateral with at least one pair of parallel sides (the bases).',
		category: 'Shapes',
		relatedShape: 'trapezoid',
		formula: 'A = ½(a + b)h',
		seeAlso: ['Parallelogram', 'Quadrilateral']
	},
	{
		term: 'Vertex',
		definition: 'A point where two or more edges of a polygon meet. Plural: vertices.',
		category: 'General',
		seeAlso: ['Angle', 'Side']
	},
	{
		term: 'Volume',
		definition:
			'The amount of three-dimensional space enclosed by a shape. Measured in cubic units.',
		category: 'Measurements',
		seeAlso: ['Surface area', 'Area']
	},
	{
		term: 'Coordinate geometry',
		definition:
			'The study of geometry using a coordinate system, enabling algebraic methods to solve geometric problems.',
		category: 'Coordinate geometry',
		seeAlso: ['Slope', 'Midpoint']
	},
	{
		term: 'Midpoint',
		definition: 'The point that divides a line segment into two equal parts.',
		category: 'Coordinate geometry',
		formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)',
		seeAlso: ['Slope', 'Distance formula']
	},
	{
		term: 'Distance formula',
		definition:
			'A formula derived from the Pythagorean theorem that calculates the distance between two points in a coordinate plane.',
		category: 'Formulas',
		formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)',
		seeAlso: ['Midpoint', 'Pythagorean theorem']
	},
	{
		term: 'Unit circle',
		definition:
			'A circle with radius 1 centered at the origin of a coordinate system. Used to define trigonometric functions.',
		category: 'Trigonometry',
		seeAlso: ['Sine', 'Cosine', 'Tangent']
	},
	{
		term: 'Sine',
		definition:
			'In a right triangle, the ratio of the opposite side to the hypotenuse. On the unit circle, it is the y-coordinate.',
		category: 'Trigonometry',
		formula: 'sin(θ) = opposite/hypotenuse',
		seeAlso: ['Cosine', 'Tangent', 'Unit circle']
	},
	{
		term: 'Cosine',
		definition:
			'In a right triangle, the ratio of the adjacent side to the hypotenuse. On the unit circle, it is the x-coordinate.',
		category: 'Trigonometry',
		formula: 'cos(θ) = adjacent/hypotenuse',
		seeAlso: ['Sine', 'Tangent', 'Unit circle']
	},
	{
		term: 'Tangent',
		definition:
			'In a right triangle, the ratio of the opposite side to the adjacent side. It equals sine divided by cosine.',
		category: 'Trigonometry',
		formula: 'tan(θ) = opposite/adjacent = sin(θ)/cos(θ)',
		seeAlso: ['Sine', 'Cosine']
	}
];

export function searchGlossary(query: string): GlossaryTerm[] {
	const q = query.toLowerCase().trim();
	if (!q) return GLOSSARY;
	return GLOSSARY.filter(
		(t) =>
			t.term.toLowerCase().includes(q) ||
			t.definition.toLowerCase().includes(q) ||
			t.category.toLowerCase().includes(q)
	);
}

export function getGlossaryByLetter(): Map<string, GlossaryTerm[]> {
	const map = new Map<string, GlossaryTerm[]>();
	for (const term of GLOSSARY) {
		const letter = term.term[0].toUpperCase();
		if (!map.has(letter)) map.set(letter, []);
		map.get(letter)!.push(term);
	}
	return map;
}

export function getGlossaryCategories(): string[] {
	const cats = new Set(GLOSSARY.map((t) => t.category));
	return [...cats].sort();
}
