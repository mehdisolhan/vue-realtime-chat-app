import { ref } from 'vue'
import { io } from 'socket.io-client'
import { useGlobalStore } from '@/stores'

const socket = ref(null)
const isConnected = ref(false)
const error = ref(null)
const messages = ref([])
const URL = 'https://vue-realtime-chat-app.onrender.com'

export default function useSocket() {
  const store = useGlobalStore()

  function connect() {
    if (socket.value) return

    error.value = null
    socket.value = io(URL, {
      reconnectionAttempts: 5
    })

    socket.value.on('connect', () => {
      isConnected.value = true
      console.log('.....Connected to server....')
    })
    socket.value.on('connect_error', () => {
      isConnected.value = false
      error.value = 'connect_error'
    })
    socket.value.on('reconnect_failed', () => {
      isConnected.value = false
      error.value = 'reconnect_failed'
    })
    socket.value.on('error', (errMessage) => {
      isConnected.value = false
      error.value = errMessage?.text
      socket.value = null
    })
    socket.value.on('messages', (message) => {
      messages.value.push(message)
    })
    socket.value.on('disconnect', () => {
      isConnected.value = false
      console.error('.....Disconnected from server.....')
    })
  }

  function disconnect() {
    socket.value?.disconnect()
    socket.value = null
    isConnected.value = false
    messages.value = []
  }

  function sendMessage(message) {
    if (!socket.value) {
      return
    }
    const data = {
      nickname: store.nickname,
      message,
      id: socket.value.id
    }
    socket.value.emit('chat', data)
  }

  return {
    socket,
    isConnected,
    error,
    messages,
    connect,
    disconnect,
    sendMessage
  }
}
