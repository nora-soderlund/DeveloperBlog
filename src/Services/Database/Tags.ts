import Database from "../Database";

import { ArticleTag, Tag } from "../../Types";

export default class Tags {
    static async getTagsById(ids: number[]): Promise<Tag[] | null> {
        await Database.ensureConnectionAsync();
        
        const { error, rows } = await Database.queryAsync(`SELECT slug, text, icon, shimmer, color FROM tags WHERE (${ids.map((id) => `id = ${Database.escape(id)}`).join(" OR ")}) ORDER BY priority DESC`);
        
        if(error) {
            console.error(`Fatally failed to get tags by ids: ${ids.join()} (code: ${error.code})`);

            return null;
        }

        if(!rows.length)
            console.warn(`Failed to find tags by ids: ${ids.join()}`);

        return rows as Tag[];
    };

    static async getTagsByArticleTags(articleTags: ArticleTag[]): Promise<Tag[] | null> {
        await Database.ensureConnectionAsync();
        
        const tags: Tag[] | null = await Tags.getTagsById(articleTags.map((articleTag) => articleTag.tag));

        if(!tags) {
            console.error(`Failed to get tags for article tags by ids: ${articleTags.map((articleTag: any) => articleTag.tag)}`);

            return null;
        }

        return tags as Tag[];
    };
};
