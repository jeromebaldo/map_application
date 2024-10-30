<template>
  <div ref="mapContainer" class="map-container"></div>
  <LeftSideBarComponent :mapInstance="mapInstance" />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LeftSideBarComponent from './LeftSideBarComponent.vue';
import { fromLonLat } from 'ol/proj';
import { Zoom, defaults as defaultControls } from 'ol/control';

export default defineComponent({
  name: 'MapComponent',
  components: {
    LeftSideBarComponent,
  },
  setup() {
    const mapContainer = ref<HTMLElement | null>(null);
    const mapInstance = ref<Map | null>(null);

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
      }
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
  background-color: #1E50D5;
  position: absolute;
  top: 60px;
  left: 200px;
  width: calc(100% - 200px);
  height: calc(100% - 60px);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* Assurer que les contrôles sont bien visibles */
}

/* Ajustement des contrôles OpenLayers pour les rendre complètement visibles */
.ol-control {
  margin: 10px;
  right: auto !important;
  /* Pour éviter les débordements sur le côté droit */
  bottom: auto !important;

  /* Ajouter dans votre style scoped ou global */
  .custom-zoom-control {
    background-color: #ffffff !important;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
    margin-left: 30px;
  }

  .custom-zoom-control button {
    color: #000 !important;
    /* Couleur de texte noir */
    font-weight: bold !important;
    /* Texte en gras */
  }

  .custom-zoom-control button:hover {
    background-color: #f0f0f0 !important;
    /* Couleur de fond sur survol */
  }
}
</style>