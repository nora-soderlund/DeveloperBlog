import mysql from "mysql";

import config from "../../config.json" assert { type: "json" };

export default class Database {
    static connecting = null;
    static connection = null;

    static connectAsync() {
        // we return promises with no real usage because we still expect a promise even if we don't need one
        // this is because we want to intercept new connections as they happen during another connection

        if(this.connection !== null && this.connection.state !== "disconnected")
            return new Promise((resolve) => resolve({ error: null }));

        // if we're already connecting, we'll return the same promise, see comments above
        if(this.connecting !== null)
            return this.connecting;

        this.connecting = new Promise((resolve) => {
            this.connection = mysql.createConnection(config.database);
    
            this.connection.connect((error) => {
                this.connecting = null;

                resolve({ error });
            });
        });

        return this.connecting;
    };

    static async ensureConnectionAsync() {
        if(this.connection === null || this.connection.state === "disconnected") {
            const { error } = await this.connectAsync();

            if(error)
                throw new Error(error);
        }
    };

    static escape(input) {
        if(this.connection === null || this.connection.state === "disconnected")
            throw new Error("You must call Database.ensureConnectionAsync() before calling Database.escape()");

        return this.connection.escape(input);
    };

    static async queryAsync(query) {
        await this.ensureConnectionAsync();

        return new Promise(async (resolve) => {
            this.connection.query(query, (error, rows) => {
                if(error)
                    resolve({ error, rows });

                resolve({ error, rows });
            });
        });
    };

    static async querySingleAsync(query) {
        const { error, rows } = await this.queryAsync(query);

        if(error)
            return { error, row: null };

        if(!rows.length)
            return { error, row: null };

        return { error, row: rows[0] };
    };
};
