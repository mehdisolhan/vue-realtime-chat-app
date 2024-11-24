<template>
  <div v-if="store.globalLoading" class="loading-container">
    <div class="loading">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>
  </div>
</template>
<script setup>
import ProgressSpinner from 'primevue/progressspinner'
import { useGlobalStore } from '@/stores'

const store = useGlobalStore()
</script>
<style lang="scss">
.loading-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
