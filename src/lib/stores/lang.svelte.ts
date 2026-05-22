import { browser } from '$app/environment';
import { translations } from '$lib/i18n';

export type Language = 'en' | 'id';

const STORAGE_KEY = 'mathsperia:lang';

function createLangStore() {
	let current = $state<Language>('en');

	function set(lang: Language) {
		current = lang;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, lang);
			document.documentElement.lang = lang;
		}
	}

	function toggle() {
		set(current === 'en' ? 'id' : 'en');
	}

	function initFromStorage() {
		if (!browser) return;
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'en' || saved === 'id') {
			current = saved;
			document.documentElement.lang = saved;
		}
	}

	return {
		get current() {
			return current;
		},
		set,
		toggle,
		initFromStorage
	};
}

export const lang = createLangStore();

export function t(dict: Record<Language, string>): string {
	return dict[lang.current];
}

export function tKey(key: string): string {
	const keys = key.split('.');
	let obj: Record<string, unknown> = translations[lang.current] as Record<string, unknown>;
	for (const k of keys) {
		if (obj && typeof obj === 'object' && k in obj) {
			obj = obj[k] as Record<string, unknown>;
		} else {
			return key;
		}
	}
	return String(obj);
}