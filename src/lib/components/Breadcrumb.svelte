<script lang="ts">
	let { items }: { items: { label: string; href?: string }[] } = $props();
</script>

<nav class="flex items-center gap-2 text-sm mb-8">
	{#each items as item, i}
		{#if i > 0}
			<span class="text-text-muted">/</span>
		{/if}
		{#if item.href && i < items.length - 1}
			<a href={item.href} class="text-text-secondary hover:text-text-primary transition-colors">{item.label}</a>
		{:else}
			<span class="text-indigo font-medium">{item.label}</span>
		{/if}
	{/each}
</nav>
