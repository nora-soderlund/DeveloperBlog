import { Tag } from "./Tags";

export type Article = {
    id: number,
    slug: string,
    title: string,
    short: string,
    content: string,
    network: string | null,
    timestamp: number,

    tags: Tag[] | null
};

export type ArticleTag = {
    id: number,
    tag: number,
    article: number
};

export type ArticleSlugs = {
    id: number,
    slug: string
};
