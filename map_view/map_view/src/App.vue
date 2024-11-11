<template>
  <AppMapMain />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AppMapMain from './mainComponents/AppMapMain.vue';


@Options({
  components: {
    AppMapMain,
  },
})
export default class App extends Vue { }
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
