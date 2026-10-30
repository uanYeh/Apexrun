<template>
  <button class="go-top" @click="scrollToTop">
    <i class="bi bi-arrow-up"></i>
  </button>

  <header class="bg-white">
    <nav class="container-xl navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <img src="@/assets/images/logo-dark.svg" alt="Wavo" style="width: 190px" />
        </RouterLink>
        <button
          class="navbar-toggler rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="link-hover nav-link dropdown-toggle fw-semibold fs-6"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Product
              </a>
              <ul class="dropdown-menu rounded-0">
                <li><RouterLink class="dropdown-item" to="/products">All Products</RouterLink></li>
                <li>
                  <RouterLink class="dropdown-item" to="/products?category=shoes">Shoes</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/products?category=apparel"
                    >Apparel</RouterLink
                  >
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/products?category=accessories"
                    >Accessories</RouterLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <RouterLink
                class="link-hover nav-link fw-semibold fs-6"
                aria-current="page"
                to="/news"
                >News</RouterLink
              >
            </li>
            <li class="nav-item">
              <a class="link-hover nav-link fw-semibold fs-6" href="#">About</a>
            </li>
            <li class="nav-item d-lg-none">
              <a class="link-hover nav-link fw-semibold fs-6" href="#">FAQ</a>
            </li>
          </ul>
        </div>
        <div class="position-relative z-1 search-container px-3 py-1 py-md-1">
          <form class="d-flex align-items-center" role="search">
            <i class="bi bi-search"></i>
            <input
              class="form-control me-1 me-md-2 border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <a href="#" class="favorite ms-3 d-none d-lg-block">
          <i class="bi bi-heart fs-4 text-dark"></i>
        </a>
        <CartOffcanvas />
      </div>
    </nav>
  </header>

  <TheCountdown />
</template>

<script>
import Headroom from "headroom.js";
import TheCountdown from "@/components/ui/TheCountdown.vue";
import CartOffcanvas from "@/components/CartOffcanvas.vue";

export default {
  components: { TheCountdown, CartOffcanvas },
  mounted() {
    const header = document.querySelector("header");
    const headroom = new Headroom(header, {
      offset: 300,
      classes: {
        top: "headroom--top",
        notTop: "headroom--not-top shadow-sm",
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
      },
    });
    headroom.init();
    window.addEventListener("scroll", this.handleGoTop);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleGoTop);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleGoTop() {
      const btn = document.querySelector(".go-top");
      if (window.scrollY > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    },
  },
};
</script>
