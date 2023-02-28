import type { NextApiRequest, NextApiResponse } from "next";
import Articles from "Services/Database/Articles";
import { Article } from "Types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<null>) {
    const slug: string = request.query.slug as string;

    const article: Article | null = await Articles.getArticleBySlug(slug);

    if(article === null || !article.example)
        return response.status(400).json(null);

    if(article.example.startsWith("google-maps"))
       return response.redirect(307, "/" + article.example + "/index.html?key=" + process.env.GOOGLE_MAPS_CLIENT_API_KEY);
       
    return response.status(400).json(null);
};
