import mysql from "mysql";

import config from "../../config.json" assert { type: "json" };

export default class Database {
    static connecting = null;
    static pool = null;

    static createPool() {
        if(this.pool !== null)
            return;

        this.pool = mysql.createPool({
            connectionLimit: 6,

            ...config.database
        });

        return this.pool;
    };

    static ensureConnectionAsync() {
        return new Promise(async (resolve) => {
            if(this.pool === null) {
                const { error } = this.createPool();
    
                if(error)
                    throw new Error(error);
            }
    
            this.pool.getConnection((error, connection) => {
                resolve(connection);
            });
        });
    };

    static async queryAsync(connection, query) {
        return new Promise(async (resolve) => {
            if(query == undefined) {
                query = connection;
                connection = this.pool;
            }

            connection.query(query, (error, rows) => {
                if(error)
                    resolve({ error, rows });

                resolve({ error, rows });
            });
        });
    };

    static async querySingleAsync(connection, query) {
        const { error, rows } = await this.queryAsync(connection, query);

        if(error)
            return { error, row: null };

        if(!rows.length)
            return { error, row: null };

        return { error, row: rows[0] };
    };
};
