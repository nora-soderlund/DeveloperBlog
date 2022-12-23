import Server from "../../../Server.js";
import Database from "../../../Database.js";

Server.register("GET", "/api/v1/article/feedback", async (request, response) => {
    const slug = request.server.url.searchParams.get("slug");
    const positive = request.server.url.searchParams.get("positive");

    const article = await Database.querySingleAsync(`SELECT id FROM articles WHERE slug = ${Database.escape(slug)}`);

    if(!article)
        return null;

    const user = request.socket.remoteAddress;

    const existing = await Database.querySingleAsync(`SELECT id, positive FROM article_feedback WHERE article = ${Database.escape(article.id)} AND user = ${Database.escape(user)}`);

    if(!existing)
        await Database.querySingleAsync(`INSERT INTO article_feedback (article, user, positive, timestamp) VALUES (${Database.escape(article.id)}, ${Database.escape(user)}, ${Database.escape((positive == "true"))}, ${Database.escape(Date.now())})`);
    else if(existing.positive == (positive == "true"))
        await Database.querySingleAsync(`DELETE FROM article_feedback WHERE id = ${Database.escape(existing.id)}`);
    else
        await Database.querySingleAsync(`UPDATE article_feedback SET positive = ${Database.escape(positive == "true")}, timestamp = ${Database.escape(Date.now())} WHERE id = ${Database.escape(existing.id)}`);

    return await Database.querySingleAsync(`SELECT positive FROM article_feedback WHERE article = ${Database.escape(article.id)} AND user = ${Database.escape(user)}`);
});
