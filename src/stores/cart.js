import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    cartCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find(
        (item) => item.id === product.id && item.weight === product.weight,
      )

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1,
        })
      }
    },

    removeFromCart(productId, weight) {
      const index = this.items.findIndex((item) => item.id === productId && item.weight === weight)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId, weight, quantity) {
      const item = this.items.find((item) => item.id === productId && item.weight === weight)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeFromCart(productId, weight)
        }
      }
    },

    clearCart() {
      this.items = []
    },
  },
})
