<template>
  <q-page class="about-page bg-black text-white">
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center overflow-hidden">
      <div class="hero-bg absolute-full" :style="{ backgroundImage: `url(${heroBg})` }"></div>
      <div class="hero-overlay absolute-full"></div>

      <div class="hero-content text-center relative-position z-top q-pa-md">
        <div class="text-overline text-secondary q-mb-md tracking-widest animate-fade-down">
          SINCE 2023
        </div>
        <h1 class="text-h1 text-weight-bolder q-mb-lg main-title animate-reveal">
          The Art of the <br /><span class="text-gradient">Perfect Crunch</span>
        </h1>
        <div class="title-separator q-mx-auto"></div>
      </div>

      <div class="scroll-hint absolute-bottom text-center q-pb-xl animate-bounce">
        <q-icon name="keyboard_arrow_down" size="lg" color="secondary" />
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="story-section q-py-xl container">
      <div class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-6 order-last order-md-first">
          <div class="glass-card q-pa-xl animate-fade-right">
            <h2 class="text-h3 text-weight-bold q-mb-lg">From Our Kitchen to Your Pocket.</h2>
            <div class="text-body1 text-grey-4 q-mb-lg line-height-relaxed">
              It all started in 2023 when we couldn’t find a nut mix that wasn’t full of salt or
              low-quality fillers. Armed with a family vision for pure, gourmet snacking, we started
              roasting small batches in our dedicated boutique facility.
            </div>
            <div class="text-h5 text-secondary q-mb-md font-italic">
              "We don't just sell nuts; we share a tradition of quality."
            </div>
            <p class="text-grey-5">
              At BiteNuts, we believe snacking should be guilt-free and full of flavor. Every batch
              is roasted to perfection to ensure that satisfying crunch you deserve.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="image-stack relative-position animate-fade-left">
            <q-img :src="cashewsJpg" class="main-img rounded-xl" />
            <div class="accent-box absolute-bottom-right q-pa-lg glass-panel text-center">
              <div class="text-h3 text-weight-bolder text-primary">100%</div>
              <div class="text-caption text-uppercase tracking-widest">Natural</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ingredient Showcase Section -->
    <section class="ingredient-section q-py-xl bg-grey-10">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h2 text-weight-bold">Nature's Finest Gems</h2>
          <p class="text-h6 text-grey-6">
            We scour the globe to find only the premium grades for our mixes.
          </p>
        </div>

        <div class="row q-col-gutter-lg">
          <div v-for="nut in ingredients" :key="nut.name" class="col-12 col-sm-6 col-md-3">
            <div class="ingredient-card text-center q-pa-lg">
              <div class="nut-img-container q-mb-md">
                <q-img :src="nut.image" class="nut-isolated-img" />
              </div>
              <h3 class="text-h5 text-weight-bold q-mb-xs">{{ nut.name }}</h3>
              <p class="text-caption text-secondary text-uppercase tracking-widest q-mb-sm">
                {{ nut.origin }}
              </p>
              <p class="text-grey-5">{{ nut.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Philosophy Section -->
    <section class="philosophy-section q-py-xl container">
      <div class="row q-col-gutter-xl">
        <div v-for="(item, index) in philosophy" :key="index" class="col-12 col-md-4">
          <div class="philosophy-card glass-panel q-pa-xl text-center full-height">
            <q-icon :name="item.icon" size="60px" color="primary" class="q-mb-lg" />
            <h3 class="text-h4 text-weight-bold q-mb-md">{{ item.title }}</h3>
            <p class="text-grey-4">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="trust-section q-py-xl">
      <div class="row justify-center q-gutter-xl items-center opacity-70">
        <div
          v-for="badge in badges"
          :key="badge.label"
          class="badge-item row items-center q-gutter-x-sm"
        >
          <q-icon name="check_circle" color="secondary" size="sm" />
          <span class="text-h6 text-weight-medium">{{ badge.label }}</span>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-py-xl text-center relative-position">
      <div class="container q-py-xl glass-panel glow-border">
        <h2 class="text-h2 text-weight-bolder q-mb-lg">Ready for the ultimate crunch?</h2>
        <q-btn
          unelevated
          rounded
          color="secondary"
          label="Find Your Favorite Flavor"
          class="cta-btn q-px-xl q-py-md text-weight-bold"
          to="/shop"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
// Import assets
import heroBg from 'assets/hero-bg.png'
import cashewsJpg from 'assets/pngwing.com (1).png'
import almondPng from 'assets/pngwing.com.png'
import cashewPng from 'assets/pngwing.com (1).png'
import walnutPng from 'assets/wulnut.png'
import pistachioPng from 'assets/—Pngtree—pile of pistachio nuts with_15763401.png'

const ingredients = [
  {
    name: 'Roasted Almonds',
    origin: 'California, USA',
    image: almondPng,
    desc: 'Golden-roasted for a sweet, nutty profile and maximum crunch.',
  },
  {
    name: 'Jumbo Cashews',
    origin: 'Vietnam',
    image: cashewPng,
    desc: 'Buttery W320 grade cashews, slow-roasted to creamy perfection.',
  },
  {
    name: 'Brain Walnuts',
    origin: 'Chile',
    image: walnutPng,
    desc: 'Rich in Omega-3, these halves are picked for their earthy flavor.',
  },
  {
    name: 'Green Pistachios',
    origin: 'Iran',
    image: pistachioPng,
    desc: 'Hand-picked for their vibrant color and intense savory taste.',
  },
]

const philosophy = [
  {
    icon: 'local_fire_department',
    title: 'Small Batches',
    desc: 'We roast weekly in small batches to ensure you receive the freshest possible product every time.',
  },
  {
    icon: 'verified',
    title: 'Top Quality',
    desc: 'We source only the highest grade nuts, avoiding fillers or low-quality substitutes.',
  },
  {
    icon: 'eco',
    title: 'No Nasties',
    desc: 'Pure ingredients only. No artificial preservatives, colors, or hidden sugars. Just nature.',
  },
]

const badges = [
  { label: 'Vegan' },
  { label: 'Gluten-Free' },
  { label: 'Keto-Friendly' },
  { label: 'Sustainable Sourced' },
]
</script>

<style scoped lang="scss">
.about-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section Styles
.hero-section {
  height: 90vh;
  min-height: 700px;

  .hero-bg {
    background-size: cover;
    background-position: center;
    transform: scale(1.05);
    animation: zoomOut 10s infinite alternate linear;
  }

  .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
}

.main-title {
  font-size: 5.5rem;
  line-height: 1.1;
  letter-spacing: -3px;
  @media (max-width: 600px) {
    font-size: 3.5rem;
  }
}

.text-gradient {
  background: linear-gradient(to right, $secondary, $positive);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
}

.title-separator {
  width: 100px;
  height: 4px;
  background: $secondary;
  border-radius: 2px;
  box-shadow: 0 0 20px $secondary;
}

// Glass Card Styles
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
}

// Image Stack
.image-stack {
  .main-img {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  }

  .accent-box {
    right: -20px;
    bottom: -20px;
    min-width: 180px;
    z-index: 10;
  }
}

// Ingredient Card
.ingredient-card {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-15px);
    .nut-isolated-img {
      transform: scale(1.1) rotate(10deg);
    }
  }

  .nut-img-container {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nut-isolated-img {
    width: 140px;
    height: auto;
    filter: drop-shadow(0 15px 15px rgba(0, 0, 0, 0.5));
    transition: transform 0.5s ease;
  }
}

// CTA Styles
.cta-section {
  .glow-border {
    border: 1px solid rgba($secondary, 0.2);
    box-shadow: 0 0 80px rgba($secondary, 0.1);
  }
}

.cta-btn {
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba($secondary, 0.5);
  }
}

// Animations
@keyframes zoomOut {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-reveal {
  animation: reveal 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-fade-right {
  animation: reveal 1s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
  opacity: 0;
}

.animate-fade-left {
  animation: reveal 1s cubic-bezier(0.19, 1, 0.22, 1) 0.7s forwards;
  opacity: 0;
}

.animate-bounce {
  animation: q-bounce 2s infinite;
}

@keyframes q-bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.rounded-xl {
  border-radius: 40px !important;
}

.line-height-relaxed {
  line-height: 1.8;
}

.tracking-widest {
  letter-spacing: 4px;
}
</style>
