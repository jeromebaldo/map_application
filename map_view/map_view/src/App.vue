<template>
  <AppMap />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AppMap from './components/AppMap.vue';


@Options({
  components: {
    AppMap,
  },
})
export default class App extends Vue { }
</script>

<style>
#app {
  height: 100vh; /* Assurer que l'application prend tout l'écran */
  width: 100vw;
  overflow: hidden;
}
</style>
