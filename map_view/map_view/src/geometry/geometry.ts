import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';

// Fonction pour créer un point
export function createPoint(coords: [number, number]) {
    return new Feature({
        geometry: new Point(fromLonLat(coords)),
    });
}

// Fonction pour créer une ligne
export function createLineString(coords: [number, number][]) {
    return new Feature({
        geometry: new LineString(coords.map(coord => fromLonLat(coord))),
    });
}

// Fonction pour créer un polygone
export function createPolygon(coords: [number, number][][]) {
    return new Feature({
        geometry: new Polygon(coords.map(ring => ring.map(coord => fromLonLat(coord)))),
    });
}
