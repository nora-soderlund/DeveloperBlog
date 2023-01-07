import type { NextApiRequest, NextApiResponse } from "next";
import Articles from "../../../services/database/articles";

import { ArticleSlugs } from "../../../Types";
import { ArticlesResponse } from "../../../Types/Responses";

export default async function handler(request: NextApiRequest, response: NextApiResponse<ArticlesResponse | null>) {
    const start: number = (request.query.start !== undefined)?(Math.max(0, parseInt(request.query.start as string))):(0);
    const limit: number = 10;

    const article: ArticleSlugs[] | null = await Articles.getArticleSlugsByPagination(start, limit, (request.query.tag !== undefined)?(request.query.tag as string):(null));

    if(article === null)
        return response.status(400).json(null);

    response.status(200).json({
        paginatable: article.length == limit,
        articles: article.map((article) => article.slug),
        end: (article.length > 0)?(article.sort((a, b) => b.id - a.id)[0].id):(0)
    });
};
