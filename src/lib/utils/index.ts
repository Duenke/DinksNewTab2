import type { Bookmark, BookmarkCard } from '$lib/types';

export async function getBookmarkCards(): Promise<BookmarkCard[]> {
	if (typeof chrome === 'undefined' || !chrome.bookmarks) {
		// Return dummy chrome API is not available (development mode)
		return getDummyBookmarkCards();
	}

	try {
		const bookmarkTree = await new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
			chrome.bookmarks.getTree(resolve);
		});

		const cards: BookmarkCard[] = [];

		function processFolder(folder: chrome.bookmarks.BookmarkTreeNode, parentTitle?: string) {
			if (!folder.children) return;

			// Separate bookmarks and subfolders
			const bookmarks: Bookmark[] = [];
			const subfolders: chrome.bookmarks.BookmarkTreeNode[] = [];

			folder.children.forEach((child) => {
				if (child.url) {
					// It's a bookmark
					bookmarks.push({
						title: child.title,
						url: child.url,
						id: child.id
					});
				} else if (child.children) {
					// It's a folder
					subfolders.push(child);
				}
			});

			// Create a card for the current folder if it has bookmarks
			if (bookmarks.length > 0) {
				cards.push({
					id: folder.id,
					title: folder.title,
					bookmarks
				});
			}

			// Process subfolders recursively
			subfolders.forEach((subfolder) => {
				processFolder(subfolder, folder.title);
			});
		}

		// Process the root bookmark tree
		bookmarkTree.forEach((rootNode) => {
			if (rootNode.children) {
				rootNode.children.forEach((topLevelFolder) => {
					processFolder(topLevelFolder);
				});
			}
		});

		return cards;
	} catch (error) {
		console.error('Error fetching bookmarks:', error);
		return [];
	}
}

export function filterCards(cards: BookmarkCard[], searchTerm: string): BookmarkCard[] {
	if (!searchTerm.trim()) return cards;

	const query = searchTerm.toLowerCase();
	return cards
		.map((card) => {
			const filteredBookmarks = card.bookmarks.filter(
				(bookmark) =>
					bookmark.title.toLowerCase().includes(query) || bookmark.url.toLowerCase().includes(query)
			);

			return {
				...card,
				bookmarks: filteredBookmarks
			};
		})
		.filter((card) => card.bookmarks.length > 0);
}

export function sortCards(cards: BookmarkCard[], cardOrder: string[]): BookmarkCard[] {
	const cardsMap = new Map(cards.map((card) => [card.id, card]));

	// Start with saved order
	const ordered = cardOrder
		.map((id) => cardsMap.get(id))
		.filter((card): card is BookmarkCard => card !== undefined);

	// Add any new cards that weren't in the saved order to the end
	const existingIds = new Set(cardOrder);
	const newCards = cards.filter((card) => !existingIds.has(card.id));

	return [...ordered, ...newCards];
}

export function getNewOrder(fromIndex: number, toIndex: number, oldOrder: string[]): string[] {
	if (fromIndex === toIndex) return oldOrder;

	const newOrder = [...oldOrder];
	const [movedItem] = newOrder.splice(fromIndex, 1);
	newOrder.splice(toIndex, 0, movedItem);
	return newOrder;
}

export const themes = [
	{ value: 'light', label: 'Light', icon: '☀️' },
	{ value: 'dark', label: 'Dark', icon: '🌙' },
	{ value: 'system', label: 'System', icon: '💻' }
] as const;

function getDummyBookmarkCards(): BookmarkCard[] {
	return [
		{
			id: '1',
			title: 'Dummy Folder 1',
			bookmarks: [
				{ id: '1-1', title: 'Dummy Bookmark 1', url: 'https://example.com/1' },
				{ id: '1-2', title: 'Dummy Bookmark 2', url: 'https://example.com/2' }
			]
		},
		{
			id: '3',
			title: 'Dummy Folder 3',
			bookmarks: [
				{ id: '3-1', title: 'Dummy Bookmark 5', url: 'https://example.com/5' },
				{ id: '3-2', title: 'Dummy Bookmark 6', url: 'https://example.com/6' }
			]
		},
		{
			id: '4',
			title: 'Dummy Folder 4',
			bookmarks: [
				{ id: '4-1', title: 'Dummy Bookmark 7', url: 'https://example.com/7' },
				{ id: '4-2', title: 'Dummy Bookmark 8', url: 'https://example.com/8' }
			]
		},
		{
			id: '5',
			title: 'Dummy Folder 5',
			bookmarks: [
				{ id: '5-1', title: 'Dummy Bookmark 9', url: 'https://example.com/9' },
				{ id: '5-2', title: 'Dummy Bookmark 10', url: 'https://example.com/10' }
			]
		},
		{
			id: '6',
			title: 'Dummy Folder 6',
			bookmarks: [
				{ id: '6-1', title: 'Dummy Bookmark 11', url: 'https://example.com/11' },
				{ id: '6-2', title: 'Dummy Bookmark 12', url: 'https://example.com/12' }
			]
		},
		{
			id: '7',
			title: 'Dummy Folder 7',
			bookmarks: [
				{ id: '7-1', title: 'Dummy Bookmark 13', url: 'https://example.com/13' },
				{ id: '7-2', title: 'Dummy Bookmark 14', url: 'https://example.com/14' }
			]
		},
		{
			id: '8',
			title: 'Dummy Folder 8',
			bookmarks: [
				{ id: '8-1', title: 'Dummy Bookmark 15', url: 'https://example.com/15' },
				{ id: '8-2', title: 'Dummy Bookmark 16', url: 'https://example.com/16' }
			]
		},
		{
			id: '9',
			title: 'Dummy Folder 9',
			bookmarks: [
				{ id: '9-1', title: 'Dummy Bookmark 17', url: 'https://example.com/17' },
				{ id: '9-2', title: 'Dummy Bookmark 18', url: 'https://example.com/18' }
			]
		}
	];
}
