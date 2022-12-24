import Server from "../../Server.js";
import Database from "../../Database.js";

Server.register("GET", "/api/v1/articles", async (request, response) => {
    let query = "SELECT slug FROM articles WHERE hidden != 1 ORDER BY timestamp DESC";

    const tagsParams = request.server.url.searchParams.get("tags");

    if(tagsParams) {
        query = `
            WITH tag_articles AS (
                SELECT article_tags.id
                FROM tags
                INNER JOIN article_tags ON tag = tags.id
                WHERE (${tagsParams.split(',').map((tag) => `tags.slug = ${Database.escape(tag)}`).join(" OR ")})
            )
            SELECT articles.slug
            FROM articles
            INNER JOIN tag_articles ON articles.id = tag_articles.id
            ORDER BY articles.timestamp DESC
        `;
    }

    const rows = await Database.queryAsync(query);

    return rows.map((row) => {
        return row.slug;
    });
});
