<template>
    <div v-if="isOpened" class="modal-overlay">
      <div class="modal-content">
        <!-- Bouton pour fermer le modal -->
        <span class="close-button" @click="closeModal">&times;</span>
        <div>
          Voici le contenu de votre modal.
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ModalFileComponent',
    props: {
      isOpened: {
        type: Boolean,
        required: true,
      }
    },
    emits: ['update:isOpened'],
    methods: {
      closeModal() {
        // Émettre l'événement "update:isOpened" avec la valeur "false" pour fermer le modal
        this.$emit('update:isOpened', false);
      }
    }
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
  </style>
  