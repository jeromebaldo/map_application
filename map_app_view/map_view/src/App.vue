<template>
  <MapComponent />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MapComponent from './components/MapComponent.vue';
@Options({
  components: {
    MapComponent,
  },
})
export default class App extends Vue { }
</script>
