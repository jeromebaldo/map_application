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
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { Map } from 'ol';

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

        // Utiliser watch pour attendre que mapInstance soit initialisé
        watch(
            () => props.mapInstance,
            (newMapInstance) => {
                if (newMapInstance) {
                    // Créer la couche vectorielle et l'ajouter à la carte
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

        const addGeometries = () => {
            if (!vectorLayer) {
                console.error('Vector layer is not available.');
                return;
            }

            const vectorSource = vectorLayer.getSource();
            if (!vectorSource) {
                console.error('Vector source is not available.');
                return;
            }

            // Ajouter des géométries à la source vectorielle
            const pointFeature = new Feature({
                geometry: new Point(fromLonLat([-71.0657, 48.4289])),
            });

            const lineFeature = new Feature({
                geometry: new LineString([
                    fromLonLat([-71.0657, 48.4289]),
                    fromLonLat([-71.1, 48.5]),
                ]),
            });

            const polygonFeature = new Feature({
                geometry: new Polygon([
                    [
                        fromLonLat([-71.0657, 48.4289]),
                        fromLonLat([-71.1, 48.5]),
                        fromLonLat([-71.2, 48.4]),
                        fromLonLat([-71.0657, 48.4289]),
                    ],
                ]),
            });

            vectorSource.addFeature(pointFeature);
            vectorSource.addFeature(lineFeature);
            vectorSource.addFeature(polygonFeature);
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

            // Supprimer toutes les géométries de la source vectorielle
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
