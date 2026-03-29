<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="[
        'fixed-top',
        'transition-header',
        'z-max',
        scrolled ? 'glass-header' : 'bg-transparent',
      ]"
    >
      <div class="header-container row justify-between items-center q-px-lg q-py-md">
        <!-- Logo -->
        <div class="logo-container animate-fade-right">
          <div
            class="text-h5 text-weight-bold text-uppercase tracking-wider cursor-pointer"
            @click="goToHome"
          >
            BiteNuts<span class="text-accent">.</span>
          </div>
        </div>

        <!-- Navigation Desktop -->
        <div class="nav-links row q-gutter-x-xl gt-sm animate-fade-down">
          <router-link to="/" class="nav-item" exact-active-class="active">Home</router-link>
          <router-link to="/shop" class="nav-item" active-class="active">Shop</router-link>
          <router-link to="/about" class="nav-item" active-class="active">About</router-link>
          <router-link to="/contact" class="nav-item" active-class="active">Contact</router-link>
        </div>

        <!-- Action Icons -->
        <div class="row q-gutter-x-md items-center animate-fade-left">
          <q-btn flat round dense icon="search" class="icon-btn" />
          <q-btn flat round dense icon="shopping_cart" class="icon-btn" to="/cart">
            <q-badge v-if="cartCount > 0" floating color="accent" rounded>{{ cartCount }}</q-badge>
          </q-btn>
          <q-btn flat round dense icon="menu" class="lt-md icon-btn" @click="toggleLeftDrawer" />
        </div>
      </div>
    </q-header>

    <!-- Mobile Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
      class="bg-dark text-white"
    >
      <div class="column full-height q-pa-lg">
        <div class="row justify-between items-center q-mb-xl">
          <div class="text-h6 text-weight-bold">MENU</div>
          <q-btn flat round dense icon="close" @click="toggleLeftDrawer" />
        </div>

        <div class="column q-gutter-y-lg text-h5 text-weight-medium">
          <router-link to="/" class="drawer-link" @click="toggleLeftDrawer">Home</router-link>
          <router-link to="/shop" class="drawer-link" @click="toggleLeftDrawer">Shop</router-link>
          <router-link to="/about" class="drawer-link" @click="toggleLeftDrawer">About</router-link>
          <router-link to="/contact" class="drawer-link" @click="toggleLeftDrawer"
            >Contact</router-link
          >
        </div>
      </div>
    </q-drawer>

    <q-page-container class="no-padding-top">
      <router-view />
    </q-page-container>
    <CustomCursor />
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from 'stores/cart'
import CustomCursor from 'components/CustomCursor.vue'

const router = useRouter()
const cartStore = useCartStore()

const cartCount = computed(() => cartStore.cartCount)
const scrolled = ref(false)
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const goToHome = () => {
  router.push('/')
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
/* Override Quasar's default padding for overlay effect */
.q-page-container.no-padding-top {
  padding-top: 0 !important;
}

/* Hide default cursor on desktop to allow custom cursor */
@media (min-width: 1024px) {
  body,
  a,
  button,
  .q-btn,
  .cursor-pointer {
    cursor: none !important;
  }
}

.transition-header {
  transition: all 0.4s ease;
}

.glass-header {
  background: rgba(18, 18, 18, 0.8) !important;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 5px !important;
  padding-bottom: 5px !important;

  .header-container {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
}

.tracking-wider {
  letter-spacing: 2px;
}

/* Navigation Links */
.nav-item {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 1px;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: $secondary;
    transition:
      width 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 0 0 transparent;
  }

  &:hover,
  &.active {
    color: white;

    &::after {
      width: 100%;
      box-shadow: 0 0 10px $secondary;
    }
  }
}

/* Mobile Drawer Links */
.drawer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover,
  &.router-link-active {
    color: $secondary;
  }
}

/* Icons */
.icon-btn {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: scale(1.1);
    color: $accent;
    // Glow effect
    filter: drop-shadow(0 0 5px rgba(255, 138, 0, 0.5));
  }
}

/* Entrance Animations */
@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-right {
  animation: fadeRight 0.8s ease-out forwards;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-down {
  animation: fadeDown 0.8s ease-out 0.2s forwards;
  opacity: 0; /* Initial state */
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-left {
  animation: fadeLeft 0.8s ease-out 0.4s forwards;
  opacity: 0; /* Initial state */
}
</style>
