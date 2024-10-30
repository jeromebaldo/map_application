import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';

// Style pour un point
export const pointStyle = new Style({
    image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: '#ff0000' }),
        stroke: new Stroke({
            color: '#ffffff',
            width: 2,
        }),
    }),
});

// Style pour une ligne
export const lineStyle = new Style({
    stroke: new Stroke({
        color: '#00ff00',
        width: 2,
    }),
});

// Style pour un polygone
export const polygonStyle = new Style({
    stroke: new Stroke({
        color: '#0000ff',
        width: 2,
    }),
    fill: new Fill({
        color: 'rgba(0, 0, 255, 0.2)',
    }),
});
