import Database from "../Database";

import { GithubNotification } from "../../Types";

export default class Github {
    static async getGithubNotifications(): Promise<GithubNotification[]> {
        const connection = await Database.ensureConnectionAsync();

        const { error, rows } = await Database.queryAsync(connection, `SELECT * FROM github WHERE reason != "review_requested" ORDER BY updated_at DESC LIMIT 3`);
        
        connection.destroy();
        
        if(error) {
            console.error(`Fatally failed to get github notifications (code: ${error.code})`);

            return [];
        }

        return rows;
    };
};
