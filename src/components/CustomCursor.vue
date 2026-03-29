<template>
  <div class="custom-cursor-wrapper gt-sm">
    <!-- Fire Particles -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="cursor-particle"
      :style="{
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        opacity: particle.opacity,
        transform: `translate(-50%, -50%) scale(${particle.scale})`,
        backgroundColor: particle.color,
      }"
    ></div>

    <div
      class="cursor-dot"
      :style="{ left: `${x}px`, top: `${y}px` }"
      :class="{ 'is-hovering': isHovering }"
    ></div>
    <div
      class="cursor-outline"
      :style="{ left: `${outlineX}px`, top: `${outlineY}px` }"
      :class="{ 'is-hovering': isHovering }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const outlineX = ref(0)
const outlineY = ref(0)
const isHovering = ref(false)

// Particle System
const particles = ref([])
let particleId = 0
const MAX_PARTICLES = 30 // Performance limit

const createParticle = (px, py) => {
  if (particles.value.length > MAX_PARTICLES) {
    particles.value.shift()
  }

  // Randomize color between red, orange, yellow
  const colors = ['#FF4500', '#FF8C00', '#FFD700', '#FF2400']
  const color = colors[Math.floor(Math.random() * colors.length)]

  particles.value.push({
    id: particleId++,
    x: px,
    y: py,
    vx: (Math.random() - 0.5) * 1.5, // Random horizontal velocity
    vy: (Math.random() - 0.5) * 1.5, // Random vertical velocity
    opacity: 1,
    scale: Math.random() * 0.5 + 0.5,
    life: 1.0,
    color: color,
  })
}

const updateParticles = () => {
  for (let i = particles.value.length - 1; i >= 0; i--) {
    let p = particles.value[i]
    p.x += p.vx
    p.y += p.vy
    p.opacity -= 0.03 // Fade out
    p.scale -= 0.02 // Shrink

    // Remove dead particles
    if (p.opacity <= 0 || p.scale <= 0) {
      particles.value.splice(i, 1)
    }
  }
}

// Smooth follow logic
const animate = () => {
  const dist = 0.15 // lerp factor
  outlineX.value += (x.value - outlineX.value) * dist
  outlineY.value += (y.value - outlineY.value) * dist

  updateParticles()

  requestAnimationFrame(animate)
}

const moveCursor = (e) => {
  x.value = e.clientX
  y.value = e.clientY

  // Create particles on move
  // Add multiple particles for denser trail if moving fast?
  // For now 1 per move event is decent, maybe throttle if too heavy
  createParticle(x.value, y.value)
  createParticle(x.value + (Math.random() - 0.5) * 10, y.value + (Math.random() - 0.5) * 10)

  // Check for hovering over clickable elements
  const target = e.target
  if (
    target &&
    (target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('cursor-pointer') ||
      target.classList.contains('q-btn') ||
      target.getAttribute('role') === 'button')
  ) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor)
  requestAnimationFrame(animate)

  // Hide default cursor
  document.body.style.cursor = 'none'
  document.querySelectorAll('a, button, .cursor-pointer').forEach((el) => {
    el.style.cursor = 'none'
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor)
  document.body.style.cursor = 'auto'
})
</script>

<style scoped lang="scss">
.custom-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.cursor-particle {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998; /* Behind cursor dot */
  filter: blur(2px); /* Fire glow effect */
  box-shadow: 0 0 4px currentColor;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: white; /* Changed to white for better visibility against fire */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  pointer-events: none;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  box-shadow: 0 0 10px white;

  &.is-hovering {
    transform: translate(-50%, -50%) scale(0.5);
    background-color: $secondary;
    box-shadow: 0 0 5px $secondary;
  }
}

.cursor-outline {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 140, 0, 0.5); /* Fire orange outline */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
  transition:
    width 0.2s ease,
    height 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &.is-hovering {
    width: 60px;
    height: 60px;
    border-color: $secondary;
    background-color: rgba($secondary, 0.1);
    backdrop-filter: blur(2px);
  }
}
</style>
