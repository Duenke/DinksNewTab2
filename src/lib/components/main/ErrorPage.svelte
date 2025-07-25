<script lang="ts">
	interface Props {
		error: string;
	}

	let { error }: Props = $props();
</script>

<div class="text-center">
	<div
		class="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20"
	>
		<div class="mb-2 text-red-600 dark:text-red-400">
			<svg class="mx-auto h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
		</div>
		<h3 class="mb-2 text-lg font-semibold text-red-800 dark:text-red-300">
			Error Loading Bookmarks
		</h3>
		<p class="text-sm text-red-700 dark:text-red-400">{error}</p>
	</div>
</div>
