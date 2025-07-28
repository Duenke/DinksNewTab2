<script lang="ts">
	import type { Bookmark } from '$lib/types';

	interface Props {
		bookmark: Bookmark;
	}

	let { bookmark }: Props = $props();
</script>

<a href={bookmark.url} class="link" target="_self">
	<div class="flex items-center space-x-3">
		<img
			class="favicon"
			src="https://www.google.com/s2/favicons?domain={new URL(bookmark.url).hostname}&sz=16"
			alt=""
			loading="lazy"
		/>
		<span class="title">
			{bookmark.title}
		</span>
	</div>
</a>

<style>
	@reference "../../../app.css";

	.link {
		@apply block rounded-md p-3 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700;
	}

	.favicon {
		@apply h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110;
	}

	.title {
		@apply truncate text-gray-700 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400;
	}
</style>
