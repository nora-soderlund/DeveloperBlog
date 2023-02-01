export default class StaticMapProjection {
    static getMercatorWorldCoordinateProjection(width: number, height: number, latitude: number, longitude: number) {
        let latitudeToRadians = ((latitude * Math.PI) / 180);
        let northing = Math.log(Math.tan((Math.PI / 4) + (latitudeToRadians / 2)));
    
        return {
            left: ((longitude + 180) * (250 / 360)),
            top: ((250 / 2) - ((250 * northing) / (2 * Math.PI)))
        };
    };

    static getTileSize(zoomLevel: number) {
        return zoomLevel * 256;
    };

    static getPixelCoordinates(zoomLevel: number, leftWorldCoordinate: number, topWorldCoordinate: number) {
        return {
            left: leftWorldCoordinate * (2 ** zoomLevel),
            top: topWorldCoordinate * (2 ** zoomLevel)
        };
    };

    static getRelativePixelCoordinates(width: number, height: number, offsetLeft: number, offsetTop: number) {
        return {
            left: offsetLeft - (width / 2),
            top: offsetTop - (height / 2)
        };
    };

    static getAbsolutePixelCoordinates(pixelCoordinates: { left: number, top: number }, relativePixelCoordinates: { left: number, top: number }) {
        return {
            left: pixelCoordinates.left + relativePixelCoordinates.left,
            top: pixelCoordinates.top + relativePixelCoordinates.top
        };
    };

    static getWorldCoordinates(zoomLevel: number, pixelCoordinates: { left: number, top: number }) {
        return {
            left: pixelCoordinates.left / (2 ** zoomLevel),
            top: pixelCoordinates.top / (2 ** zoomLevel)
        };
    };

    static getCoordinatesFromMercatorWorldCoordinates(width: number, height: number, worldCoordinates: { left: number, top: number }) {
        let northing = (2 * Math.atan(Math.exp(((250 / 2) - worldCoordinates.top) * (2 * Math.PI) / 250))) - (Math.PI / 2);
        
        return {
            latitude: northing * 180 / Math.PI,
            longitude: (worldCoordinates.left * 360 / 250) - 180
        };
    };
};
