import React, { Component } from "react";
import { Roboto } from "@next/font/google";

import { MapImageResponse } from "pages/api/v1/articles/static-google-maps-coordinate-projection/map";

const roboto = Roboto({
    style: [ "normal", "italic" ],
    weight: [ "400", "500" ],
    subsets: [ "latin" ],
    display: "swap"
});

import style from "Styles/Modules/map.module.scss";
import StaticMapProjection from "Services/StaticMapProjection";

type MapPageState = {
    status: "GEOLOCATION" | "OK" | "NO_RANGE" | "LIMIT_EXCEEDED";
    image: MapImageResponse | null;
};

export default class MapPage extends Component<{}, MapPageState> {
    canvas: React.RefObject<any>;

    constructor(props: any) {
        super(props);

        this.canvas = React.createRef();

        this.state = {
            status: "GEOLOCATION",
            image: null
        };
    };

    mounted: boolean = false;

    componentDidMount() {
        if(this.mounted)
            return;

        this.mounted = true;

        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
            this.setMapCoordinates([ position.coords.latitude, position.coords.longitude ]);
        }, (error: GeolocationPositionError) => {
            this.setMapCoordinates(null);
        }, {
            enableHighAccuracy: true
        });
    };

    async setMapCoordinates(coordinates: [ number, number ] | null) {
        const response = await fetch("/api/v1/articles/static-google-maps-coordinate-projection/map", {
            method: "POST",
            body: JSON.stringify({ coordinates })
        });

        const result = await response.json() as MapImageResponse;

        if(result.status !== "OK") {
            this.setState({
                status: result.status
            });

            return;
        }

        this.setState({
            status: result.status,
            image: result
        }, () => {
            const image = new Image();

            image.onload = () => {
                const context = this.canvas.current.getContext("2d");

                context.drawImage(image, 0, 0);
            };

            image.src = result.image;
        });
    };

    onMapClick(event: any) {
        event.preventDefault();

        if(this.state.image === null)
            return;

        const tileSize = StaticMapProjection.getTileSize(this.state.image.zoom);

        const centerWorldCoordinates = StaticMapProjection.getMercatorWorldCoordinateProjection(tileSize, tileSize, this.state.image.coordinates[0], this.state.image.coordinates[1]);
        const centerPixelCoordinates = StaticMapProjection.getPixelCoordinates(this.state.image.zoom, centerWorldCoordinates.left, centerWorldCoordinates.top);

        const relativePixelCoordinates = StaticMapProjection.getRelativePixelCoordinates(this.canvas.current.width, this.canvas.current.height, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        const pixelCoordinates = StaticMapProjection.getAbsolutePixelCoordinates(centerPixelCoordinates, relativePixelCoordinates);

        const worldCoordinates = StaticMapProjection.getWorldCoordinates(this.state.image.zoom, pixelCoordinates);

        const coordinates = StaticMapProjection.getCoordinatesFromMercatorWorldCoordinates(tileSize, tileSize, worldCoordinates);

        const url = `https://www.google.com/maps/search/?api=1&map_action=map&query=${coordinates.latitude},${coordinates.longitude}`;

        window.open(url, "_blank")?.focus();
    };

    render() {
        if(this.state.status !== "OK") {
            switch(this.state.status) {
                case "GEOLOCATION": {
                    return (
                       <div className={`${roboto.className} ${style.map}`}>
                            <div className={style.overlay}>
                                <h1>Geolocation permissions</h1>
            
                                <p>Please accept or deny the geolocation request dialog.</p>
                                
                                <p><small>Your location is never saved and as soon as it&apos;s reached my server, it will be forgotten about.</small></p>
                            </div>
                       </div>
                    );
                };
                
                case "NO_RANGE": {
                    return (
                       <div className={`${roboto.className} ${style.map}`}>
                            <div className={style.overlay}>
                                <h1>Sorry!</h1>
            
                                <p>Google Maps doesn&apos;t have any static map range over your coordinates.</p>
                            </div>
                       </div>
                    );
                };
                
                case "LIMIT_EXCEEDED": {
                    return (
                       <div className={`${roboto.className} ${style.map}`}>
                            <div className={style.overlay}>
                                <h1>Sorry!</h1>
            
                                <p>I have to limit my Google Maps API requests to not impose further costs to my bill.</p>
                                <p>You can check back tomorrow at midnight if you want to see this demo.</p>
                            </div>
                       </div>
                    );
                };
            }
        }
        
        return (
            <div className={`${roboto.className} ${style.map}`}>
                 <a href="https://www.google.com/maps/..." onClick={(event) => this.onMapClick(event)}>
                    <canvas ref={this.canvas} width={this.state.image?.size[0]} height={this.state.image?.size[1]}/>
                </a>
            </div>
         );
    };
};
