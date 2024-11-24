<template>
  <div class="chat-input-container">
    <Toast />
    <Textarea
      v-model="form.message"
      fluid
      rows="3"
      cols="5"
      placeholder="Type your message here"
      @keyup.enter.exact.prevent="onSubmit"
    />
    <Button icon="pi pi-telegram" aria-label="Save" @click="onSubmit" />
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import useSocket from '@/composables/use-socket'

const toast = useToast()
const { sendMessage, isConnected } = useSocket()

const form = reactive({
  message: ''
})

const onSubmit = () => {
  form.message = form.message.trim()
  if (!form.message) return
  if (!isConnected.value) {
    toast.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Connection Failed',
      life: 3000
    })
  }
  sendMessage(form.message)
  form.message = ''
}
</script>
<style lang="scss">
.chat-input-container {
  display: flex;
  margin-top: auto;
  margin-bottom: 5px;
  gap: 5px;

  .p-textarea {
    resize: none;
  }
  .p-button {
    align-self: center;
    width: 80px;
    height: 40px;
  }
}
</style>
