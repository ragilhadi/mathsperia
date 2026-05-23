import { shapes } from '$lib/utils/shapes';
import { error } from '@sveltejs/kit';

export const prerender = false;

export function load({ params }) {
	const shape = shapes.find((s) => s.id === params.shape);
	if (!shape) {
		throw error(404, 'Shape not found');
	}
	return { shape };
}
