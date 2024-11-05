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
import MapComponent from './MapComponent.vue';
import ModalFileComponent from './ModalFileComponent.vue';
import LeftSideBarComponent from './LeftSideBarComponent.vue';

export default defineComponent({
  name: 'AppMap',
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
        if (mapInstance.value) {
          console.log('Map initialized.');
        }
      }
    });

    // Provide the `getMapInstance` function for child components
    provide('getMapInstance', () => mapInstance.value);

    // Provide the `openModal` function for child components
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
