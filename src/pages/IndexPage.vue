<template>
  <q-page class="bg-dark text-white overflow-hidden">
    <HeroSection />

    <div class="container q-mx-auto q-px-md">
      <FeaturesSection />
    </div>

    <!-- Product Collection Section -->
    <ProductCollection />

    <div class="container q-mx-auto q-px-md q-py-xl">
      <NewsletterSection />
    </div>

    <ExperienceSection />

    <FooterSection />
  </q-page>
</template>

<script setup>
import HeroSection from 'components/HeroSection.vue'
import FeaturesSection from 'components/FeaturesSection.vue'
import NewsletterSection from 'components/NewsletterSection.vue'
import ExperienceSection from 'components/ExperienceSection.vue'
import ProductCollection from 'components/ProductCollection.vue'
import FooterSection from 'components/FooterSection.vue'
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
}

/* Scroll-triggered style animation simulations */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  opacity: 0;
  animation: fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
</style>
