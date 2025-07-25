<script lang="ts">
	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();
</script>

<div class="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
	<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
	<button
		onclick={onClose}
		class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
		aria-label="Close panel"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
			></path>
		</svg>
	</button>
</div>
