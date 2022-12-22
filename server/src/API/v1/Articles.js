import Server from "../../Server.js";
import Database from "../../Database.js";

Server.register("GET", "/api/v1/articles", async (request, response) => {
    const rows = await Database.queryAsync("SELECT slug FROM articles ORDER BY timestamp DESC");

    return rows.map((row) => {
        return row.slug;
    });
});
