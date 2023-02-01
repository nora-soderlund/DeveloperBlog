// All values are in USD, fetched from https://developers.google.com/maps/documentation/maps-static/usage-and-billing
// This class is only limited to the Static Maps API

import Database from "./Database";

export default class GoogleMapsLimitations {
    static budget = 200.0;

    static pricePerThousands = 2.00;

    static monthlyRequestThousands = this.budget / this.pricePerThousands;
    static weeklyRequestThousands = this.monthlyRequestThousands / 4;
    static dailyRequestThousands = this.weeklyRequestThousands / 7;

    static async hasDailyLimitedExceed() {
        const connection = await Database.ensureConnectionAsync();

        const date = new Date();

        date.setHours(0, 0, 0, 0);

        const { error, row } = await Database.querySingleAsync(connection, `SELECT COUNT(id) AS count FROM requests WHERE timestamp > ${connection.escape(date.getTime())}`);

        connection.destroy();

        if(!error && (row && (row.count / 1000) >= this.dailyRequestThousands))
            return true;

        return false;
    };

    static async log(url: string) {
        const connection = await Database.ensureConnectionAsync();

        await Database.queryAsync(connection, `INSERT INTO requests (url, timestamp) VALUES (${connection.escape(url)}, ${connection.escape(Date.now())})`);

        connection.destroy();
    };
};
