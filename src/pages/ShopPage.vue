<template>
  <q-page class="shop-page bg-black text-white q-pb-xl">
    <!-- Dynamic Shop Hero Header -->
    <div class="shop-hero relative-position overflow-hidden" @mousemove="handleHeroParallax">
      <!-- Background Carousel -->
      <div class="carousel-container absolute-full">
        <div
          v-for="(img, index) in heroImages"
          :key="index"
          class="hero-slide absolute-full"
          :class="{ active: currentHeroIndex === index }"
          :style="{ backgroundImage: `url(${img})` }"
        ></div>
        <div class="hero-vignette absolute-full"></div>
      </div>

      <!-- New 3D Product Slider Section -->
      <div class="container relative-position z-top hero-content full-height flex flex-center">
        <div class="product-slider-container">
          <!-- Main 3D Card -->
          <transition name="card-flip" mode="out-in">
            <div
              :key="activeProduct.id"
              class="glass-product-card q-pa-lg row items-center justify-between no-wrap"
            >
              <!-- Left: Text Content -->
              <div class="col-6 q-pr-md text-left z-top">
                <div
                  class="text-overline text-weight-bold tracking-widest q-mb-sm"
                  :style="{ color: activeProduct.color }"
                >
                  PREMIUM SELECTION
                </div>
                <h2 class="text-h2 text-weight-bolder leading-tight q-mb-md">
                  {{ activeProduct.name }}
                </h2>
                <div class="text-h4 text-weight-light q-mb-md">${{ activeProduct.price }}</div>
                <p class="text-grey-4 text-body1 q-mb-lg leading-relaxed">
                  {{ activeProduct.desc }}
                </p>

                <div class="row q-gutter-x-md">
                  <q-btn
                    unelevated
                    rounded
                    class="action-btn"
                    :style="{ background: activeProduct.color, color: '#000' }"
                    label="Add to Cart"
                    icon="shopping_cart"
                  />
                  <q-btn outline rounded color="white" label="View Details" class="action-btn" />
                </div>
              </div>

              <!-- Right: 3D Image -->
              <div class="col-6 relative-position flex flex-center product-visual">
                <div
                  class="bg-glow absolute-center"
                  :style="{ background: activeProduct.color }"
                ></div>
                <q-img
                  :src="activeProduct.image"
                  class="hero-product-img floating-img"
                  fit="contain"
                />
              </div>
            </div>
          </transition>

          <!-- Thumbnails Navigation -->
          <div class="slider-nav q-mt-xl row justify-center q-gutter-x-lg">
            <div
              v-for="(p, index) in featuredProducts"
              :key="p.id"
              class="nav-item cursor-pointer column items-center"
              :class="{ active: activeIndex === index }"
              @click="setActiveProduct(index)"
            >
              <div
                class="nav-thumb flex flex-center"
                :style="{ borderColor: activeIndex === index ? p.color : 'rgba(255,255,255,0.2)' }"
              >
                <q-img :src="p.image" class="thumb-img" />
              </div>
              <div class="text-caption q-mt-sm text-grey-5 transition-fast">
                {{ p.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute-bottom text-center q-pb-lg z-top text-white animate-bounce pointer-events-none"
    >
      <q-icon name="keyboard_arrow_down" size="md" />
    </div>

    <div class="container q-mx-auto q-px-md q-pt-xl">
      <div class="row q-col-gutter-xl">
        <!-- Sidebar Filters -->
        <div class="col-12 col-md-3">
          <div class="filter-sidebar glass-panel q-pa-xl sticky-top">
            <div class="text-h6 text-white text-weight-bold q-mb-lg flex items-center">
              <q-icon name="tune" class="q-mr-sm text-primary" />
              Filters
            </div>

            <!-- Search -->
            <div class="q-mb-xl">
              <q-input
                dark
                filled
                v-model="searchQuery"
                placeholder="Search products..."
                class="search-input"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>

            <!-- Categories -->
            <div class="q-mb-xl">
              <div class="text-subtitle2 text-grey-5 q-mb-md">CATEGORIES</div>
              <div class="column q-gutter-y-sm">
                <q-btn
                  v-for="cat in categories"
                  :key="cat"
                  flat
                  dense
                  no-caps
                  class="cat-link justify-start"
                  :class="{ 'text-primary': selectedCategory === cat }"
                  @click="selectedCategory = cat"
                >
                  <q-icon
                    size="xs"
                    :name="
                      selectedCategory === cat ? 'radio_button_checked' : 'radio_button_unchecked'
                    "
                    class="q-mr-sm"
                  />
                  {{ cat }}
                </q-btn>
              </div>
            </div>

            <!-- Price Range -->
            <div class="q-mb-xl">
              <div class="text-subtitle2 text-grey-5 q-mb-md">PRICE RANGE</div>
              <q-range
                v-model="priceRange"
                :min="0"
                :max="100"
                :step="5"
                label-always
                color="primary"
                drag-range
              />
            </div>

            <!-- Reset -->
            <q-btn
              outline
              color="grey-7"
              label="Reset Filters"
              class="full-width q-py-sm"
              @click="resetFilters"
            />
          </div>
        </div>

        <!-- Product Grid -->
        <div class="col-12 col-md-9">
          <!-- Toolbar -->
          <div class="row items-center justify-between q-mb-xl">
            <div class="text-subtitle1 text-grey-5">
              Showing
              <span class="text-white text-weight-bold">{{ filteredProducts.length }}</span>
              products
            </div>
            <div class="row items-center q-gutter-x-md">
              <q-select
                dark
                filled
                v-model="sortBy"
                :options="sortOptions"
                label="Sort By"
                dense
                style="min-width: 180px"
                class="sort-select"
              />
              <div class="row gt-xs">
                <q-btn
                  flat
                  round
                  :color="viewMode === 'grid' ? 'primary' : 'grey-7'"
                  icon="grid_view"
                  @click="viewMode = 'grid'"
                />
                <q-btn
                  flat
                  round
                  :color="viewMode === 'list' ? 'primary' : 'grey-7'"
                  icon="view_list"
                  @click="viewMode = 'list'"
                />
              </div>
            </div>
          </div>

          <!-- Grid -->
          <div class="row q-col-gutter-lg" v-if="filteredProducts.length > 0">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <ProductCard v-bind="product" />
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="column items-center q-py-xl text-center">
            <q-icon name="sentiment_dissatisfied" size="100px" color="grey-9" />
            <div class="text-h4 text-grey-8 q-mt-md">No products found</div>
            <p class="text-grey-6">Try adjusting your filters or search terms.</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProductCard from 'components/ProductCard.vue'

// Import assets
import almondImg from 'assets/pngwing.com.png'
import cashewImg from 'assets/pngwing.com (1).png'
import walnutImg from 'assets/wulnut.png'
import pistachioImg from 'assets/—Pngtree—pile of pistachio nuts with_15763401.png'
import sultanaImg from 'assets/sultana grapes.png'
import mixNutImg from 'assets/mix nut.png'

// --- Hero 3D Slider Logic ---
const activeIndex = ref(0)
const featuredProducts = [
  {
    id: 'fp1',
    name: 'California Almonds',
    price: '29.99',
    desc: 'Golden roasted premium almonds with a signature smoky crunch. Perfect for energy.',
    image: almondImg,
    color: '#ff8a00',
  },
  {
    id: 'fp2',
    name: 'Jumbo Cashews',
    price: '34.99',
    desc: 'Creamy, buttery Vietnam w320 cashews. Slow-roasted to perfection.',
    image: cashewImg,
    color: '#03e8a1',
  },
  {
    id: 'fp3',
    name: 'Iranian Pistachios',
    price: '39.99',
    desc: 'Vibrant green kernels with a distinct savory flavor. A true luxury snack.',
    image: pistachioImg,
    color: '#aaff08',
  },
  {
    id: 'fp4',
    name: 'Chilean Walnuts',
    price: '24.99',
    desc: 'Brain-boosting walnuts with high Omega-3s. Crisp, fresh, and earthy.',
    image: walnutImg,
    color: '#d4af37',
  },
]

const activeProduct = computed(() => featuredProducts[activeIndex.value])

const setActiveProduct = (index) => {
  activeIndex.value = index
}

// Auto-rotate slider
let sliderInterval = null
const startSlider = () => {
  sliderInterval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % featuredProducts.length
  }, 6000)
}

onMounted(() => {
  startSlider()
})

onUnmounted(() => {
  if (sliderInterval) clearInterval(sliderInterval)
})

// --- Shop Logic ---
const searchQuery = ref('')
const selectedCategory = ref('All')
const priceRange = ref({ min: 0, max: 100 })
const sortBy = ref('Newest')
const viewMode = ref('grid')

const categories = ['All', 'Signature', 'Roasted', 'Raw', 'Flavored']
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Rating']

const products = [
  {
    id: 1,
    name: 'Roasted California Almonds',
    price: '29.99',
    originalPrice: '35.00',
    image: almondImg,
    color: '#ff8a00',
    category: 'Roasted',
    inStock: true,
  },
  {
    id: 2,
    name: 'Premium Jumbo Cashews',
    price: '34.99',
    image: cashewImg,
    color: '#03e8a1',
    category: 'Signature',
    inStock: true,
  },
  {
    id: 3,
    name: 'Mountain Peak Walnuts',
    price: '24.99',
    originalPrice: '28.50',
    image: walnutImg,
    color: '#d4af37',
    category: 'Raw',
    inStock: true,
  },
  {
    id: 4,
    name: 'Iranian Green Pistachios',
    price: '39.99',
    image: pistachioImg,
    color: '#aaff08',
    category: 'Roasted',
    inStock: false,
  },
  {
    id: 5,
    name: 'Honey & Sultana Mix',
    price: '42.00',
    image: sultanaImg,
    color: '#ffbf00',
    category: 'Flavored',
    inStock: true,
  },
  {
    id: 6,
    name: 'Royal Mix Nuts',
    price: '45.50',
    image: mixNutImg,
    color: '#fb923c',
    category: 'Signature',
    inStock: true,
  },
]

const filteredProducts = computed(() => {
  return products
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCat = selectedCategory.value === 'All' || p.category === selectedCategory.value
      const price = parseFloat(p.price)
      const matchesPrice = price >= priceRange.value.min && price <= priceRange.value.max
      return matchesSearch && matchesCat && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy.value === 'Price: Low to High') return parseFloat(a.price) - parseFloat(b.price)
      if (sortBy.value === 'Price: High to Low') return parseFloat(b.price) - parseFloat(a.price)
      return 0
    })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  priceRange.value = { min: 0, max: 100 }
  sortBy.value = 'Newest'
}
</script>

<style scoped lang="scss">
// 3D Slider Styles
.product-slider-container {
  width: 100%;
  max-width: 1000px;
  perspective: 1500px;
}

.glass-product-card {
  width: 100%;
  min-height: 450px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transform-style: preserve-3d;
  overflow: visible;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
    text-align: center;

    .text-left {
      text-align: center;
    }
  }
}

.bg-glow {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  z-index: -1;
  transition: background 0.5s ease;
}

.hero-product-img {
  width: 350px;
  height: 350px;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6));
  z-index: 10;

  @media (max-width: 800px) {
    width: 250px;
    height: 250px;
  }
}

.floating-img {
  animation: float-slow 6s ease-in-out infinite;
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.action-btn {
  padding: 10px 24px;
  font-weight: 700;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

// Thumbnails
.nav-item {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &.active {
    .nav-thumb {
      transform: scale(1.15);
      border-color: currentColor;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }
    .text-caption {
      color: white !important;
      font-weight: 700;
    }
  }
}

.nav-thumb {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.thumb-img {
  width: 70%;
  height: 70%;
}

// Transitions
.card-flip-enter-active,
.card-flip-leave-active {
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card-flip-enter-from {
  opacity: 0;
  transform: rotateY(-10deg) translateX(50px);
}
.card-flip-leave-to {
  opacity: 0;
  transform: rotateY(10deg) translateX(-50px);
}

// -- Original Styles preserved below --
// (Any original styles not replaced are kept)

.shop-page {
  padding-top: 0px;
}

.shop-hero {
  height: 100vh; // Increased hero height for the slider
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.carousel-container {
  z-index: 1;
}

.hero-slide {
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.1);
  transition:
    opacity 1.5s ease-in-out,
    transform 1.5s ease-out;
  filter: blur(10px) brightness(0.2); // Darkened bg more for the slider pop

  &.active {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-vignette {
  background: radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.9) 90%);
  z-index: 2;
}

.title-separator,
.text-gradient,
.tracking-widest,
.line-height-relaxed {
  display: block; // Placeholder to avoid empty rule warning
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce {
  animation: bounce 2s infinite;
}

.container {
  max-width: 1400px;
}

.filter-sidebar {
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
}

.sticky-top {
  position: sticky;
  top: 140px;
}

.cat-link {
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  font-weight: 500;
  border-radius: 12px;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
  }
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.05) !important;
  }
}

.sort-select {
  :deep(.q-field__control) {
    border-radius: 12px;
  }
}

.animate-fade-down {
  animation: fadeDown 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
  opacity: 0;
}

@keyframes fadeDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
