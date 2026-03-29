<template>
  <div class="row q-col-gutter-lg q-py-xl justify-center">
    <div class="col-12 col-md-4 flex flex-center" v-for="feature in features" :key="feature.title">
      <div class="feature-card column flex-center text-center q-pa-lg">
        <q-icon :name="feature.icon" size="4rem" :color="feature.color" class="q-mb-md glow-icon" />
        <div class="text-h5 text-white text-weight-bold q-mb-sm">{{ feature.title }}</div>
        <div class="text-body1 text-grey-5">{{ feature.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Interstellar Delivery',
    desc: 'Fast shipping across the galaxy. Get your nuts in lightspeed.',
    icon: 'rocket_launch',
    color: 'primary',
  },
  {
    title: 'Premium Quality',
    desc: 'Hand-picked from the finest orchards in the universe.',
    icon: 'diamond',
    color: 'accent',
  },
  {
    title: '100% Organic',
    desc: 'Sustainably grown. No pesticides, just pure natural energy.',
    icon: 'eco',
    color: 'positive',
  },
]
</script>

<style scoped lang="scss">
.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  width: 100%;
  max-width: 350px;
  height: 250px;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
}

.glow-icon {
  filter: drop-shadow(0 0 10px currentColor);
}
</style>
