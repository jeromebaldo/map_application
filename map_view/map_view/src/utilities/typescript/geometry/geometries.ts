import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';

import { pointStyle, lineStyle, polygonStyle } from './style';

export abstract class Geometry {
    abstract addFeature(coords: any): Feature;
}

export class PolygonCustom extends Geometry {
    addFeature(coords: { coordinates: [number, number][][]; type: string }): Feature {
        
        const polyCoordinates = coords.coordinates.map(ring =>
            ring.map(coord => fromLonLat(coord))
        );

        const feature = new Feature({
            geometry: new Polygon(polyCoordinates),
        });

        feature.setStyle(polygonStyle);
        
        return feature;
    }
}

export class LineStringCustom extends Geometry {
    addFeature(coords: { coordinates:[number, number][]; type: string }): Feature {
        
        const LineCoordinates = coords.coordinates.map(coord => fromLonLat(coord));

        const feature = new Feature({
            geometry: new LineString(LineCoordinates),
        });

        feature.setStyle(lineStyle);
        
        return feature;
    }
}

export class PointCustom extends Geometry {
    addFeature(coords: { coordinates:[number, number]; type: string }): Feature {

        const feature = new Feature({
            geometry: new Point(fromLonLat(coords.coordinates)),
        });

        feature.setStyle(pointStyle);
        
        return feature;

    }
}
