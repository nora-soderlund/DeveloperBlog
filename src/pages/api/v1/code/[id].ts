import type { NextApiRequest, NextApiResponse } from "next";
import Codes, { Code } from "../../../../services/database/codes";
import { CodeResponse } from "../code";

import shiki from "shiki";

export default async function handler(request: NextApiRequest, response: NextApiResponse<CodeResponse | null>) {
    const id: number = parseInt(request.query.id as string);

    const code: Code | null = await Codes.getCodeById(id);

    if(code === null)
        return response.status(400).json(null);

    const highlighter = await shiki.getHighlighter({ theme: "github-dark" });

    const html = highlighter.codeToHtml(code.code, { lang: code.language });

    response.status(200).json({
        code,
        html
    });
};
