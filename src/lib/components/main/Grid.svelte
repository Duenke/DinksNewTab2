<script lang="ts">
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { Card } from '$lib/components/main';
	import type { BookmarkCard } from '$lib/types';

	interface Props {
		bookmarkCards: BookmarkCard[];
	}

	let { bookmarkCards }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each bookmarkCards as card (card.id)}
		<div
			out:scale={{ duration: 200, easing: quintOut, start: 0.8 }}
			animate:flip={{ duration: 400, easing: quintOut }}
			class="h-full"
		>
			<Card {card} />
		</div>
	{/each}
</div>
