import { GithubNotification } from "Types";
import { ArticleResponse, ArticlesResponse, CodeResponse } from "Types/Responses";

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

    static async getGithubNotifications(): Promise<GithubNotification[]> {
        const response = await fetch(`/api/v1/github`);
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

    static async setArticleFeedbackBySlug(slug: string, feedback: boolean | null): Promise<void> {
        const response = await fetch(`/api/v1/articles/${slug}/feedback?feedback=${feedback}`);
        const result = await response.json();

        return result;
    };
};
