import type { NextApiRequest, NextApiResponse } from "next";

import Database from "Services/Database";

import { StatusResponse } from "Types/Responses";

export default async function handler(request: NextApiRequest, response: NextApiResponse<StatusResponse>) {
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
