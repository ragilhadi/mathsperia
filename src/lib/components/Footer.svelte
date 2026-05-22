<script lang="ts">
	import { tKey } from '$lib/stores/lang.svelte';
</script>

<footer class="border-border-divider mt-24 border-t py-8">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<span class="font-mono text-sm text-text-muted">mathsperia.web.id</span>
		<span class="text-sm text-text-muted">{tKey('footer.tagline')}</span>
	</div>
</footer>
