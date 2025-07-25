import { themes } from '$lib/utils';

export interface BookmarkCard {
	id: string;
	title: string;
	bookmarks: Bookmark[];
}

export interface Bookmark {
	id: string;
	title: string;
	url: string;
}

export type Theme = (typeof themes)[number]['value'];
