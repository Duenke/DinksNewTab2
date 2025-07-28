import { getContext, setContext } from 'svelte';
import { getBookmarkCards, sortCards } from '$lib/utils';
import type { BookmarkCard, Theme } from '$lib/types';

export class Context {
	defaultOrder: string[] = [];
	defaultCards: BookmarkCard[] = [];

	theme = $state<Theme>('system');
	cardOrder = $state<string[]>([]);
	useCustomOrder = $state(false);
	cards = $derived<BookmarkCard[]>(sortCards(this.defaultCards, this.cardOrder));
	loading = $state(true);
	error = $state<string | null>(null);

	constructor() {
		this.loadLocalStorage();

		$effect(() => {
			localStorage.setItem(THEME_KEY, this.theme);
			localStorage.setItem(CARD_ORDER_KEY, JSON.stringify(this.cardOrder));
			localStorage.setItem(USE_CUSTOM_ORDER_KEY, String(this.useCustomOrder));
		});
	}

	private async loadLocalStorage() {
		if (typeof window === 'undefined') return;

		const theme = localStorage.getItem(THEME_KEY) ?? 'system';
		const cardOrder = JSON.parse(localStorage.getItem(CARD_ORDER_KEY) ?? '[]');
		const useCustomOrder = localStorage.getItem(USE_CUSTOM_ORDER_KEY) === 'true';
		const cards = await getBookmarkCards();
		const defaultOrder = cards.map((card) => card.id);

		this.defaultOrder = defaultOrder;
		this.defaultCards = cards;

		this.theme = theme as Theme;
		this.cardOrder = cardOrder;
		this.useCustomOrder = useCustomOrder;
		this.loading = false;
	}
}

const CONTEXT_KEY = 'global_context';
const THEME_KEY = 'theme';
const CARD_ORDER_KEY = 'card_order';
const USE_CUSTOM_ORDER_KEY = 'use_custom_order';

export function setGlobalContext(context: Context) {
	return setContext(CONTEXT_KEY, context);
}

export function getGlobalContext() {
	const context = getContext<Context>(CONTEXT_KEY);
	if (!!context) return context;

	const errorMessage =
		'Global context not found. Make sure to call setGlobalContext in a parent component.';
	console.error(errorMessage);
	throw new Error(errorMessage);
}
