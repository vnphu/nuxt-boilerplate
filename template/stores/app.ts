// stores/counter.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return { error: '', errors: [] }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    newError(payload: any) {
      this.error = payload
    },
  },
})
