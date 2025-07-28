<script lang="ts">
	interface Props {
		searchQuery: string;
		onOpen: () => void;
	}

	let { searchQuery = $bindable(), onOpen }: Props = $props();

	let timer = 0;

	function handleKeyup(event: KeyboardEvent) {
		const { value } = event.target as HTMLInputElement;
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchQuery = value;
		}, 200);
	}
</script>

<header class="relative mx-auto mb-8 max-w-2xl text-center">
	<input
		class="search"
		onkeyup={handleKeyup}
		type="text"
		placeholder="Search bookmarks by title or URL..."
	/>
	<button class="gear-icon" onclick={onOpen} aria-label="Open settings panel">
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
			></path>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			></path>
		</svg>
	</button>
</header>

<style>
	@reference "../../../app.css";

	.search {
		@apply w-full rounded-xl border border-gray-300 bg-white px-6 py-4 pr-16 text-lg text-black placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400;
	}

	.gear-icon {
		@apply absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition-all duration-200 hover:scale-110 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300;
	}
</style>
