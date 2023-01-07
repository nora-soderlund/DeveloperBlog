import Database from "../Database";

import Tags from "./Tags";

import { Article, ArticleTag, ArticleSlugs, Tag } from "../../Types";

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

    static async getArticleFeedback(article: Article, remoteAddress: string): Promise<boolean | null> {
        const { error, row } = await Database.querySingleAsync(`SELECT positive FROM article_feedback WHERE article = ${Database.escape(article.id)} AND remoteAddress = ${Database.escape(remoteAddress)}`);

        if(error) {
            console.error(`Fatally failed to get article feedback by id ${article.id} and remote address ${remoteAddress} (code: ${error.code})`);

            return null;
        }

        if(!row)
            return null;

        return !!row.positive as boolean;
    };

    static async setArticleFeedback(article: Article, remoteAddress: string, feedback: boolean | null): Promise<boolean | null> {
        const currentFeedback: boolean | null = await this.getArticleFeedback(article, remoteAddress);

        if(currentFeedback === feedback)
            return !!feedback as boolean;
        
        if(feedback === null) {
            const { error, row } = await Database.querySingleAsync(`DELETE FROM article_feedback WHERE article = ${Database.escape(article.id)} AND remoteAddress = ${Database.escape(remoteAddress)}`);
    
            if(error) {
                console.error(`Fatally failed to delete article feedback by id ${article.id}, remote address ${remoteAddress} (code: ${error.code})`);
    
                return null;
            }

            return !!feedback as boolean;
        }

        if(currentFeedback === null) {
            const { error, row } = await Database.querySingleAsync(`INSERT INTO article_feedback (article, remoteAddress, positive, timestamp) VALUES (${Database.escape(article.id)}, ${Database.escape(remoteAddress)}, ${feedback}, ${Date.now()})`);

            if(error) {
                console.error(`Fatally failed to create article feedback by id ${article.id}, remote address ${remoteAddress}, and feedback ${feedback} (code: ${error.code})`);

                return null;
            }

            return !!feedback as boolean;
        }

        const { error, row } = await Database.querySingleAsync(`UPDATE article_feedback SET positive = ${Database.escape(feedback)}, timestamp = ${Database.escape(Date.now())} WHERE article = ${Database.escape(article.id)} AND remoteAddress = ${Database.escape(remoteAddress)}`);

        if(error) {
            console.error(`Fatally failed to update article feedback by id ${article.id}, remote address ${remoteAddress}, and feedback ${feedback} (code: ${error.code})`);

            return null;
        }

        return !!feedback as boolean;
    };
};
