<template>
  <q-page class="product-details-page bg-black text-white relative-position overflow-hidden">
    <!-- Background Elements -->
    <div class="bg-gradient absolute-full"></div>
    <div class="bg-shape absolute-center" :style="{ background: product.color }"></div>

    <div class="container relative-position z-top full-height flex flex-center">
      <div class="row full-width items-center q-col-gutter-xl">
        <!-- Left Column: 3D Product Showcase -->
        <div class="col-12 col-md-6 relative-position">
          <div
            class="product-stage relative-position flex flex-center"
            @mousemove="handleMouseMove"
            @mouseleave="resetTilt"
            :style="tiltStyle"
          >
            <div
              class="aura absolute-center"
              :style="{ boxShadow: `0 0 120px ${product.color}66` }"
            ></div>
            <q-img :src="product.image" class="hero-product-img" fit="contain" />
          </div>
        </div>

        <!-- Right Column: Product Details -->
        <div class="col-12 col-md-6 q-pl-xl">
          <div class="content-box animate-fade-left">
            <!-- Breadcrumbs -->
            <div class="text-overline text-grey-5 q-mb-md tracking-widest">
              SHOP / {{ product.category.toUpperCase() }}
            </div>

            <!-- Title -->
            <h1 class="text-h2 text-weight-bolder q-mb-sm font-playfair leading-tight">
              {{ product.name }}
            </h1>

            <!-- Rating -->
            <div class="row items-center q-mb-lg">
              <q-rating
                v-model="rating"
                size="sm"
                :color="product.color"
                icon="star"
                icon-selected="star"
                readonly
              />
              <span class="text-caption text-grey-5 q-ml-sm">(124 Reviews)</span>
            </div>

            <!-- Price -->
            <div
              class="text-h3 text-weight-bold q-mb-lg text-gradient"
              :style="{ '--gradient-color': product.color }"
            >
              ${{ product.price }}
            </div>

            <!-- Description -->
            <p class="text-body1 text-grey-4 q-mb-xl line-height-relaxed">
              {{ product.description }}
            </p>

            <!-- Nutritional Highlights (Icons) -->
            <div class="row q-gutter-lg q-mb-xl">
              <div class="text-center">
                <q-avatar size="50px" class="glass-icon q-mb-sm">
                  <q-icon name="fitness_center" size="24px" :style="{ color: product.color }" />
                </q-avatar>
                <div class="text-caption text-uppercase">Protein</div>
              </div>
              <div class="text-center">
                <q-avatar size="50px" class="glass-icon q-mb-sm">
                  <q-icon name="spa" size="24px" :style="{ color: product.color }" />
                </q-avatar>
                <div class="text-caption text-uppercase">Organic</div>
              </div>
              <div class="text-center">
                <q-avatar size="50px" class="glass-icon q-mb-sm">
                  <q-icon name="bolt" size="24px" :style="{ color: product.color }" />
                </q-avatar>
                <div class="text-caption text-uppercase">Energy</div>
              </div>
            </div>

            <!-- Size Selection -->
            <div class="q-mb-lg">
              <div class="text-caption text-grey-5 q-mb-sm">SELECT SIZE</div>
              <div class="row q-gutter-md">
                <q-btn
                  v-for="size in ['250g', '500g', '1kg']"
                  :key="size"
                  unelevated
                  :outline="selectedSize !== size"
                  class="size-btn"
                  :class="{ active: selectedSize === size }"
                  :style="{
                    borderColor: selectedSize === size ? product.color : 'rgba(255,255,255,0.2)',
                    backgroundColor: selectedSize === size ? product.color : 'transparent',
                  }"
                  :label="size"
                  @click="selectedSize = size"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="row q-gutter-md q-mt-xl">
              <q-btn
                unelevated
                rounded
                size="lg"
                class="add-cart-btn q-px-xl"
                :style="{ background: product.color, color: '#000' }"
                label="Add to Cart"
                icon="shopping_bag"
              />
              <q-btn flat round size="lg" class="glass-icon" icon="favorite_border" color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Assets (placeholder import mechanism)
import almondImg from 'assets/almond.svg'
import cashewImg from 'assets/cashew.svg'
import walnutImg from 'assets/walnut.svg'
import pistachioImg from 'assets/pistachio.svg'

const route = useRoute()
const rating = ref(5)
const selectedSize = ref('500g')
const mousePos = ref({ x: 0, y: 0 })

// Mock Data Database
const productsDB = {
  almonds: {
    name: 'Roasted California Almonds',
    price: '29.99',
    category: 'Roasted',
    description:
      'Sourced from the sun-drenched orchards of California, our almonds are slow-roasted to bring out a deep, smoky crunch. Packed with Vitamin E and essential healthy fats, they are the perfect fuel for your active lifestyle.',
    image: almondImg,
    color: '#fbbf24',
  },
  cashews: {
    name: 'Premium Jumbo Cashews',
    price: '34.99',
    category: 'Signature',
    description:
      'Experience the creamy, buttery texture of our W320 grade Vietnamese cashews. Roughly harvested and gently processed to maintain their massive size and distinct sweet flavor profile.',
    image: cashewImg,
    color: '#34d399',
  },
  walnuts: {
    name: 'Chilean Brain Walnuts',
    price: '24.99',
    category: 'Raw',
    description:
      'Known as the ultimate brain food, these Chilean walnuts are unbeatably fresh. With a mild, earthy taste and zero bitterness, they are perfect for snacking or adding a crunch to your salads.',
    image: walnutImg,
    color: '#f87171',
  },
  pistachios: {
    name: 'Iranian Green Pistachios',
    price: '39.99',
    category: 'Roasted',
    description:
      'Vibrant green kernels hidden inside naturally opened shells. Our pistachios are lightly salted and roasted to perfection, offering a savory explosion in every bite.',
    image: pistachioImg,
    color: '#a7f3d0',
  },
}

// Get product based on route param, default to almonds
const productId = computed(() => route.params.id || 'almonds')
const product = computed(() => productsDB[productId.value] || productsDB['almonds'])

// 3D Tilt Logic
const handleMouseMove = (e) => {
  const { offsetX, offsetY, target } = e
  const { clientWidth, clientHeight } = target

  const x = (offsetX - clientWidth / 2) / 20
  const y = (offsetY - clientHeight / 2) / 20

  mousePos.value = { x, y }
}

const resetTilt = () => {
  mousePos.value = { x: 0, y: 0 }
}

const tiltStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${-mousePos.value.y}deg) rotateY(${mousePos.value.x}deg)`,
  transition: 'transform 0.1s ease-out',
}))
</script>

<style scoped lang="scss">
.product-details-page {
  padding-top: 80px;
  min-height: 100vh;
}

.bg-gradient {
  background: radial-gradient(circle at top right, #1a1a1a 0%, #000 100%);
  z-index: 0;
}

.bg-shape {
  width: 60vh;
  height: 60vh;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.15;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Typography
.font-playfair {
  font-family: 'Playfair Display', serif;
}

.text-gradient {
  background: linear-gradient(to right, white, var(--gradient-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tracking-widest {
  letter-spacing: 3px;
}
.leading-tight {
  line-height: 1.1;
}
.line-height-relaxed {
  line-height: 1.8;
}

// Left Column (Hero Image)
.product-stage {
  height: 500px;
  width: 100%;
  cursor: pointer;
}

.hero-product-img {
  width: 80%;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
  z-index: 2;
}

.aura {
  width: 60%;
  height: 60%;
  border-radius: 50%;
  z-index: 1;
}

// Right Column (Content)
.glass-icon {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.size-btn {
  font-weight: 700;
  transition: all 0.3s ease;

  &.active {
    color: black;
    transform: scale(1.05);
  }
}

.add-cart-btn {
  font-weight: 800;
  letter-spacing: 1px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
}

// Animations
.animate-fade-left {
  animation: fadeLeft 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
