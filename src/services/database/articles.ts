import Database from "./../database";

import Tags, { Tag } from "./tags";

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

export default class Articles {
    static async getArticleBySlug(slug: string): Promise<Article | null> {
        const { error, row } = await Database.querySingleAsync(`SELECT id, slug, title, short, content, network, timestamp FROM articles WHERE slug = ${Database.escape(slug)}`);
        
        if(error) {
            console.error(`Fatally failed to get article by slug: ${slug} (code: ${error.code})`);

            return null;
        }

        if(!row) {
            console.warn(`Failed to find article by slug: ${slug}`);

            return null;
        }

        let tags: Tag[] | null = null;

        const articleTags: ArticleTag[] | null = await this.getArticleTags(row);

        if(articleTags !== null)
            tags = await Tags.getTagsByArticleTags(articleTags);

        return {
            ...row as Article,

            tags
        };
    };

    static async getArticleTags(article: Article): Promise<ArticleTag[] | null> {
        const { error, rows } = await Database.queryAsync(`SELECT tag FROM article_tags WHERE article = ${Database.escape(article.id)}`);

        if(error) {
            console.error(`Fatally failed to get article tags by id: ${article.id} (code: ${error.code})`);

            return null;
        }

        if(!rows.length)
            console.warn(`Failed to find article tags by id: ${article.id}`);

        return rows as ArticleTag[];
    };

    static async getArticleSlugsByPagination(start: number, limit: number, slug: string | null): Promise<ArticleSlugs[] | null> {
        const { error, rows } = await Database.queryAsync(`
            SELECT articles.id, articles.slug FROM articles
                INNER JOIN article_tags ON article_tags.article = articles.id
                INNER JOIN tags ON tags.id = article_tags.tag ${(slug !== null)?(`AND tags.slug = ${Database.escape(slug)}`):(" ")}
            WHERE hidden != 1 ${(start != 0)?(`AND articles.id < ${start}`):("")}
            GROUP BY articles.slug
            ORDER BY
                tags.priority DESC, timestamp DESC
            LIMIT ${limit}
        `);

        if(error) {
            console.error(`Fatally failed to get articles pagination: start ${start} limit ${limit} slug ${slug} (code: ${error.code})`);

            return null;
        }

        return rows as ArticleSlugs[];
    };
};
