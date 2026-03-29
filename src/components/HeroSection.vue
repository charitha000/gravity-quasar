<template>
  <div class="hero-wrapper bg-black overflow-hidden relative-position" @mousemove="onMove">
    <!-- Background Massive Text (Parallax Layer) -->
    <transition-group name="bg-fade" tag="div">
      <div
        v-for="(item, index) in slides"
        v-show="currentSlide === index"
        :key="'bg-' + item.name"
        class="bg-text-layer absolute-full flex flex-center no-pointer-events"
      >
        <h1
          class="bg-title"
          :style="{
            color: item.accentColor + '08',
            WebkitTextStroke: `1px ${item.accentColor}22`,
          }"
        >
          {{ item.name.toUpperCase() }}
        </h1>
      </div>
    </transition-group>

    <!-- Main Content - Split Layout -->
    <div class="hero-content absolute-full">
      <div class="split-container full-height">
        <transition-group name="slide-fade" tag="div" class="full-height">
          <div
            v-for="(item, index) in slides"
            v-show="currentSlide === index"
            :key="item.name"
            class="slide-row absolute-full"
          >
            <!-- LEFT SIDE - Text Content -->
            <div class="left-content">
              <div class="text-wrapper">
                <div class="tagline animate-slide-right" :style="{ color: item.accentColor }">
                  Pure Nature's Gift
                </div>
                <h2 class="slide-title text-white animate-slide-right delay-1">
                  {{ item.tagline }}
                </h2>
                <p class="slide-desc text-grey-5 animate-slide-right delay-2">
                  {{ item.description }}
                </p>
                <q-btn
                  unelevated
                  rounded
                  class="shop-btn animate-slide-right delay-3"
                  :style="{ background: item.accentColor, color: '#000' }"
                  label="Shop Now"
                  icon-right="arrow_forward"
                  to="/shop"
                />
              </div>
            </div>

            <!-- RIGHT SIDE - Product Image -->
            <div class="right-content">
              <!-- Glow Effect -->
              <div
                class="product-glow"
                :style="{
                  background: `radial-gradient(circle, ${item.accentColor}40 0%, transparent 70%)`,
                }"
              ></div>

              <!-- Product Image -->
              <div class="product-stage" :style="mouseTransform">
                <q-img :src="item.image" class="product-img" fit="contain" />
              </div>

              <!-- Floating Decorative Elements -->
              <div class="floating-deco">
                <div class="deco deco-1" :style="{ animationDelay: '0s' }">
                  <q-img :src="item.image" class="deco-img" />
                </div>
                <div class="deco deco-2" :style="{ animationDelay: '2s' }">
                  <q-img :src="item.image" class="deco-img" />
                </div>
                <div class="deco deco-3" :style="{ animationDelay: '4s' }">
                  <q-img :src="item.image" class="deco-img" />
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Bottom Thumbnail Navigation -->
    <div
      class="thumb-nav absolute-bottom full-width q-pb-lg flex justify-center items-center z-top"
    >
      <div class="thumb-track flex q-gutter-x-md">
        <div
          v-for="(item, index) in slides"
          :key="'thumb-' + item.name"
          class="thumb-item cursor-pointer relative-position"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        >
          <div
            class="thumb-circle"
            :style="{
              background: currentSlide === index ? item.accentColor : '#1a1a1a',
              borderColor: currentSlide === index ? item.accentColor : '#333',
            }"
          >
            <q-img :src="item.image" class="thumb-img" />
          </div>
          <div
            class="thumb-label text-center text-caption text-uppercase text-white"
            v-if="currentSlide === index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Side Progress Dots -->
    <div
      class="sidebar-progress absolute-left flex column justify-center items-center q-pl-lg gt-md"
    >
      <div v-for="(item, index) in slides" :key="'dot-' + index" class="progress-dot-container">
        <div
          class="progress-dot"
          :class="{ active: currentSlide === index }"
          :style="{ background: currentSlide === index ? item.accentColor : '#333' }"
          @click="goToSlide(index)"
        ></div>
        <div class="line" v-if="index < slides.length - 1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Assets - New PNG product images
import almondImg from 'assets/pngwing.com.png'
import cashewImg from 'assets/pngwing.com (1).png'
import pistachioImg from 'assets/—Pngtree—pile of pistachio nuts with_15763401.png'
import sultanaImg from 'assets/sultana grapes.png'
import mixNutImg from 'assets/mix nut.png'
import walnutImg from 'assets/wulnut.png'
import macadamiaImg from 'assets/macadamia.png'

const currentSlide = ref(0)
const mousePos = ref({ x: 0, y: 0 })
let autoplayTimer = null

const slides = [
  {
    name: 'Almond',
    tagline: 'Golden Roasted California',
    description:
      'Double-roasted for a smoky sweetness that fuels your mind and satisfies your soul.',
    accentColor: '#fbbf24', // Gold
    image: almondImg,
  },
  {
    name: 'Cashew',
    tagline: 'Vietnam Jumbo Creamy',
    description: 'Hand-picked W320 grade cashews, slow-roasted to a perfect buttery consistency.',
    accentColor: '#34d399', // Emerald
    image: cashewImg,
  },
  {
    name: 'Pistachio',
    tagline: 'Vibrant Iranian Green Jewel',
    description:
      "Perfectly salted to unlock the intense, savory flavor of the world's finest kernels.",
    accentColor: '#a7f3d0', // Mint
    image: pistachioImg,
  },
  {
    name: 'Sultana',
    tagline: 'Sweet Golden Raisins',
    description: 'Sun-dried Turkish sultanas with natural sweetness and a soft, chewy texture.',
    accentColor: '#c084fc', // Purple
    image: sultanaImg,
  },
  {
    name: 'Mix Nuts',
    tagline: 'Premium Ultimate Blend',
    description: 'A perfect harmony of almonds, cashews, pistachios, and more in every handful.',
    accentColor: '#fb923c', // Orange
    image: mixNutImg,
  },
  {
    name: 'Walnut',
    tagline: 'Premium Chilean Brain-Nut',
    description:
      'The highest Omega-3 content found in nature, delivered in beautiful whole halves.',
    accentColor: '#f87171', // Red
    image: walnutImg,
  },
  {
    name: 'Macadamia',
    tagline: 'The Queen of Nuts',
    description: 'Rich, buttery, and uniquely creamy. Sourced from the volcanic soils of Hawaii.',
    accentColor: '#fff7ed', // Cream
    image: macadamiaImg,
  },
]

const onMove = (e) => {
  const x = (e.clientX - window.innerWidth / 2) / 25
  const y = (e.clientY - window.innerHeight / 2) / 25
  mousePos.value = { x, y }
}

const mouseTransform = computed(() => {
  return {
    transform: `translate(-50%, -50%) translate3d(${mousePos.value.x}px, ${mousePos.value.y}px, 0) rotateX(${-mousePos.value.y}deg) rotateY(${mousePos.value.x}deg)`,
  }
})

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoplay()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const resetAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(nextSlide, 7000)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  resetAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>

<style scoped lang="scss">
.hero-wrapper {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(ellipse at 30% 50%, #0a0a0a 0%, #000 100%);
  overflow: hidden;
}

// Background Text Layer
.bg-text-layer {
  z-index: 0;
}

.bg-title {
  font-family: 'Playfair Display', serif;
  font-size: 28vw;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  letter-spacing: -1vw;
  color: transparent;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

// Main Content Area
.hero-content {
  z-index: 10;
}

.split-container {
  width: 100%;
  height: 100%;
}

.slide-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8%;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    padding: 120px 24px 160px;
  }
}

// LEFT CONTENT - Text Area
.left-content {
  flex: 0 0 45%;
  max-width: 550px;
  z-index: 30;
  padding-right: 40px;
  position: relative;

  @media (max-width: 900px) {
    flex: none;
    max-width: 100%;
    text-align: center;
    padding-right: 0;
    margin-bottom: 40px;
  }
}

.text-wrapper {
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  padding: 48px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    padding: 32px 24px;
    border-radius: 20px;
  }
}

.tagline {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.4rem;
  text-transform: uppercase;
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.slide-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  margin: 0 0 24px 0;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);

  @media (max-width: 1200px) {
    font-size: 3rem;
  }

  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
}

.slide-desc {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 420px;

  @media (max-width: 900px) {
    max-width: 100%;
  }
}

.shop-btn {
  font-weight: 800;
  padding: 14px 36px;
  letter-spacing: 0.08rem;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: scale(1.08) translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
}

// RIGHT CONTENT - Product Area
.right-content {
  flex: 0 0 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;

  @media (max-width: 900px) {
    flex: none;
    width: 100%;
    height: 50vh;
  }
}

.product-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  z-index: 0;
}

.product-stage {
  position: relative;
  z-index: 10;
  width: 80%;
  height: 80%;
  max-width: 500px;
  max-height: 500px;
  animation: float-product 6s ease-in-out infinite;
  transition: transform 0.15s ease-out;

  @media (max-width: 900px) {
    width: 70%;
    height: 70%;
  }
}

.product-img {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.8));
}

// Floating Decorative Elements
.floating-deco {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.deco {
  position: absolute;
  width: 60px;
  height: 60px;
  opacity: 0.5;
  filter: blur(1px) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4));

  &-1 {
    top: 10%;
    left: 5%;
    animation: float-deco-1 10s ease-in-out infinite;
  }

  &-2 {
    top: 15%;
    right: 10%;
    animation: float-deco-2 12s ease-in-out infinite;
  }

  &-3 {
    bottom: 20%;
    left: 10%;
    animation: float-deco-3 8s ease-in-out infinite;
  }
}

.deco-img {
  width: 100%;
  height: 100%;
  transform: rotate(25deg);
}

// Bottom Thumbnail Navigation
.thumb-nav {
  z-index: 100;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding-top: 40px;
}

.thumb-track {
  display: flex;
  gap: 12px;
}

.thumb-item {
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.active {
    transform: translateY(-12px) scale(1.15);
  }

  &:hover:not(.active) {
    transform: translateY(-6px);
  }
}

.thumb-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  border: 3px solid;
  transition: all 0.3s ease;
}

.thumb-img {
  width: 75%;
  height: 75%;
}

.thumb-label {
  margin-top: 8px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
}

// Sidebar Progress
.sidebar-progress {
  z-index: 50;
}

.progress-dot-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .progress-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: all 0.4s ease;
    cursor: pointer;

    &.active {
      transform: scale(2);
      box-shadow: 0 0 12px currentColor;
    }

    &:hover:not(.active) {
      transform: scale(1.5);
    }
  }

  .line {
    width: 2px;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    margin: 8px 0;
  }
}

// Animations
@keyframes float-product {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-deco-1 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-15px, 20px) rotate(15deg);
  }
}

@keyframes float-deco-2 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(20px, -15px) rotate(-10deg);
  }
}

@keyframes float-deco-3 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-20px, -10px) rotate(10deg);
  }
}

// Slide Transitions
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}

.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s ease;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}

// Text Slide Animations
.animate-slide-right {
  opacity: 0;
  animation: slideRight 0.8s ease forwards;
}

.delay-1 {
  animation-delay: 0.1s;
}
.delay-2 {
  animation-delay: 0.2s;
}
.delay-3 {
  animation-delay: 0.3s;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
