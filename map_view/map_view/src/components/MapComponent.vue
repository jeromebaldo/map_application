<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Zoom, defaults as defaultControls } from 'ol/control';

export default defineComponent({
  name: 'MapComponent',
  setup(_, { expose }) {
    const mapContainer = ref<HTMLElement | null>(null);
    const mapInstance = ref<Map | null>(null);

    // Initialize the board when the component is mounted
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
        console.log('Carte initialisée');
      } else {
        console.error('Impossible de trouver le conteneur pour la carte');
      }
    });

    // Exposes the card instance
    expose({
      getMapInstance: () => mapInstance.value,
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
