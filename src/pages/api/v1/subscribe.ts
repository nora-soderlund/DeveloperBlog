import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import Database from "Services/Database";

import { SubscribeResponse } from "Types/Responses";

export default async function handler(request: NextApiRequest, response: NextApiResponse<SubscribeResponse>) {
    const body = JSON.parse(request.body);
    
    const inactivity = body.inactivity !== "on";

    if(!body.email.length) {
        return response.status(200).json({
            errors: [
                [ "email", "You must enter your email!" ]
            ]
        });
    }

    if(!body.email.includes('@') || !body.email.includes('.') || body.email.length < 4) {
        return response.status(200).json({
            errors: [
                [ "email", "You must enter a valid email!" ]
            ]
        });
    }

    const id = randomUUID();

    const connection = await Database.ensureConnectionAsync();

    await Database.queryAsync(connection, `INSERT INTO subscriptions (id, email, firstname, inactivity, timestamp) VALUES (${connection.escape(id)}, ${connection.escape(body.email)}, ${((body.firstname.length)?(connection.escape(body.firstname)):("NULL"))}, ${connection.escape(inactivity)}, ${connection.escape(Date.now())})`)

    connection.destroy();

    response.status(200).json({});
};
