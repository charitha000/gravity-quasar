<template>
  <div class="newsletter-section q-py-xl q-px-md overflow-hidden">
    <div class="container q-mx-auto">
      <div class="row items-center justify-center q-col-gutter-lg">
        <!-- Left Side Element -->
        <div class="col-12 col-md-3 gt-sm">
          <div class="side-wrapper left-pos" :style="parallaxStyle(0.08)" v-intersection="onScroll">
            <div class="glow-wrap">
              <q-img :src="cashewImg" class="side-nut-img float-anim" />
            </div>
            <div class="side-desc q-mt-md">
              <div class="text-overline text-secondary">Premium Quality</div>
              <div class="text-caption text-grey-4">
                Finest hand-picked nuts from elite orchards.
              </div>
            </div>
          </div>
        </div>

        <!-- Central Newsletter Card -->
        <div class="col-12 col-md-6">
          <div class="newsletter-card glass-panel q-pa-xl relative-position z-top">
            <h3 class="text-h3 text-weight-bold q-mb-md">
              Join the <span class="text-gradient">Cosmic Club</span>
            </h3>
            <p class="text-subtitle1 text-grey-5 q-mb-xl">
              Subscribe to get exclusive zero-gravity deals, new product launches, and nutriboost
              tips.
            </p>

            <div class="column q-gutter-y-md items-center">
              <q-input
                dark
                filled
                v-model="email"
                placeholder="Enter your email address"
                class="newsletter-input full-width"
                bg-color="rgba(255,255,255,0.05)"
              >
                <template v-slot:append>
                  <q-icon name="email" color="secondary" />
                </template>
              </q-input>
              <q-btn
                color="secondary"
                label="Subscribe Now"
                class="full-width q-py-md glass-btn"
                unelevated
              />
            </div>
          </div>
        </div>

        <!-- Right Side Element -->
        <div class="col-12 col-md-3 gt-sm">
          <div
            class="side-wrapper right-pos"
            :style="parallaxStyle(-0.08)"
            v-intersection="onScroll"
          >
            <div class="glow-wrap">
              <q-img :src="almondImg" class="side-nut-img float-anim-alt" />
            </div>
            <div class="side-desc q-mt-md">
              <div class="text-overline text-accent">Energy Boost</div>
              <div class="text-caption text-grey-4">
                Naturally packed with proteins and healthy fats.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cashewImg from '../assets/pngwing.com (1).png'
import almondImg from '../assets/pngwing.com.png'

const email = ref('')
const mousePos = ref({ x: 0, y: 0 })
const isVisible = ref(false)

const parallaxStyle = (factor) => {
  if (!isVisible.value) return {}
  return {
    transform: `translate(${mousePos.value.x * factor * 12}px, ${mousePos.value.y * factor * 12}px)`,
    transition: 'transform 0.15s ease-out',
  }
}

const onScroll = (entry) => {
  isVisible.value = entry.isIntersecting
}

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mousePos.value = {
      x: (clientX - innerWidth / 2) / 20,
      y: (clientY - innerHeight / 2) / 20,
    }
  })
})
</script>

<style scoped lang="scss">
.newsletter-section {
  min-height: 600px;
  background: radial-gradient(circle at 50% 50%, rgba($secondary, 0.05) 0%, transparent 70%);
  display: flex;
  align-items: center;
}

.container {
  max-width: 1400px;
}

.side-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &.left-pos {
    transform-origin: center right;
  }
  &.right-pos {
    transform-origin: center left;
  }
}

.side-nut-img {
  width: 200px;
  height: 200px;
  border-radius: 40px;
  object-fit: cover;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.5s ease;
}

.glow-wrap {
  position: relative;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    inset: -30px;
    background: radial-gradient(circle, rgba($secondary, 0.2) 0%, transparent 75%);
    z-index: -1;
    border-radius: 50%;
  }
}

.side-desc {
  max-width: 220px;
  .text-overline {
    font-size: 0.75rem;
    letter-spacing: 3px;
    font-weight: 700;
    margin-bottom: 8px;
    display: block;
  }
  .text-caption {
    font-size: 0.85rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.6);
  }
}

.newsletter-card {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  text-align: center;
}

// Animations
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
}

@keyframes float-alt {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(15px) rotate(-3deg);
  }
}

.float-anim {
  animation: float 5s ease-in-out infinite;
}
.float-anim-alt {
  animation: float-alt 6s ease-in-out infinite;
}

.text-gradient {
  background: linear-gradient(to right, $secondary, $positive);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.newsletter-input {
  :deep(.q-field__control) {
    border-radius: 20px;
    height: 60px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2) !important;
    transition: all 0.3s ease;

    &:hover,
    &.q-field--focused {
      border-color: $secondary;
      box-shadow: 0 0 25px rgba(3, 232, 161, 0.25);
    }
  }
}

.glass-btn {
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(3, 232, 161, 0.5);
  }
}
</style>
