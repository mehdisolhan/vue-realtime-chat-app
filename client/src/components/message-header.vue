<template>
  <div class="message-header">
    <div class="message-title">
      <h3>Chat Room</h3>
      <p>Your chat history will not be stored.</p>
    </div>
    <div class="info-container">
      <span :class="`signal ${isConnected ? 'online' : 'offline'}`">{{
        isConnected ? 'online' : 'offline'
      }}</span>
      <Button
        v-tooltip.bottom="'Logout'"
        severity="secondary"
        size="small"
        icon="pi pi-sign-out"
        @click="onDisconnect"
      />
    </div>
  </div>
</template>
<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import useSocket from '@/composables/use-socket'

const $router = useRouter()
const { isConnected, disconnect } = useSocket()

const onDisconnect = () => {
  disconnect()
  $router.push('/')
}
</script>
<style>
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  color: var(--p-text-100);
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  .message-title {
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: 0;
    }
    p {
      font-size: 0.7rem;
      font-style: italic;
    }
  }
  .info-container {
    display: flex;
    align-items: center;
    gap: 20px;

    .signal {
      font-size: 16px;
      margin-right: 5px;
      &.online {
        color: var(--p-green-500);
      }
      &.offline {
        color: var(--p-red-500);
      }
      &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: currentColor;
        border-radius: 50%;
        margin-right: 0.5rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
