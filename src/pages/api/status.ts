import type { NextApiRequest, NextApiResponse } from "next";

import Database from "./../../services/database";

type Status = {
    health: string
};

export default async function handler(request: NextApiRequest, response: NextApiResponse<Status>) {
    response.status(200);

    const { error } = await Database.querySingleAsync("SELECT 1");

    if(error) {
        response.json({
            health: "BAD"
        });

        return;
    }

    response.json({
        health: "OK"
    });
};
