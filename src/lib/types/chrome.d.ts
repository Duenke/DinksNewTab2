// Chrome bookmarks API types
declare namespace chrome {
	namespace bookmarks {
		interface BookmarkTreeNode {
			id: string;
			parentId?: string;
			index?: number;
			url?: string;
			title: string;
			dateAdded?: number;
			dateGroupModified?: number;
			unmodifiable?: string;
			children?: BookmarkTreeNode[];
		}

		function getTree(callback: (results: BookmarkTreeNode[]) => void): void;
		function getTree(): Promise<BookmarkTreeNode[]>;
	}
}

// Make chrome available globally
declare const chrome: typeof chrome;
