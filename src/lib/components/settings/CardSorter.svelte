<script lang="ts">
	import { getGlobalContext } from '$lib/contexts/context.svelte';
	import { getNewOrder } from '$lib/utils';

	const context = getGlobalContext();

	let draggedIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	function handleToggleCustom() {
		context.useCustomOrder = !context.useCustomOrder;
		context.cardOrder = context.useCustomOrder ? context.defaultOrder : [];
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
		draggedIndex = null;
		dragOverIndex = null;
	}

	function handleMoveCardUp(index: number) {
		if (index > 0) {
			context.cardOrder = getNewOrder(index, index - 1, context.cardOrder);
		}
	}

	function handleMoveCardDown(index: number) {
		if (index < context.cards.length - 1) {
			context.cardOrder = getNewOrder(index, index + 1, context.cardOrder);
		}
	}
</script>

<div class="sort-container">
	<div class="header">
		<div class="header-content">
			<h4 class="title">Bookmark Order</h4>
			<span class="subtitle">
				{context.useCustomOrder ? 'Drag to reorder cards' : 'Cards shown in default order'}
			</span>
		</div>
		<button
			class="toggle-switch"
			class:toggle-switch--active={context.useCustomOrder}
			onclick={handleToggleCustom}
			role="switch"
			aria-checked={context.useCustomOrder}
			aria-label="Toggle custom bookmark order"
		>
			<span class="toggle-knob" class:toggle-knob--active={context.useCustomOrder}></span>
		</button>
	</div>

	<!-- Bookmark Cards List -->
	<div class="cards-list">
		{#each context.cards as card, index (card.id)}
			<div
				class="card-item"
				class:card-item--draggable={context.useCustomOrder}
				class:card-item--dragged={draggedIndex === index}
				class:card-item--drag-over={dragOverIndex === index && draggedIndex !== null}
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
					<div class="controls">
						<button
							onclick={() => handleMoveCardUp(index)}
							disabled={index === 0}
							class="control-button"
							aria-label="Move up"
						>
							<svg class="control-icon" fill="currentColor" viewBox="0 0 20 20">
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
							class="control-button"
							aria-label="Move down"
						>
							<svg class="control-icon" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</div>
				{/if}

				<div class="card-content">
					<div class="card-header">
						{#if context.useCustomOrder}
							<svg class="drag-icon" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								></path>
							</svg>
						{/if}
						<span class="card-title">
							{card.title}
						</span>
					</div>
					<div class="card-subtitle">
						{card.bookmarks.length} bookmark{card.bookmarks.length !== 1 ? 's' : ''}
					</div>
				</div>
			</div>
		{:else}
			<div class="empty-state">
				<p class="empty-state-title">No bookmark cards found</p>
				<p class="empty-state-subtitle">Your bookmark folders will appear here</p>
			</div>
		{/each}
	</div>
</div>

<style>
	@reference "../../../app.css";

	.sort-container {
		@apply flex min-h-0 flex-1 flex-col space-y-3;
	}

	.header {
		@apply flex flex-shrink-0 items-center justify-between;
	}

	.header-content {
		@apply flex flex-col;
	}

	.title {
		@apply font-medium text-gray-900 dark:text-white;
	}

	.subtitle {
		@apply text-xs text-gray-500 dark:text-gray-400;
	}

	.toggle-switch {
		@apply relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-600;
	}

	.toggle-switch--active {
		@apply bg-blue-600;
	}

	.toggle-knob {
		@apply inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white shadow-lg transition-transform;
	}

	.toggle-knob--active {
		@apply translate-x-6;
	}

	.cards-list {
		@apply mb-6 min-h-0 flex-1 space-y-2 overflow-y-auto;
	}

	.card-item {
		@apply flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-200 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800;
	}

	.card-item--draggable {
		@apply cursor-move;
	}

	.card-item--dragged {
		@apply scale-95 border-blue-300 bg-blue-50 opacity-50 dark:border-blue-600 dark:bg-blue-900/20;
	}

	.card-item--drag-over {
		@apply scale-95 border-blue-400 bg-blue-100 shadow-md dark:border-blue-500 dark:bg-blue-800/30;
	}

	.controls {
		@apply flex flex-col gap-1;
	}

	.control-button {
		@apply p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-500 dark:hover:text-gray-300;
	}

	.control-icon {
		@apply h-3 w-3;
	}

	.card-content {
		@apply min-w-0 flex-1;
	}

	.card-header {
		@apply flex items-center gap-2;
	}

	.drag-icon {
		@apply h-4 w-4 text-gray-400 dark:text-gray-500;
	}

	.card-title {
		@apply truncate text-sm font-medium text-gray-900 dark:text-white;
	}

	.card-subtitle {
		@apply mt-1 text-xs text-gray-500 dark:text-gray-400;
	}

	.empty-state {
		@apply py-8 text-center text-gray-500 dark:text-gray-400;
	}

	.empty-state-title {
		@apply text-sm;
	}

	.empty-state-subtitle {
		@apply mt-1 text-xs;
	}
</style>
