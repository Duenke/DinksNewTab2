<script lang="ts">
	import {
		Header,
		SpinnerPage,
		ErrorPage,
		EmptyPage,
		EmptyFilterPage,
		Grid
	} from '$lib/components/main';
	import { SidePanel } from '$lib/components/settings';
	import { filterCards } from '$lib/utils';
	import { getGlobalContext } from '$lib/contexts/context.svelte';
	import type { BookmarkCard } from '$lib/types';

	const context = getGlobalContext();

	let searchQuery = $state('');
	let isPanelOpen = $state(false);
	let filteredBookmarkCards: BookmarkCard[] = $derived(filterCards(context.cards, searchQuery));
</script>

<svelte:head>
	<title>Dinks New Tab</title>
</svelte:head>

<main class="container mx-auto min-h-screen">
	<Header bind:searchQuery onOpen={() => (isPanelOpen = true)} />
	<SidePanel isOpen={isPanelOpen} onClose={() => (isPanelOpen = false)} />

	{#if context.loading}
		<SpinnerPage />
	{:else if context.error}
		<ErrorPage error={context.error} />
	{:else if context.cards.length === 0}
		<EmptyPage />
	{:else if filteredBookmarkCards.length === 0 && searchQuery.trim()}
		<EmptyFilterPage />
	{:else}
		<Grid bookmarkCards={filteredBookmarkCards} />
	{/if}
</main>
