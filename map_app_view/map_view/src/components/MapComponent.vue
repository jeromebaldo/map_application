<template>
    <div ref="mapContainer" class="map-container"></div>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent, onMounted } from 'vue';
  import 'ol/ol.css';
  import { Map, View } from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import { fromLonLat } from 'ol/proj';
  
  export default defineComponent({
    name: 'MapComponent',
    setup() {
      const mapContainer = ref<HTMLElement | null>(null);
      const mapInstance = ref<Map | null>(null); // Variable pour stocker l'instance de la carte
  
      onMounted(() => {
        if (mapContainer.value) {
          mapInstance.value = new Map({
            target: mapContainer.value, // Utilise la référence ici
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            view: new View({
              center: fromLonLat([-73.5747, 45.504]), // Coordonnées de Montréal
              zoom: 12,
            }),
          });
        }
      });
  
      return {
        mapContainer,
        mapInstance, // On retourne mapInstance pour qu'il soit reconnu comme utilisé
      };
    },
  });
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 500px;
  }
  </style>
  
  