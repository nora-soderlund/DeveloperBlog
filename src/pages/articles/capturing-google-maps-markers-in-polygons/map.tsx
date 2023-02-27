import React, { Component } from "react";
import { Roboto } from "@next/font/google";
import Script from "next/script";

const roboto = Roboto({
    style: [ "normal", "italic" ],
    weight: [ "400", "500" ],
    subsets: [ "latin" ],
    display: "swap"
});

import style from "Styles/Modules/map.module.scss";

type MapPageProps = {
    apiKey: string;
};

type MapPageState = {
    status: "GEOLOCATION" | "OK";
    coordinates: [ number, number ] | null;
};

export async function getServerSideProps() {
    return {
        props: {
            apiKey: process.env.GOOGLE_MAPS_CLIENT_API_KEY
        }
    }
};

export default class MapPage extends Component<MapPageProps, MapPageState> {
    mapRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);

        this.mapRef = React.createRef();

        this.state = {
            status: "GEOLOCATION",
            coordinates: null
        };
    };

    mounted: boolean = false;

    componentDidMount() {
        if(this.mounted)
            return;

        this.mounted = true;

        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
            this.setState({
                coordinates: [ position.coords.latitude, position.coords.longitude ],
                status: "OK"
            });
        }, (error: GeolocationPositionError) => {
            this.setState({
                coordinates: null,
                status: "OK"
            });
        }, {
            enableHighAccuracy: true
        });

        window.initMap = () => {
            const center = { lat: -34.397, lng: 150.644 };

            const map = new google.maps.Map(this.mapRef.current, {
                center,
                zoom: 12,
            });

            const polygon = new google.maps.Polygon({
                map,
            
                clickable: false,
                
                strokeColor: "#4B91C3",
                strokeOpacity: 0.8,
                strokeWeight: 2,
            
                fillColor: "#4B91C3",
                fillOpacity: 0.5
            });

            const markers: any[] = [];

            for(let index = 0; index < 20; index++) {
                markers.push(new google.maps.Marker({
                    map,
                    position: {
                        lat: center.lat + ((Math.random() - 0.5) / 10),
                        lng: center.lng + ((Math.random() - 0.5) / 10)
                    }
                }));
            }

            let brushEnabled = false, brushPolygon: any[] = [], brushListeners: any[] = [], selectedMarkers: any[] = [];

            function createBoundsFromPath(path: any[]) {
                const bounds = new google.maps.LatLngBounds();
            
                path.forEach((coordinate) => bounds.extend(coordinate));
            
                return bounds;
            };

            function getMarkersInPolygon(polygon: any, markers: any[]) {
                const bounds = createBoundsFromPath(brushPolygon);
            
                return markers.filter((marker) => {
                    const position = marker.getPosition();
            
                    if(!bounds.contains(position))
                        return false;
            
                    if(!google.maps.geometry.poly.containsLocation(position, polygon))
                        return false;
            
                    return true;
                });
            };

            const brushControl = document.createElement("button");
            brushControl.className = "custom-control";
            brushControl.type = "button";

            function setBrushEnabled(state: boolean) {
                brushEnabled = state;
            
                if(!brushEnabled) {
                    map.setOptions({
                        gestureHandling: "auto",
                        keyboardShortcuts: true
                    });
                    
                    brushControl.textContent = "Enable brush selection";
                    brushControl.title = "Click to enable selecting markers by drawing";

                    brushListeners.forEach((listener) => {
                        google.maps.event.removeListener(listener);
                    });
                }
                else {
                    map.setOptions({
                        gestureHandling: "none",
                        keyboardShortcuts: false
                    });
                    
                    brushControl.textContent = "Disable brush selection";
                    brushControl.title = "Click to disable selecting markers by drawing";

                    let mousedown = false;

                    brushListeners.push(map.addListener("mousedown", (event: any) => {
                        mousedown = true;

                        brushPolygon = [ event.latLng ];
                        polygon.setPaths(brushPolygon);

                        selectedMarkers.forEach((marker) => {
                            marker.setAnimation(null);
                        });
    
                        selectedMarkers = [];
                    }));

                    brushListeners.push(map.addListener("mousemove", (event: any) => {
                        if(!mousedown)
                            return;

                        brushPolygon.push(event.latLng);
                        polygon.setPaths(brushPolygon);
                    }));

                    brushListeners.push(map.addListener("mouseup", (event: any) => {
                        mousedown = false;

                        brushPolygon.push(event.latLng);
                        polygon.setPaths(brushPolygon);

                        setBrushEnabled(false);

                        selectedMarkers = getMarkersInPolygon(polygon, markers);

                        selectedMarkers.forEach((marker) => {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        });
                    }));
                }
            };

            setBrushEnabled(false);

            brushControl.addEventListener("click", () => {
                setBrushEnabled(!brushEnabled);
            });

            const centerControl = document.createElement("div");
            centerControl.appendChild(brushControl);

            map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl);
        };
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
                                
                                <p><small>Your location is never saved and will not be known to my server on this page.</small></p>
                            </div>
                       </div>
                    );
                };
            }
        }
        
        return (
            <>
                <div ref={this.mapRef} className={style.map}></div>

                <Script src={`https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&callback=initMap&v=weekly`}/>
            </>
         );
    };
};
