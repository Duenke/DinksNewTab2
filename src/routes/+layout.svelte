<script lang="ts">
	import '../app.css';
	import { Context, setGlobalContext } from '$lib/contexts/context.svelte';

	let { children } = $props();

	const context = new Context();
	setGlobalContext(context);

	$effect(() => {
		document.documentElement.classList.toggle(
			'dark',
			context.theme === 'dark' ||
				(context.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	});
</script>

{@render children()}
