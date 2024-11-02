<template>
    <div class="left-sidebar">
        <form class="import-form" @submit.prevent="addGeometries">
            <button type="submit">IMPORT</button>
        </form>
        <form class="import-form" @submit.prevent="removeGeometries">
            <button type="submit">REINIT</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch, PropType } from 'vue';
import { fromLonLat } from 'ol/proj';
import { Map } from 'ol';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import axios from 'axios';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export default defineComponent({
    name: 'LeftSideBarComponent',
    props: {
        mapInstance: {
            type: Object as PropType<Map | null>,
            required: true,
        },
    },
    setup(props) {
        let vectorLayer: VectorLayer | null = null;

        watch(
            () => props.mapInstance,
            (newMapInstance) => {
                if (newMapInstance) {
                    vectorLayer = new VectorLayer({
                        source: new VectorSource(),
                        style: new Style({
                            image: new CircleStyle({
                                radius: 6,
                                fill: new Fill({ color: '#ff0000' }),
                                stroke: new Stroke({
                                    color: '#ffffff',
                                    width: 2,
                                }),
                            }),
                            stroke: new Stroke({
                                color: '#00ff00',
                                width: 2,
                            }),
                            fill: new Fill({
                                color: 'rgba(0, 255, 0, 0.2)',
                            }),
                        }),
                    });
                    newMapInstance.addLayer(vectorLayer);
                }
            },
            { immediate: true }
        );

        const addGeometries = async () => {
            if (!vectorLayer) {
                console.error('Vector layer is not available.');
                return;
            }

            const vectorSource = vectorLayer.getSource();
            if (!vectorSource) {
                console.error('Vector source is not available.');
                return;
            }

            try {
                const response = await axios.post('http://0.0.0.0:5000/import');
                const geometries = response.data.geometries;
                console.log(geometries);
                for (const geometry of geometries) {
                    switch (geometry.type) {
                        case "polygon": {

                            const polygonsFeature = geometry.coordinates.map((polygon: number[][]) => {
                                return polygon.map((coord: number[]) => fromLonLat(coord));
                            });

                            let polygonFeature = new Feature({
                                geometry: new Polygon(polygonsFeature),
                            });

                            vectorSource.addFeature(polygonFeature);
                            break;
                        }

                        case "linestring": {

                            const lineCoordinates = geometry.coordinates.map((coord: number[]) => fromLonLat(coord));

                            let lineFeature = new Feature({
                                geometry: new LineString(lineCoordinates),
                            });

                            vectorSource.addFeature(lineFeature);
                            break;
                        }

                        case "point": {

                            if (geometry.coordinates && geometry.coordinates.length === 2) {
                                const pointCoordinates = fromLonLat(geometry.coordinates);
                                let pointFeature = new Feature({
                                    geometry: new Point(pointCoordinates),
                                });
                                vectorSource.addFeature(pointFeature);
                            } else {
                                console.error("Invalid coordinates for point feature");
                            }
                            break;
                        }

                        default: {
                            console.log('pas le bon type: ' + geometry.type);
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to import geometries:', error);
            }
        };

            const removeGeometries = () => {
            if (!vectorLayer) {
                console.error('Vector layer is not available.');
                return;
            }

            const vectorSource = vectorLayer.getSource();
            if (!vectorSource) {
                console.error('Vector source is not available.');
                return;
            }

            vectorSource.clear();
        };

        return {
            addGeometries,
            removeGeometries,
        };
    },
});
</script>

<style scoped>
.left-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 5%;
    height: calc(100% - 60px);
    background-color: #4B6587;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.import-form {
    margin-top: 20px;
}

.import-form button {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #6C7A89;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.import-form button:hover {
    background-color: #A9A9A9;
}
</style>
