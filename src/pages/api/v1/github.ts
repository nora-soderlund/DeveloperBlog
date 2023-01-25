import type { NextApiRequest, NextApiResponse } from "next";

import Github from "Services/Database/Github";

import { GithubNotification } from "Types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<GithubNotification[]>) {
    const notifications: GithubNotification[] = await Github.getGithubNotifications();

    response.status(200).json(notifications);
};
