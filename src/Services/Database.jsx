import mysql from "mysql";

import config from "../../config.json" assert { type: "json" };

export default class Database {
    static connection = null;

    static connect() {
        return new Promise((resolve) => {
            this.connection = mysql.createConnection(config.database);
    
            this.connection.connect((error) => {
                resolve({ error });
            });
        });
    };

    static escape(input) {
        if(this.connection === null || this.connection.state === "disconnected")
            this.connect();
            
        return this.connection.escape(input);
    };

    static async queryAsync(query) {
        return new Promise((resolve) => {
            if(this.connection === null || this.connection.state === "disconnected")
                this.connect();

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
