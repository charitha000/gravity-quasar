<template>
  <div class="experience-section q-py-xl relative-position overflow-hidden bg-dark">
    <!-- Background Decor -->
    <div class="bg-glow absolute-center"></div>

    <div class="container q-mx-auto q-px-md relative-position z-top">
      <!-- Section Header -->
      <div class="text-center q-mb-xl">
        <div class="text-subtitle1 text-accent text-uppercase tracking-widest q-mb-sm font-blink">
          Our Philosophy
        </div>
        <h2 class="text-h2 text-white text-weight-bolder section-title">
          The Art of <br />
          <span class="text-serif text-italic text-secondary">Perfect Snacking</span>
        </h2>
      </div>

      <div class="row items-center justify-center relative-position">
        <!-- Connecting Lines SVG (Desktop Only) -->
        <!-- This SVG creates the dashed lines pointing from cards to center -->
        <svg
          class="connecting-lines gt-sm absolute-full"
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <!-- Top Left to Center -->
          <path
            d="M 250 150 Q 400 150 500 250"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="2"
            stroke-dasharray="10,10"
            class="animated-path"
          />
          <!-- Bottom Left to Center -->
          <path
            d="M 250 450 Q 400 450 500 350"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="2"
            stroke-dasharray="10,10"
            class="animated-path delay-1"
          />
          <!-- Top Right to Center -->
          <path
            d="M 950 150 Q 800 150 700 250"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="2"
            stroke-dasharray="10,10"
            class="animated-path delay-2"
          />
          <!-- Bottom Right to Center -->
          <path
            d="M 950 450 Q 800 450 700 350"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="2"
            stroke-dasharray="10,10"
            class="animated-path delay-3"
          />
        </svg>

        <!-- Left Column: text cards -->
        <div class="col-12 col-md-3 column justify-between q-py-xl" style="height: 600px">
          <div class="info-card glass-panel q-pa-lg text-right q-mr-md-lg">
            <div class="icon-box q-ml-auto q-mb-md">
              <q-icon name="spa" size="2rem" color="accent" />
            </div>
            <div class="text-h5 text-white text-weight-bold q-mb-sm">Freshness First</div>
            <p class="text-grey-5 leading-relaxed">
              Harvested at the peak of ripeness and sealed instantly to preserve that satisfying
              crunch.
            </p>
          </div>

          <div class="info-card glass-panel q-pa-lg text-right q-mr-md-lg">
            <div class="icon-box q-ml-auto q-mb-md">
              <q-icon name="recycling" size="2rem" color="secondary" />
            </div>
            <div class="text-h5 text-white text-weight-bold q-mb-sm">Eco Conscious</div>
            <p class="text-grey-5 leading-relaxed">
              100% biodegradable packaging and sustainable farming practices for a greener planet.
            </p>
          </div>
        </div>

        <!-- Center Column: Image -->
        <div class="col-12 col-md-6 flex flex-center relative-position z-top">
          <!-- Revolving Circle Border -->
          <div class="circle-border absolute-center"></div>

          <q-img
            src="~assets/hero-bg.png"
            class="center-plate floating-animate"
            width="100%"
            style="max-width: 500px; filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))"
          />
        </div>

        <!-- Right Column: text cards -->
        <div class="col-12 col-md-3 column justify-between q-py-xl" style="height: 600px">
          <div class="info-card glass-panel q-pa-lg text-left q-ml-md-lg">
            <div class="icon-box q-mr-auto q-mb-md">
              <q-icon name="diamond" size="2rem" color="warning" />
            </div>
            <div class="text-h5 text-white text-weight-bold q-mb-sm">Premium Sizing</div>
            <p class="text-grey-5 leading-relaxed">
              Only the largest, most perfect nuts make the cut. No broken pieces, just perfection.
            </p>
          </div>

          <div class="info-card glass-panel q-pa-lg text-left q-ml-md-lg">
            <div class="icon-box q-mr-auto q-mb-md">
              <q-icon name="favorite" size="2rem" color="negative" />
            </div>
            <div class="text-h5 text-white text-weight-bold q-mb-sm">Heart Healthy</div>
            <p class="text-grey-5 leading-relaxed">
              Rich in antioxidants and healthy fats to keep your heart beating to the rhythm of
              life.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for this visual component
</script>

<style scoped lang="scss">
.experience-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.bg-glow {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba($secondary, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
}

.text-serif {
  font-family: 'Playfair Display', serif; /* Or fallback to serif */
}

.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba($accent, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    .icon-box {
      transform: scale(1.1) rotate(5deg);
    }
  }
}

.icon-box {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.section-title {
  font-size: 4rem;
  line-height: 1.1;
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
}

.tracking-widest {
  letter-spacing: 0.2em;
}

.floating-animate {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Connecting Lines */
.connecting-lines {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.animated-path {
  stroke-dasharray: 10;
  animation: dash 30s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}

/* Revolving Circle */
.circle-border {
  width: 550px;
  height: 550px;
  border: 1px dashed rgba($accent, 0.2);
  border-radius: 50%;
  animation: spin 60s linear infinite;

  @media (max-width: 600px) {
    width: 90vw;
    height: 90vw;
  }
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Font blink for small subtitle */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
