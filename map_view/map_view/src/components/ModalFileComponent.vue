<template>
  <div v-if="isOpened" class="modal-overlay">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <div>
        <h2>Veuillez sélectionner un fichier local</h2>
        <input type="file" @change="handleFileSelection" />
        <div v-if="selectedFileName" class="file-info">
          Fichier sélectionné : {{ selectedFileName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { defineComponent, ref, inject } from 'vue';
import { fromLonLat } from 'ol/proj';
import { Map as OlMap } from 'ol';

export default defineComponent({
  name: 'ModalFileComponent',
  setup(_, { expose }) {
    const isOpened = ref(false);
    const selectedFile = ref<File | null>(null);
    const selectedFileName = ref<string | null>(null);
    const statusMessage = ref<string | null>(null);

    // Inject the `getMapInstance` method
    const getMapInstance = inject<() => OlMap | null>('getMapInstance');

    // Methods
    const openModal = () => {
      isOpened.value = true;
    };

    const closeModal = () => {
      isOpened.value = false;
    };

    const handleFileSelection = (event: Event) => {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
        selectedFileName.value = input.files[0].name;
        uploadFile();
        closeModal();
      } else {
        selectedFile.value = null;
        selectedFileName.value = null;
      }
    };

    const uploadFile = async () => {
      if (selectedFile.value) {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile.value);

          const response = await axios.post('http://0.0.0.0:5000/import', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const geometries = response.data.geometries;

          const vectorSource = new VectorSource();

          for (const geometry of geometries) {
            
            let geomCarac = JSON.parse(geometry.coordinates);

            switch (geomCarac.type.toLowerCase()) {
              case "polygon": {
                const polygonsFeature = geomCarac.coordinates.map((polygon: number[][]) => {
                  return polygon.map((coord: number[]) => fromLonLat(coord));
                });

                let polygonFeature = new Feature({
                  geometry: new Polygon(polygonsFeature),
                });

                vectorSource.addFeature(polygonFeature);
                break;
              }

              case "linestring": {
                const lineCoordinates = geomCarac.coordinates.map((coord: number[]) => fromLonLat(coord));

                let lineFeature = new Feature({
                  geometry: new LineString(lineCoordinates),
                });

                vectorSource.addFeature(lineFeature);
                break;
              }

              case "point": {

                const pointCoordinates = fromLonLat([geomCarac.coordinates[0], geomCarac.coordinates[1]]);
                const pointFeature = new Feature({
                  geometry: new Point(pointCoordinates),
                });

                vectorSource.addFeature(pointFeature);
                break;
              }

              default: {
                console.error('Geometry type not supported : ' + geometry.type);
              }
            }
          }

          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          const mapInstance = getMapInstance ? getMapInstance() : null;
          if (mapInstance) {
            mapInstance.addLayer(vectorLayer);
          } else {
            console.error("Unable to obtain the card instance.");
          }

        } catch (error: any) {
          if (error.response) {
            statusMessage.value = `Server error : ${error.response.status} - ${error.response.data}`;
          } else if (error.request) {
            statusMessage.value = "Connection error: no response from the server.";
          } else {
            statusMessage.value = `Query error : ${error.message}`;
          }
        }
      } else {
        statusMessage.value = "Please select a file before sending.";
      }
    };

    // Expose methods to allow external components to control modal state
    expose({
      openModal,
      closeModal,
    });

    return {
      isOpened,
      openModal,
      closeModal,
      handleFileSelection,
      selectedFileName,
      selectedFile,
      statusMessage,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  cursor: pointer;
}

.file-info {
  margin-top: 10px;
  font-weight: bold;
}
</style>
