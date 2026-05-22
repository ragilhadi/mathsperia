<script lang="ts">
	import { loadHistory, addToHistory, clearHistory } from '$lib/utils/history';
	import type { HistoryEntry } from '$lib/utils/history';
	import { formatDate } from '$lib/utils/format';
	import { tKey } from '$lib/stores/lang.svelte';

	interface Props {
		shapeId: string;
	}

	let { shapeId }: Props = $props();

	let entries = $state<HistoryEntry[]>([]);
	let isOpen = $state(false);
	let copiedEntryIndex = $state<number | null>(null);

	$effect(() => {
		// re-load when shapeId changes
		entries = loadHistory(shapeId);
	});

	function refresh() {
		entries = loadHistory(shapeId);
		isOpen = true;
	}

	function handleClear() {
		clearHistory(shapeId);
		entries = [];
	}

	function handleCopy(text: string, index: number) {
		navigator.clipboard.writeText(text).catch(() => {});
		copiedEntryIndex = index;
		setTimeout(() => (copiedEntryIndex = null), 2000);
	}

	function formatEntry(entry: HistoryEntry): string {
		return `${entry.inputs} → ${entry.results}`;
	}
</script>

<div class="mt-4">
	<button
		onclick={() => (isOpen = !isOpen)}
		class="flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
		aria-expanded={isOpen}
		aria-controls="history-panel"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><path d="M12 7v5l4 2" /></svg
		>
		<span class="text-sm font-medium">
			{isOpen ? tKey('common.hideSteps') : tKey('common.showSteps')} {tKey('common.recentCalculations')}
		</span>
		<span class="ml-1 text-xs text-text-muted">({entries.length})</span>
	</button>

	{#if isOpen}
		<div id="history-panel" class="surface-panel animate-fade-in mt-3 p-4">
			{#if entries.length === 0}
				<p class="text-sm text-text-muted">{tKey('common.noHistory')}</p>
			{:else}
				<ul class="flex flex-col gap-2">
					{#each entries as entry, i}
						<li class="group flex items-center justify-between gap-2">
							<div class="min-w-0 flex-1">
								<p class="truncate text-sm text-text-primary">{formatEntry(entry)}</p>
								<p class="text-xs text-text-muted">{formatDate(entry.timestamp)}</p>
							</div>
							{#if copiedEntryIndex === i}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-emerald"><path d="M20 6 9 17l-5-5" /></svg
								>
							{:else}
								<button
									onclick={() => handleCopy(formatEntry(entry) + ` | Unit: ${entry.unit}`, i)}
									class="rounded p-1 text-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:bg-bg-inset hover:text-text-primary"
									title="Copy"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
											d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
										/></svg
									>
								</button>
							{/if}
						</li>
					{/each}
				</ul>
				<button
					onclick={handleClear}
					class="hover:text-rose-bright mt-3 text-xs text-rose transition-colors"
				>
					{tKey('common.clearHistory')}
				</button>
			{/if}
		</div>
	{/if}
</div>
