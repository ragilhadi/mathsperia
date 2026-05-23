type Theme = 'dark' | 'light';

const STORAGE_KEY = 'mathsperia:theme';

function createTheme() {
	let current = $state<Theme>('dark');

	function applyTheme(t: Theme) {
		current = t;
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = t;
		}
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, t);
		}
	}

	function initFromStorage() {
		if (typeof localStorage === 'undefined') return;
		const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (saved === 'dark' || saved === 'light') {
			applyTheme(saved);
			return;
		}
		if (typeof window !== 'undefined' && window.matchMedia) {
			applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
		}
	}

	return {
		get current() {
			return current;
		},
		set current(t: Theme) {
			applyTheme(t);
		},
		toggle: () => {
			applyTheme(current === 'dark' ? 'light' : 'dark');
		},
		initFromStorage
	};
}

export const theme = createTheme();
