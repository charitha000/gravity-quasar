<template>
  <q-page class="cart-page bg-black text-white q-pa-xl">
    <div class="container container-limit">
      <h1 class="text-h3 text-weight-bold q-mb-xl animate-fade-down">Your Cart</h1>

      <!-- Empty State -->
      <div v-if="cartStore.items.length === 0" class="column flex-center q-py-xl animate-fade-up">
        <q-icon name="shopping_cart" size="100px" color="grey-8" />
        <div class="text-h5 text-grey-6 q-mt-md">Your cart is empty</div>
        <q-btn
          to="/shop"
          unelevated
          rounded
          color="secondary"
          label="Browse Shop"
          class="q-mt-lg q-px-xl q-py-sm text-black"
        />
      </div>

      <!-- Cart Items -->
      <div v-else class="row q-col-gutter-xl">
        <div class="col-12 col-md-8">
          <div class="cart-items animate-fade-up">
            <div
              v-for="item in cartStore.items"
              :key="`${item.id}-${item.weight}`"
              class="cart-item glass-panel q-pa-md q-mb-md row items-center"
            >
              <!-- Product Image -->
              <div class="col-auto q-mr-md">
                <q-img
                  :src="item.image"
                  width="80px"
                  height="80px"
                  fit="contain"
                  class="cart-img"
                />
              </div>

              <!-- Product Details -->
              <div class="col model-details">
                <div class="text-h6 text-weight-bold">{{ item.name }}</div>
                <div class="text-caption text-grey-5">Weight: {{ item.weight }}</div>
                <div class="text-subtitle1 text-secondary text-weight-bold q-mt-xs">
                  ${{ item.price.toFixed(2) }}
                </div>
              </div>

              <!-- Quantity Controls -->
              <div class="col-auto quantity-controls row items-center q-mx-md">
                <q-btn
                  flat
                  round
                  dense
                  icon="remove"
                  size="sm"
                  color="grey-5"
                  @click="decreaseQuantity(item)"
                />
                <span class="text-h6 q-mx-md">{{ item.quantity }}</span>
                <q-btn
                  flat
                  round
                  dense
                  icon="add"
                  size="sm"
                  color="secondary"
                  @click="increaseQuantity(item)"
                />
              </div>

              <!-- Total & Remove -->
              <div class="col-auto column items-end">
                <div class="text-h6 text-weight-bold">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
                <q-btn
                  flat
                  round
                  dense
                  icon="delete_outline"
                  color="red-4"
                  size="sm"
                  class="q-mt-sm"
                  @click="removeItem(item)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="col-12 col-md-4">
          <div class="order-summary glass-panel q-pa-lg sticky-top animate-fade-left">
            <div class="text-h5 text-weight-bold q-mb-lg">Order Summary</div>

            <div class="row justify-between q-mb-md">
              <span class="text-grey-4">Subtotal</span>
              <span class="text-weight-medium">${{ cartStore.cartTotal.toFixed(2) }}</span>
            </div>
            <div class="row justify-between q-mb-lg">
              <span class="text-grey-4">Shipping</span>
              <span class="text-secondary">Free</span>
            </div>

            <q-separator dark class="q-mb-lg" />

            <div class="row justify-between q-mb-xl">
              <span class="text-h5 text-weight-bold">Total</span>
              <span class="text-h4 text-secondary text-weight-bold">
                ${{ cartStore.cartTotal.toFixed(2) }}
              </span>
            </div>

            <q-btn
              unelevated
              rounded
              color="secondary"
              text-color="black"
              label="Checkout Now"
              class="full-width q-py-md text-weight-bold checkout-btn"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCartStore } from 'stores/cart'

const cartStore = useCartStore()

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.weight, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.weight, item.quantity - 1)
  } else {
    removeItem(item)
  }
}

const removeItem = (item) => {
  cartStore.removeFromCart(item.id, item.weight)
}
</script>

<style scoped lang="scss">
.container-limit {
  max-width: 1200px;
  margin: 0 auto;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.cart-img {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 5px;
}

.quantity-controls {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 5px 10px;
}

.checkout-btn {
  font-size: 1.1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(3, 232, 161, 0.4);
  }
}

.sticky-top {
  position: sticky;
  top: 100px;
}

// Animations
.animate-fade-down {
  animation: fadeDown 0.8s ease-out forwards;
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-left {
  animation: fadeLeft 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
