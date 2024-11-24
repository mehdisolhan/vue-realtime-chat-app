<template>
  <div class="message-container">
    <div class="message-layout">
      <MessageHeader />
      <MessageList />
      <ChatForm />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ChatForm from '@/components/chat-form.vue'
import MessageList from '@/components/message-list.vue'
import MessageHeader from '@/components/message-header.vue'
import useSocket from '@/composables/use-socket'

const { connect } = useSocket()

onMounted(() => {
  connect()
})
</script>
<style lang="scss">
.message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100vh;
  .message-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
}
</style>
