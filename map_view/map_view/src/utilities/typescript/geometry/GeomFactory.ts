import { Geometry, PolygonCustom, LineStringCustom, PointCustom } from './geometries';

// Singleton
export class GeometryFactory {

    private static instance: GeometryFactory;

    // Constructor to prevent instantiation
    private constructor() {}

    public static getInstance(): GeometryFactory {
        if (!GeometryFactory.instance) {
            GeometryFactory.instance = new GeometryFactory();
        }
        return GeometryFactory.instance;
    }

    public createGeometry(coords: [number, number][][] | [number, number][] | [number, number]): Geometry {
        if (Array.isArray(coords[0]) && Array.isArray(coords[0][0])) {

            return new PolygonCustom();

        } else if (Array.isArray(coords[0]) && !Array.isArray(coords[0][0])) {

            return new LineStringCustom();

        } else if (!Array.isArray(coords[0])) {

            return new PointCustom();
        } else {
            throw new Error("Invalid coordinates format");
        }
    }
}
