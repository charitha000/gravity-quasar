<template>
  <footer class="footer-section q-pt-xl q-pb-lg bg-darker">
    <div class="container q-mx-auto q-px-md">
      <div class="row q-col-gutter-xl q-pb-xl border-bottom">
        <!-- Brand Info -->
        <div class="col-12 col-md-4">
          <div class="text-h4 text-weight-bold text-uppercase q-mb-md">
            BiteNuts<span class="text-accent">.</span>
          </div>
          <p class="text-body1 text-grey-5 q-mb-lg" style="max-width: 300px">
            Elevating your snacking experience with premium nuts. Quality you can taste, health you
            can feel.
          </p>
          <div class="row q-gutter-x-md">
            <q-btn round flat icon="facebook" class="social-icon" />
            <q-btn round flat icon="instagram" class="social-icon" />
            <q-btn round flat icon="twitter" class="social-icon" />
          </div>
        </div>

        <!-- Links -->
        <div class="col-6 col-sm-4 col-md-2">
          <div class="text-subtitle1 text-weight-bold text-white q-mb-md">Shop</div>
          <ul class="footer-links">
            <li><a href="#">All Products</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Gift Boxes</a></li>
          </ul>
        </div>

        <div class="col-6 col-sm-4 col-md-2">
          <div class="text-subtitle1 text-weight-bold text-white q-mb-md">Company</div>
          <ul class="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Orchards</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div class="col-12 col-sm-4 col-md-4">
          <div class="text-subtitle1 text-weight-bold text-white q-mb-md">Contact Us</div>
          <p class="text-grey-5">Email: hello@bitenuts.com</p>
          <p class="text-grey-5">Phone: +1 (555) 123-4567</p>
          <p class="text-grey-5">Address: 123 Starship Drive, Cosmic Valley, CA 90210</p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="row items-center justify-between q-pt-lg text-grey-6 text-caption">
        <div>&copy; 2026 BiteNuts. All rights reserved.</div>
        <div class="row q-gutter-x-md">
          <a href="#" class="hover-white">Privacy Policy</a>
          <a href="#" class="hover-white">Terms of Service</a>
          <a href="#" class="hover-white">Shipping Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-section {
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-darker {
  background: #050505;
}

.border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;

    a {
      color: #9e9e9e;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: white;
        padding-left: 5px;
      }
    }
  }
}

.social-icon {
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: $secondary;
    color: white;
    transform: translateY(-3px);
  }
}

.hover-white:hover {
  color: white;
}
</style>
