<script lang="ts">
	import { fly } from 'svelte/transition';
	import { themes } from '$lib/utils';
	import { getGlobalContext } from '$lib/contexts/context.svelte';
	import type { Theme } from '$lib/types';

	const context = getGlobalContext();

	let currentTheme = $derived(themes.find((t) => t.value === context.theme));
	let isThemeDropdownOpen = $state(false);

	function handleSelectTheme(themeValue: Theme) {
		context.theme = themeValue;
		isThemeDropdownOpen = false;
	}
</script>

<div class="flex-shrink-0 space-y-3">
	<h4 class="font-medium text-gray-900 dark:text-white">Theme</h4>
	<div class="relative">
		<button
			onclick={() => (isThemeDropdownOpen = !isThemeDropdownOpen)}
			class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
		>
			<span class="flex items-center gap-2">
				<span>{currentTheme?.icon}</span>
				<span>{currentTheme?.label}</span>
			</span>
			<svg
				class="h-4 w-4 transition-transform {isThemeDropdownOpen ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</button>

		{#if isThemeDropdownOpen}
			<div
				class="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-700"
				transition:fly={{ y: -5, duration: 150 }}
			>
				{#each themes as theme}
					<button
						onclick={() => handleSelectTheme(theme.value)}
						class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-600 {context.theme ===
						theme.value
							? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
							: ''}"
					>
						<span>{theme.icon}</span>
						<span>{theme.label}</span>
						{#if context.theme === theme.value}
							<svg class="ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
