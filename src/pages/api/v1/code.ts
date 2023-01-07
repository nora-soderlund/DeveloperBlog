import type { NextApiRequest, NextApiResponse } from "next";
import Codes, { Code } from "../../../services/database/codes";

import shiki from "shiki";

import { CodeResponse } from "../../../Types/Responses";

export default async function handler(request: NextApiRequest, response: NextApiResponse<CodeResponse | null>) {
    if(request.body === undefined)
        return response.status(400).json(null);

    const language: string | undefined = (request.query.language)?(request.query.language as string):(undefined);
    const body: string = request.body;

    const highlighter = await shiki.getHighlighter({ theme: "github-dark" });

    const html = highlighter.codeToHtml(body, { lang: language });

    response.status(200).json({
        code: null,
        html
    });
};
