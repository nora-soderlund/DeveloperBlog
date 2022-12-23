import mysql from "mysql";

import config from "./../config.json" assert { type: "json" };

export default class Database {
    static connection = null;

    static connect() {
        this.connection = mysql.createConnection(config.database);

        this.connection.connect();
    };

    static escape(input) {
        return this.connection.escape(input);
    };

    static async queryAsync(query) {
        return new Promise((resolve) => {
            this.connection.query(query, (error, rows) => {
                if(error)
                    throw error;

                resolve(rows);
            });
        });
    };

    static async querySingleAsync(query) {
        const result = await this.queryAsync(query);

        if(!result.length)
            return null;

        return result[0];
    };
};
