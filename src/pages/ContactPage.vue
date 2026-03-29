<template>
  <q-page class="contact-page bg-black text-white">
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center overflow-hidden">
      <div class="hero-bg absolute-full" :style="{ backgroundImage: `url(${heroBg})` }"></div>
      <div class="hero-overlay absolute-full"></div>

      <div class="hero-content text-center relative-position z-top q-pa-md">
        <div class="text-overline text-secondary q-mb-md tracking-widest animate-fade-down">
          WE'D LOVE TO HEAR FROM YOU
        </div>
        <h1 class="text-h1 text-weight-bolder q-mb-lg main-title animate-reveal">
          Get in <span class="text-gradient">Touch</span>
        </h1>
        <div class="title-separator q-mx-auto"></div>
      </div>
    </section>

    <!-- Contact Content -->
    <section
      class="contact-content q-py-xl container relative-position z-top"
      style="margin-top: -100px"
    >
      <div class="row q-col-gutter-xl">
        <!-- Contact Info -->
        <div class="col-12 col-md-5">
          <div class="glass-card full-height q-pa-xl animate-fade-right">
            <h2 class="text-h4 text-weight-bold q-mb-lg">Contact Info</h2>
            <p class="text-grey-4 q-mb-xl line-height-relaxed">
              Have a question about our products or want to customize an order? Reach out to us
              directly!
            </p>

            <div class="contact-list q-gutter-y-lg">
              <div class="contact-item row items-center no-wrap">
                <div class="icon-box flex flex-center q-mr-md">
                  <q-icon name="location_on" size="24px" color="secondary" />
                </div>
                <div>
                  <div class="text-subtitle2 text-grey-5 uppercase">Address</div>
                  <div class="text-h6">123 Nutty Lane, Flavor Town, USA</div>
                </div>
              </div>

              <div class="contact-item row items-center no-wrap">
                <div class="icon-box flex flex-center q-mr-md">
                  <q-icon name="phone" size="24px" color="secondary" />
                </div>
                <div>
                  <div class="text-subtitle2 text-grey-5 uppercase">Phone</div>
                  <div class="text-h6">+1 (555) 123-4567</div>
                </div>
              </div>

              <div class="contact-item row items-center no-wrap">
                <div class="icon-box flex flex-center q-mr-md">
                  <q-icon name="email" size="24px" color="secondary" />
                </div>
                <div>
                  <div class="text-subtitle2 text-grey-5 uppercase">Email</div>
                  <div class="text-h6">hello@bitenuts.com</div>
                </div>
              </div>
            </div>

            <div class="social-links q-mt-xl row q-gutter-md">
              <q-btn round flat color="white" icon="facebook" class="social-btn" />
              <q-btn round flat color="white" icon="favorite" class="social-btn" />
              <q-btn round flat color="white" icon="share" class="social-btn" />
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-12 col-md-7">
          <div class="glass-form q-pa-xl animate-fade-left">
            <h2 class="text-h4 text-weight-bold q-mb-lg">Send a Message</h2>
            <q-form @submit="onSubmit" class="q-gutter-y-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="name"
                    dark
                    outlined
                    label="Your Name"
                    color="secondary"
                    class="custom-input"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="email"
                    dark
                    outlined
                    label="Email Address"
                    color="secondary"
                    class="custom-input"
                  />
                </div>
              </div>

              <q-input
                v-model="subject"
                dark
                outlined
                label="Subject"
                color="secondary"
                class="custom-input"
              />

              <q-input
                v-model="message"
                dark
                outlined
                label="Message"
                type="textarea"
                rows="6"
                color="secondary"
                class="custom-input"
              />

              <div class="row justify-end q-mt-lg">
                <q-btn
                  unelevated
                  rounded
                  color="secondary"
                  label="Send Message"
                  type="submit"
                  class="submit-btn q-px-xl q-py-sm text-weight-bold"
                  :loading="submitting"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import heroBg from 'assets/hero-bg.png'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const submitting = ref(false)

const onSubmit = () => {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    // Reset form
    name.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
    alert('Message sent successfully!')
  }, 2000)
}
</script>

<style scoped lang="scss">
.contact-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section Styles
.hero-section {
  height: 60vh;
  min-height: 500px;

  .hero-bg {
    background-size: cover;
    background-position: center;
    transform: scale(1.05);
    animation: zoomOut 10s infinite alternate linear;
  }

  .hero-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
}

.main-title {
  font-size: 4.5rem;
  line-height: 1.1;
  letter-spacing: -2px;
  @media (max-width: 600px) {
    font-size: 3rem;
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
  width: 80px;
  height: 4px;
  background: $secondary;
  border-radius: 2px;
  box-shadow: 0 0 20px $secondary;
}

// Glass Styles
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.glass-form {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

// Contact Info
.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba($secondary, 0.1);
  border: 1px solid rgba($secondary, 0.2);
}

.social-btn {
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: $secondary;
    transform: translateY(-3px);
  }
}

// Form Inputs
.custom-input {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
  }
  :deep(.q-field__label) {
    color: rgba(255, 255, 255, 0.6);
  }
}

.submit-btn {
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba($secondary, 0.4);
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
  animation: reveal 1s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards;
  opacity: 0;
}

.animate-fade-left {
  animation: reveal 1s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
  opacity: 0;
}

.line-height-relaxed {
  line-height: 1.8;
}

.tracking-widest {
  letter-spacing: 4px;
}
</style>
