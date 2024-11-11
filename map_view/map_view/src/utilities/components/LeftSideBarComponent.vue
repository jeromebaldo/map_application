<template>
    <div class="left-sidebar">
        <form class="import-form" @submit.prevent="importFileModal">
            <button type="submit">IMPORT</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'LeftSideBarComponent',
    setup() {

        // Inject the `openModal` method
        const openModal = inject<() => void>('openModal');

        const importFileModal = () => {
            if (openModal) {
                openModal();
            } else {
                console.error("The `openModal` method is not available.");
            }
        };
        
        const reinit = () => {
            console.log('test');
        };

        return {
            importFileModal,
            reinit,
        };
    },
});
</script>

<style scoped>
.left-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 12%;
    height: calc(100% - 60px);
    background-color: #4B6587;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.import-form {
    margin-top: 20px;
}

.import-form button {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #6C7A89;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.import-form button:hover {
    background-color: #A9A9A9;
}
</style>
