import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const nickname = ref('')
  const theme = ref('light')
  const globalLoading = ref(false)

  const isLoggedIn = computed(() => nickname.value?.length)

  function setNickname(_payload) {
    nickname.value = _payload
  }

  function setGlobalLoading(_payload) {
    globalLoading.value = _payload
  }

  return {
    nickname,
    theme,
    globalLoading,
    isLoggedIn,
    setNickname,
    setGlobalLoading
  }
})
