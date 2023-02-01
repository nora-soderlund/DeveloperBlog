import { Image } from "canvas";
import GoogleMapsLimitations from "./GoogleMapsLimitations";

export default class GoogleMaps {
    static getImage(url: string): Promise<Image | null> {
        return new Promise((resolve) => {
            const image = new Image();
    
            image.onload = () => {
                resolve(image);
            };
    
            image.onerror = (error) => {
                resolve(null);
            };
    
            image.src = url.toString();
        });
    };

    static async getMapImage(coordinates: [ number, number ], size: [ number, number ], zoom: number): Promise<Image | null> {
        const url = new URL("https://maps.googleapis.com/maps/api/staticmap");
        url.searchParams.append("center", coordinates.join(','));
        url.searchParams.append("size", size.join('x'));
        url.searchParams.append("zoom", zoom.toString());
        url.searchParams.append("language", "SE-en");
        url.searchParams.append("key", process.env.GOOGLE_MAPS_API_KEY as string);

        GoogleMapsLimitations.log(url.toString());

        console.log(url.toString());

        return await this.getImage(url.toString());
    };
};
