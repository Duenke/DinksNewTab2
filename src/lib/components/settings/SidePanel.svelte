<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	import { Backdrop, CardSorter, Header, ThemePicker } from '$lib/components/settings';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	$effect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';

		return () => (document.body.style.overflow = '');
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (isOpen) {
				onClose();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<Backdrop {onClose} />

	<div
		class="fixed top-0 right-0 z-50 h-full w-80 border-l border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
		style="transform: translate3d(0, 0, 0); will-change: transform;"
		transition:fly={{ x: 320, duration: 250, easing: quartOut }}
	>
		<Header {onClose} />

		<div class="flex h-full flex-col space-y-6 overflow-y-auto p-6 pb-20">
			<ThemePicker />

			<CardSorter />
		</div>
	</div>
{/if}
