<template>
  <div class="login-container">
    <Toast />
    <Card>
      <template #title>
        <h2>Login</h2>
        <span class="warning-text">Only two users can enter the room at the same time.</span>
      </template>
      <template #content>
        <div class="input-wrapper">
          <FloatLabel>
            <InputText
              id="login_txt"
              v-model="nickname"
              :invalid="isInvalid"
              autocomplete="off"
              @keydown.enter.exact.prevent="onSubmit"
            />
            <label for="login_txt">Please enter a nickname</label>
          </FloatLabel>
        </div>
        <Button label="Enter" @click="onSubmit" />
      </template>
    </Card>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useGlobalStore } from '@/stores'
import useSocket from '@/composables/use-socket'

const $router = useRouter()
const store = useGlobalStore()
const toast = useToast()
const nickname = ref('')
const isInvalid = ref(false)
const userTryingToConnect = ref(false)
const { connect, isConnected, error } = useSocket()

const onSubmit = () => {
  if (nickname.value === '') {
    isInvalid.value = true
  } else {
    store.setGlobalLoading(true)
    store.setNickname(nickname.value)
    userTryingToConnect.value = true
    error.value = null
    connect()
  }
}

const connectionEstablished = () => {
  store.setGlobalLoading(false)
  isInvalid.value = false
  userTryingToConnect.value = false
  $router.push('/chat')
}

const connectionNotEstablished = (_err) => {
  store.setGlobalLoading(false)
  isInvalid.value = true
  if (userTryingToConnect.value) {
    toast.add({
      severity: 'error',
      summary: 'Error!',
      detail: _err,
      life: 3000
    })
  }
  userTryingToConnect.value = false
}

watch(
  () => [isConnected.value, error.value],
  ([newIsConnected, newError]) => {
    if (newIsConnected) {
      connectionEstablished()
    } else if (newError) {
      connectionNotEstablished(newError)
    }
  }
)
</script>
<style lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--p-green-950);
  .p-card {
    width: 50%;
    overflow: hidden;
    h2 {
      margin: 0;
    }
    .warning-text {
      font-size: 0.8rem;
      font-style: italic;
    }
    .p-card-title {
      margin-bottom: 20px;
    }
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 5px;
      .p-inputtext {
        display: flex;
        flex: 1;
      }
      .p-floatlabel {
        display: flex;
      }
    }
    .p-button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
