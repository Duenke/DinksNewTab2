<script lang="ts">
	import { quartOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onClose();
		}
	}
</script>

<div
	class="fixed inset-0 z-40 bg-black/25"
	onclick={handleBackdropClick}
	onkeydown={handleBackdropKeydown}
	role="button"
	tabindex="-1"
	aria-label="Close panel"
	transition:fade={{ duration: 200, easing: quartOut }}
></div>
