<template>
  <div class="product-card-container animate-fade-up">
    <!-- Wishlist Button -->
    <q-btn
      flat
      round
      :icon="isWishlisted ? 'favorite' : 'favorite_border'"
      :color="isWishlisted ? 'red' : 'white'"
      class="wishlist-btn z-top"
      @click.stop="toggleWishlist"
    />

    <div class="product-card-glass column no-wrap">
      <!-- Image Area -->
      <div class="img-wrapper flex flex-center relative-position">
        <div
          class="glow-bg"
          :style="{ background: `radial-gradient(circle, ${color}33 0%, transparent 70%)` }"
        ></div>
        <q-img :src="image" class="product-img" fit="contain" />

        <!-- Stock Status Badge -->
        <div class="absolute-bottom-left q-ma-sm">
          <q-badge :color="inStock ? 'secondary' : 'grey-8'" class="stock-badge text-weight-bold">
            {{ inStock ? 'IN STOCK' : 'OUT OF STOCK' }}
          </q-badge>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-wrapper q-pa-lg flex-grow">
        <div class="row justify-between items-start no-wrap q-mb-xs">
          <div class="text-h6 text-white text-weight-bold leading-tight line-clamp-1">
            {{ name }}
          </div>
        </div>

        <div class="row items-center q-gutter-x-sm q-mb-md">
          <div class="text-h5 text-secondary text-weight-bolder">${{ price }}</div>
          <div class="text-caption text-grey-5 text-strike" v-if="originalPrice">
            ${{ originalPrice }}
          </div>
        </div>

        <!-- Weight Selector -->
        <div class="weight-selector q-mb-lg">
          <div class="text-caption text-grey-5 q-mb-sm">SELECT WEIGHT</div>
          <div class="row q-gutter-xs">
            <div
              v-for="weight in weights"
              :key="weight"
              class="weight-pill"
              :class="{ active: selectedWeight === weight }"
              @click="selectedWeight = weight"
            >
              {{ weight }}
            </div>
          </div>
        </div>

        <!-- Add to Cart -->
        <q-btn
          unelevated
          class="add-cart-btn full-width q-py-md glass-btn"
          color="secondary"
          :disable="!inStock"
          @click="addToCart"
        >
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="shopping_bag" />
            <span class="text-weight-bold">ADD TO CART</span>
          </div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useCartStore } from 'stores/cart'

const $q = useQuasar()
const cartStore = useCartStore()

const props = defineProps({
  id: [String, Number],
  name: String,
  price: String,
  originalPrice: String,
  image: String,
  color: {
    type: String,
    default: '#03e8a1',
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  weights: {
    type: Array,
    default: () => ['250g', '500g', '1kg'],
  },
})

const selectedWeight = ref('500g')
const isWishlisted = ref(false)

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  $q.notify({
    color: isWishlisted.value ? 'pink' : 'grey-7',
    icon: isWishlisted.value ? 'favorite' : 'favorite_border',
    message: isWishlisted.value ? 'Added to Wishlist' : 'Removed from Wishlist',
    position: 'top',
    timeout: 1000,
  })
}

const addToCart = () => {
  cartStore.addToCart({
    id: props.id,
    name: props.name,
    price: parseFloat(props.price),
    image: props.image,
    weight: selectedWeight.value,
  })

  $q.notify({
    color: 'positive',
    textColor: 'white',
    icon: 'check_circle',
    message: `Added ${props.name} (${selectedWeight.value}) to Cart`,
    position: 'top-right',
    timeout: 1500,
  })
}
</script>

<style scoped lang="scss">
.product-card-container {
  width: 100%;
  max-width: 350px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: translateY(-15px);
    .product-img {
      transform: scale(1.15) rotate(5deg);
    }
    .product-card-glass {
      border-color: $secondary;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
    }
  }
}

.wishlist-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
}

.product-card-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 35px;
  min-height: 520px;
  height: auto;
  overflow: visible;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

.img-wrapper {
  height: 220px;
  background: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.glow-bg {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
}

.product-img {
  width: 180px;
  height: 180px;
  z-index: 1;
  filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5));
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stock-badge {
  font-size: 0.65rem;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 6px;
}

.weight-pill {
  padding: 6px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background: $secondary;
    color: $dark;
    border-color: $secondary;
    box-shadow: 0 0 15px rgba(3, 232, 161, 0.3);
  }
}

.add-cart-btn {
  border-radius: 18px;
  transition: all 0.3s ease;
  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(3, 232, 161, 0.4);
  }
}

.leading-tight {
  line-height: 1.25;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}
</style>
