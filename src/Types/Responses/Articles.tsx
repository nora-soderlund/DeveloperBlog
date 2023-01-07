import { Article } from "../../Types";

export type ArticleResponse = {
    article: Article,
    feedback: boolean | null
};

export type ArticlesResponse = {
    paginatable: boolean,
    articles: string[],
    end: number
};
