<template>
  <div ref="appMapRef" class="app-container">
    <MapComponent ref="mapComponentRef" />
    <ModalFileComponent ref="modalFileComponentRef" />
    <LeftSideBarComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, provide } from 'vue';
import { Map as OlMap } from 'ol';
import MapComponent from '../utilities/components/MapComponent.vue';
import ModalFileComponent from '../utilities/components/ModalFileComponent.vue';
import LeftSideBarComponent from '../utilities/components/LeftSideBarComponent.vue';

export default defineComponent({
  name: 'AppMapMain',
  components: {
    MapComponent,
    ModalFileComponent,
    LeftSideBarComponent,
  },
  setup() {
    const mapComponentRef = ref<any>(null);
    const mapInstance = ref<OlMap | null>(null);
    const modalFileComponentRef = ref<any>(null);

    onMounted(() => {
      if (mapComponentRef.value) {
        mapInstance.value = mapComponentRef.value.getMapInstance();
      }
    });

    provide('getMapInstance', () => mapInstance.value);
    
    provide('addLayer', (geometries: any[]) => {
      if (mapComponentRef.value) {
        mapComponentRef.value.addLayer(geometries);
      } else {
        console.error("Reference to MapComponent not found.");
      }
    });

    provide('openModal', () => {
      if (modalFileComponentRef.value) {
        modalFileComponentRef.value.openModal();
      } else {
        console.error("Reference to ModalFileComponent not found.");
      }
    });

    return {
      mapComponentRef,
      modalFileComponentRef,
      mapInstance,
    };
  },
});
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
