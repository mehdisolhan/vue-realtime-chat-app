<template>
  <div ref="messageListRef" class="message-list">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="bubble"
      :class="message?.id == socket?.id ? 'send-msg' : 'received-msg'"
    >
      <span>{{ message.text }}</span>
      <br />
      <span> - {{ message.nickname }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, watch } from 'vue'
import useSocket from '@/composables/use-socket'

const messageListRef = ref(null)
const { messages, socket } = useSocket()

const scrollToBottom = () => {
  const container = messageListRef.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

watch(messages.value, () => {
  nextTick(() => {
    scrollToBottom()
  })
})
</script>
<style lang="scss">
.message-list {
  height: calc(100% - 90px);
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding-right: 5px;
  padding-top: 0px;
  transition: background 0.3s ease-out 0.1s;

  .bubble {
    position: relative;
    display: inline-block;
    margin-bottom: 8px;
    padding: 13px 14px;
    vertical-align: top;
    border-radius: 10px;
    max-width: 65%;
    word-wrap: break-word;
    white-space: pre-wrap;

    &.received-msg {
      float: left;
      color: var(--p-slate-950);
      background-color: var(--p-slate-300);
      align-self: flex-start;
    }

    &.send-msg {
      float: right;
      color: var(--p-slate-50);
      background-color: var(--p-primary-600);
      align-self: flex-end;
    }
  }
}
</style>
