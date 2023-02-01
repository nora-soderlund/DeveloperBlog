import type { NextApiRequest, NextApiResponse } from "next";

import { Canvas } from "canvas";

import GoogleMaps from "Services/GoogleMaps";
import GoogleMapsLimitations from "Services/GoogleMapsLimitations";

const size: [ number, number ] = [ 640, 360 ];
const zoom: number = 16;

export type MapRequest = {
    coordinates: [ number, number ] | null;
};

export type MapStatusResponse = {
    status: "OK" | "NO_RANGE" | "LIMIT_EXCEEDED";
};

export type MapImageResponse = {
    status: "OK";
    image: string;
    zoom: number;
    coordinates: [ number, number ];
    size: [ number, number ];
};

export default async function handler(request: NextApiRequest, response: NextApiResponse<MapStatusResponse | MapImageResponse>) {
    if((await GoogleMapsLimitations.hasDailyLimitedExceed())) {
        return response.status(200).json({
            status: "LIMIT_EXCEEDED"
        });
    }

    const body = JSON.parse(request.body) as MapRequest;

    const coordinates = body.coordinates ?? [ 58.37972798368953, 12.32480286523846 ];

    const image = await GoogleMaps.getMapImage(coordinates, size, zoom);

    if(image === null) {
        return response.status(200).json({
            status: "NO_RANGE"
        });
    }

    const canvas = new Canvas(size[0], size[1], "image");

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    response.status(200).json({
        status: "OK",
        image: canvas.toDataURL(),
        size,
        coordinates,
        zoom
    });
};
