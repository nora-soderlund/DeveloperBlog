import { ArticlesResponse } from "../pages/api/v1/articles";
import { ArticleResponse } from "../pages/api/v1/articles/[slug]";
import { CodeResponse } from "../pages/api/v1/code";

export default class API {
    static async getArticleSlugsByPagination(start: number = 0, tag: string | null = null): Promise<ArticlesResponse | null> {
        const searchParams: URLSearchParams = new URLSearchParams();
        searchParams.append("start", start.toString());

        if(tag !== null)
            searchParams.append("tag", tag);

        const response = await fetch(`/api/v1/articles?${searchParams.toString()}`);
        const result = await response.json();

        return result;
    };

    static async getArticleBySlug(slug: string): Promise<ArticleResponse | null> {
        const response = await fetch(`/api/v1/articles/${slug}`);
        const result = await response.json();

        return result;
    };

    static async getCodeById(id: number): Promise<CodeResponse | null> {
        const response = await fetch(`/api/v1/code/${id}`);
        const result = await response.json();

        return result;
    };

    static async getCodeByBody(body: string, language: string | null): Promise<CodeResponse | null> {
        const searchParams: URLSearchParams = new URLSearchParams();
        
        if(language !== null)
            searchParams.append("language", language);

        const response = await fetch(`/api/v1/code?${searchParams.toString()}`, {
            method: "POST",
            body
        });

        const result = await response.json();

        return result;
    };
};
