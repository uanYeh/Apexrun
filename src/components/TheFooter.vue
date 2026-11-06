<template>
  <footer class="bg-primary">
    <div class="container pt-5 pt-lg-7 pb-3 pb-lg-5">
      <div class="d-flex justify-center justify-content-between align-items-center mb-4">
        <a class="navbar-brand" href="#"
          ><img src="@/assets/images/logo-light.svg" style="width: 190px"
        /></a>
        <ul class="footer-nav list-unstyled d-none d-md-flex m-0">
          <li>
            <RouterLink
              class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6"
              to="/faq"
              >FAQ</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6"
              to="/delivery"
              >Delivery</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6"
              to="/return"
              >Return</RouterLink
            >
          </li>
          <li>
            <a
              class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6"
              href="mailto:support@apexrun.com.tw"
              >Contact Us</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex justify-center justify-content-between align-items-center">
        <ul class="list-unstyled text-white">
          <li>Email : support@apexrun.com.tw</li>
          <li>Customer Service : 9:00 AM - 5:00 PM | Monday to Friday</li>
          <li>No. 123, Xingbei Rd., Wenshan District, Taipei City, Taiwan</li>
        </ul>
      </div>
    </div>
    <div class="text-center border-top border-light text-white">
      <p class="mb-0 px-1 py-4 py-lg-2">
        © 2026 Apexrun | Personal Portfolio | Non-Commercial Use | Images:
        <a href="https://unsplash.com/" target="_blank" class="text-decoration-none link-light"
          >Unsplash</a
        >、
        <a href="https://photoswipe.com/" target="_blank" class="text-decoration-none link-light"
          >PhotoSwipe</a
        >、AI、
        <a
          href="https://uanyeh.github.io/apexrun-admin/#/login?demo=1"
          target="_blank"
          class="text-decoration-none fw-semibold"
          style="color: #ffd700"
        >
          後台管理
        </a>
      </p>
    </div>
  </footer>
</template>
