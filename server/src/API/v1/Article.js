import Server from "../../Server.js";
import Database from "../../Database.js";

import shiki from "shiki";

let highlighter = null;

shiki.getHighlighter({ theme: "github-dark" }).then((_highlighter) => {
    highlighter = _highlighter;
});

Server.register("GET", "/api/v1/article", async (request, response) => {
    const slug = request.server.url.searchParams.get("slug");

    const article = await Database.querySingleAsync(`SELECT id, title, short, content, timestamp FROM articles WHERE slug = ${Database.escape(slug)}`);

    if(!article)
        return null;

    const articleTags = await Database.queryAsync(`SELECT tag FROM article_tags WHERE article = ${Database.escape(article.id)}`);

    const tags = await Database.queryAsync(`SELECT slug, text FROM tags WHERE (${articleTags.map((articleTag) => `id = ${Database.escape(articleTag.tag)}`).join(" OR ")})`);

    const matches = article.content.matchAll(/\{CODE (\d+)\}/g);
    const codes = await Database.queryAsync(`SELECT id, language, code FROM codes WHERE (${Array.from(matches).map((match) => `id = ${Database.escape(match[1])}`).join(" OR ")})`);

    let content = article.content;

    codes.forEach((code) => {
        const html = highlighter.codeToHtml(code.code, { lang: code.language });

        content = content.replaceAll(`{CODE ${code.id}}`, `<div class="article-code">${html}</div>`);
    });

    return {
        title: article.title,
        short: article.short,
        content: content,

        timestamp: article.timestamp,

        tags: tags.map((tag) => {
            return {
                slug: tag.slug,
                text: tag.text
            };
        })
    };
});
