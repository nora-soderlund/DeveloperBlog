import type { NextApiRequest, NextApiResponse } from "next";
import Articles from "Services/Database/Articles";

import { Article } from "Types";
import { ArticleResponse } from "Types/Responses";

export default async function handler(request: NextApiRequest, response: NextApiResponse<boolean | null>) {
    const slug: string = request.query.slug as string;
    const feedback: boolean | null = (request.query.feedback === "true")?(true):(
        (request.query.feedback === "false")?(false):(null)
    );

    const article: Article | null = await Articles.getArticleBySlug(slug);

    if(article === null)
        return response.status(400).json(null);

    await Articles.setArticleFeedback(article, (request.headers["CF-Connecting-IP"] ?? request.socket.remoteAddress) as string, feedback);

    response.status(200).json(feedback);
};
