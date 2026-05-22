<script lang="ts">
	let { items }: { items: { label: string; href?: string }[] } = $props();
</script>

<nav class="mb-8 flex items-center gap-2 text-sm">
	{#each items as item, i}
		{#if i > 0}
			<span class="text-text-muted">/</span>
		{/if}
		{#if item.href && i < items.length - 1}
			<a href={item.href} class="text-text-secondary transition-colors hover:text-text-primary"
				>{item.label}</a
			>
		{:else}
			<span class="font-medium text-indigo">{item.label}</span>
		{/if}
	{/each}
</nav>
