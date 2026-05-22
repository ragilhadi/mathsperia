<script lang="ts">
	import { lang } from '$lib/stores/lang.svelte';

	function toggle() {
		lang.toggle();
	}
</script>

<button
	onclick={toggle}
	aria-label={lang.current === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
	class="border-border-default hover:border-border-strong flex items-center gap-1.5 rounded-lg border bg-bg-inset px-2.5 py-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary"
	title={lang.current === 'en' ? 'Bahasa Indonesia' : 'English'}
	data-testid="lang-toggle"
>
	<span class="font-medium" class:text-indigo={lang.current === 'en'}>EN</span>
	<span class="text-text-muted">/</span>
	<span class="font-medium" class:text-indigo={lang.current === 'id'}>ID</span>
</button>
