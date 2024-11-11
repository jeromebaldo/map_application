<template>
  <div v-if="isOpened" class="modal-overlay">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <div>
        <h2>Please select a local file</h2>
        <input type="file" @change="handleFileSelection" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, inject } from 'vue';


export default defineComponent({
  name: 'ModalFileComponent',
  setup(_, { expose }) {
    const isOpened = ref(false);
    const selectedFile = ref<File | null>(null);
    const selectedFileName = ref<string | null>(null);
    const statusMessage = ref<string | null>(null);

    // Methods
    const openModal = () => {
      isOpened.value = true;
    };

    const closeModal = () => {
      isOpened.value = false;
    };

    const addLayer = inject('addLayer') as ((geometries: any[]) => void) | undefined; // eslint-disable-line no-unused-vars

    const handleFileSelection = (event: Event) => {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
        selectedFileName.value = input.files[0].name;
        closeModal();
        uploadFile();
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

          if (addLayer) {
            addLayer(response.data.geometries);
          } else {
            console.error('addLayer function not available');
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
