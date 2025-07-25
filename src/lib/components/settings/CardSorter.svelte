<script lang="ts">
	import { getGlobalContext } from '$lib/contexts/context.svelte';
	import { getNewOrder, moveCardDown, moveCardUp, sortCards } from '$lib/utils';

	const context = getGlobalContext();

	let draggedIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	function handleToggleCustom() {
		context.useCustomOrder = !context.useCustomOrder;
		context.cardOrder = context.useCustomOrder ? context.defaultOrder : [];
		context.cards = sortCards(context.cards, context.defaultOrder);
	}

	function handleDragStart(index: number) {
		if (!context.useCustomOrder) return;
		draggedIndex = index;
	}

	function handleDragOver(event: DragEvent) {
		if (!context.useCustomOrder) return;
		event.preventDefault();
	}

	function handleDragEnter(event: DragEvent, index: number) {
		if (!context.useCustomOrder || draggedIndex === null) return;
		event.preventDefault();
		dragOverIndex = index;
	}

	function handleDragLeave(event: DragEvent) {
		if (!context.useCustomOrder) return;
		const relatedTarget = event.relatedTarget as Element;
		const currentTarget = event.currentTarget as Element | null;
		if (!relatedTarget || !currentTarget?.contains(relatedTarget)) {
			dragOverIndex = null;
		}
	}

	function handleDrop(event: DragEvent, dropIndex: number) {
		if (!context.useCustomOrder || draggedIndex === null) return;

		event.preventDefault();
		context.cardOrder = getNewOrder(draggedIndex, dropIndex, context.cardOrder);
		context.cards = sortCards(context.cards, context.cardOrder);
		draggedIndex = null;
		dragOverIndex = null;
	}

	function handleMoveCardUp(index: number) {
		const newData = moveCardUp(index, context.cardOrder, context.cards);
		context.cardOrder = newData.cardOrder;
		context.cards = newData.cards;
	}

	function handleMoveCardDown(index: number) {
		const newData = moveCardDown(index, context.cardOrder, context.cards);
		context.cardOrder = newData.cardOrder;
		context.cards = newData.cards;
	}
</script>

<div class="flex min-h-0 flex-1 flex-col space-y-3">
	<div class="flex flex-shrink-0 items-center justify-between">
		<div class="flex flex-col">
			<h4 class="font-medium text-gray-900 dark:text-white">Bookmark Order</h4>
			<span class="text-xs text-gray-500 dark:text-gray-400">
				{context.useCustomOrder ? 'Drag to reorder cards' : 'Cards shown in default order'}
			</span>
		</div>
		<button
			onclick={handleToggleCustom}
			class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none {context.useCustomOrder
				? 'bg-blue-600'
				: 'bg-gray-200 dark:bg-gray-600'}"
			role="switch"
			aria-checked={context.useCustomOrder}
			aria-label="Toggle custom bookmark order"
		>
			<span
				class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform {context.useCustomOrder
					? 'translate-x-6'
					: 'translate-x-1'}"
			></span>
		</button>
	</div>

	<!-- Bookmark Cards List -->
	<div class="mb-6 min-h-0 flex-1 space-y-2 overflow-y-auto">
		{#each context.cards as card, index (card.id)}
			<div
				class="group flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 ease-in-out {context.useCustomOrder
					? 'cursor-move'
					: ''} {draggedIndex === index
					? 'scale-95 border-blue-300 bg-blue-50 opacity-50 dark:border-blue-600 dark:bg-blue-900/20'
					: dragOverIndex === index && draggedIndex !== null
						? 'scale-95 border-blue-400 bg-blue-100 shadow-md dark:border-blue-500 dark:bg-blue-800/30'
						: 'border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800'}"
				draggable={context.useCustomOrder}
				ondragstart={() => handleDragStart(index)}
				ondragover={handleDragOver}
				ondragenter={(event) => handleDragEnter(event, index)}
				ondragleave={handleDragLeave}
				ondrop={(event) => handleDrop(event, index)}
				role={context.useCustomOrder ? 'button' : undefined}
				aria-label={context.useCustomOrder ? `Reorder ${card.title} bookmark card` : undefined}
			>
				{#if context.useCustomOrder}
					<div class="flex flex-col gap-1">
						<button
							onclick={() => handleMoveCardUp(index)}
							disabled={index === 0}
							class="p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-500 dark:hover:text-gray-300"
							aria-label="Move up"
						>
							<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
						<button
							onclick={() => handleMoveCardDown(index)}
							disabled={index === context.cards.length - 1}
							class="p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-500 dark:hover:text-gray-300"
							aria-label="Move down"
						>
							<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</div>
				{/if}

				<div class="min-w-0 flex-1">
					<div class="flex items-center gap-2">
						{#if context.useCustomOrder}
							<svg
								class="h-4 w-4 text-gray-400 dark:text-gray-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								></path>
							</svg>
						{/if}
						<span class="truncate text-sm font-medium text-gray-900 dark:text-white">
							{card.title}
						</span>
					</div>
					<div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
						{card.bookmarks.length} bookmark{card.bookmarks.length !== 1 ? 's' : ''}
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center py-8 text-gray-500 dark:text-gray-400">
				<p class="text-sm">No bookmark cards found</p>
				<p class="text-xs mt-1">Your bookmark folders will appear here</p>
			</div>
		{/each}
	</div>
</div>
