<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Link } from '$lib/components/main';
	import type { BookmarkCard } from '$lib/types';

	interface Props {
		card: BookmarkCard;
	}

	let { card }: Props = $props();
</script>

<div
	class="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
>
	<h2
		class="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
	>
		{card.title}
	</h2>

	<div class="space-y-1">
		{#each card.bookmarks as bookmark, index}
			<div
				in:scale={{ duration: 200, delay: 50 + index * 30, easing: quintOut, start: 0.9 }}
				out:scale={{ duration: 150, easing: quintOut, start: 0.9 }}
			>
				<Link {bookmark} />
			</div>
		{/each}
	</div>
</div>
