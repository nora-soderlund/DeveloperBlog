import type { NextApiRequest, NextApiResponse } from "next";
import Articles, { Article, ArticleTag } from "../../../../services/database/articles";

export type ArticleResponse = {
    article: Article,
    feedback: boolean | null
};

export default async function handler(request: NextApiRequest, response: NextApiResponse<ArticleResponse | null>) {
    const compact: boolean = (request.query.compact === "true")?(true):(false);
    const slug: string = request.query.slug as string;

    const article: Article | null = await Articles.getArticleBySlug(slug);

    if(article === null)
        return response.status(400).json(null);

    /*let content = article.content;

    const matches = Array.from(article.content.matchAll(/\{CODE (.*)\}/g));

    for(let index = 0; index < matches.length; index++) {
        const match = matches[index];
        const parameters = match[1].split(" ");

        const row = await Database.querySingleAsync(`SELECT language, code FROM codes WHERE id = ${Database.escape(parameters[0])}`);

        const html = highlighter.codeToHtml(row.code, { lang: row.language });

        content = content.replace(match[0], `<div class="article-code" ${(parameters.length >= 2)?(`style="font-family: ${parameters[1]}"`):("")}>${html}</div>`);
    }

    let feedback = null;

    if(!compact) {
        feedback = await Database.querySingleAsync(`SELECT positive FROM article_feedback WHERE article = ${Database.escape(article.id)} AND user = ${Database.escape(request.server.client.address)}`);
    }*/

    response.status(200).json({
        article,
        feedback: null
    });
};
