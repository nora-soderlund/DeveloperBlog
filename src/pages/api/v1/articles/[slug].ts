import type { NextApiRequest, NextApiResponse } from "next";
import Articles from "Services/Database/Articles";

import { Article } from "Types";
import { ArticleResponse } from "Types/Responses";

export default async function handler(request: NextApiRequest, response: NextApiResponse<ArticleResponse | null>) {
    // const compact: boolean = (request.query.compact === "true")?(true):(false);
    const slug: string = request.query.slug as string;

    const article: Article | null = await Articles.getArticleBySlug(slug);

    if(article === null)
        return response.status(400).json(null);

    const forwarded = request.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string" ? forwarded.split(/, /)[0] : request.socket.remoteAddress as string;

    const feedback: boolean | null = await Articles.getArticleFeedback(article, ip);

    response.status(200).json({
        article,
        feedback
    });
};
