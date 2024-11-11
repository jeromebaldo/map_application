<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { Map, View } from 'ol';
import { Zoom, defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { GeometryFactory } from '../typescript/geometry/GeomFactory';

export default defineComponent({
  name: 'MapComponent',
  setup(_, { expose }) {
    const mapContainer = ref<HTMLElement | null>(null);
    const mapInstance = ref<Map | null>(null);

    // Initialise la carte lorsque le composant est monté
    onMounted(() => {
      if (mapContainer.value) {
        mapInstance.value = new Map({
          target: mapContainer.value,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([-71.0657, 48.4289]),
            zoom: 12,
          }),
          controls: defaultControls({ attribution: false, rotate: false, zoom: false }).extend([
            new Zoom({
              className: 'custom-zoom-control',
            }),
          ]),
        });
      } else {
        console.error('Impossible de trouver le conteneur pour la carte');
      }
    });

    // To add vecto layer
    const addLayer = (geometries: any[]) => {
      if (!mapInstance.value) {
        console.error('The map is not yet initialized');
        return;
      }

      const vectorSource = new VectorSource();
      const factoryGeom = GeometryFactory.getInstance();

      for (const geometry of geometries) {
        
        let geomCarac = JSON.parse(geometry.coordinates);
        let geomObject = factoryGeom.createGeometry(geomCarac.coordinates);
        let geomFeature = geomObject.addFeature(geomCarac);

        vectorSource.addFeature(geomFeature);
      }

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      mapInstance.value.addLayer(vectorLayer);
    };

    // Expose functions to other components
    expose({
      getMapInstance: () => mapInstance.value,
      addLayer,
    });

    return {
      mapContainer,
      mapInstance,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #1E50D5;
}
</style>
