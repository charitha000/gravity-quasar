<template>
  <div class="collection-section q-py-xl bg-black">
    <div class="container q-mx-auto q-px-md">
      <!-- Section Header -->
      <div class="row justify-center q-mb-xl">
        <div class="col-12 col-md-10 text-center">
          <h2 class="text-h2 text-white text-weight-bolder section-title">
            Discover
            <span class="text-serif text-italic text-primary">Our Finest Selection</span>
          </h2>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="row q-col-gutter-md justify-center">
        <div v-for="product in products" :key="product.name" class="col-6 col-md-2">
          <div class="product-card column items-center relative-position">
            <!-- Egg Background -->
            <div class="egg-bg absolute-full" :style="{ '--arch-color': product.color }"></div>

            <!-- Product Image -->
            <div class="product-image-container relative-position flex flex-center">
              <q-img :src="product.image" class="product-img" fit="cover" />

              <!-- Hover Overlay Button -->
              <div class="absolute-bottom text-center q-pb-md add-btn-wrapper">
                <q-btn round color="white" text-color="dark" icon="add" class="add-btn shadow-10" />
              </div>
            </div>

            <!-- Info -->
            <div class="text-center q-mt-sm relative-position z-top">
              <div class="text-subtitle2 text-white text-weight-medium">{{ product.name }}</div>
              <div class="text-h6 text-serif text-weight-bold" :style="{ color: product.color }">
                ${{ product.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Using the new PNG product images
import almondImg from '../assets/pngwing.com.png'
import cashewImg from '../assets/pngwing.com (1).png'
import pistachioImg from '../assets/—Pngtree—pile of pistachio nuts with_15763401.png'
import walnutImg from '../assets/wulnut.png'

const products = [
  {
    name: 'Pistachios',
    price: '39.99',
    image: pistachioImg,
    color: '#aaff08', // Green
  },
  {
    name: 'Walnuts',
    price: '24.99',
    image: walnutImg,
    color: '#d4af37', // Gold
  },
  {
    name: 'Cashews',
    price: '34.99',
    image: cashewImg,
    color: '#03e8a1', // Teal
  },
  {
    name: 'Almonds',
    price: '29.99',
    image: almondImg,
    color: '#ff8a00', // Orange
  },
]
</script>

<style scoped lang="scss">
.section-title {
  font-size: 3.5rem;
  line-height: 1.1;
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
}

.text-serif {
  font-family: 'Playfair Display', serif;
}

.product-card {
  height: 320px;
  transition: transform 0.4s ease;
  padding: 20px 10px;

  &:hover {
    transform: translateY(-10px);

    .egg-bg {
      opacity: 0.25;
      box-shadow: 0 0 40px var(--arch-color);
      transform: scale(1.05);
    }

    .product-img {
      transform: scale(1.1);
    }

    .add-btn-wrapper {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.egg-bg {
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; /* Egg shape */
  background: linear-gradient(180deg, var(--arch-color) 0%, transparent 100%);
  opacity: 0.1;
  transition: all 0.4s ease;
  z-index: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-image-container {
  width: 100%;
  height: 180px;
  z-index: 1;
}

.product-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.add-btn-wrapper {
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.add-btn {
  font-size: 0.9rem;
  letter-spacing: 1px;
  &:hover {
    transform: scale(1.05);
  }
}

.hover-accent:hover {
  background: $primary !important;
  color: black !important;
  border-color: $primary !important;
}
</style>
