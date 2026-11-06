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

        <!-- 漢堡：純 Vue 控制，不用 data-bs-toggle -->
        <button
          class="navbar-toggler rounded-0"
          type="button"
          aria-label="Toggle navigation"
          @click="navOpen = !navOpen"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- navbar-collapse：用 v-show 取代 Bootstrap collapse -->
        <div v-show="navOpen" class="navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="link-hover nav-link fw-semibold fs-6 d-flex justify-content-between align-items-center"
                href="#"
                @click.prevent="toggleProduct"
              >
                Product
                <i
                  class="bi bi-chevron-down ms-1"
                  :style="{
                    transform: productOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }"
                ></i>
              </a>
              <div v-show="productOpen">
                <ul class="list-unstyled ps-3">
                  <li>
                    <RouterLink class="dropdown-item" to="/products">All Products</RouterLink>
                  </li>
                  <li v-for="cat in navCategories" :key="cat">
                    <RouterLink class="dropdown-item" :to="`/products?category=${cat}`">{{
                      cat
                    }}</RouterLink>
                  </li>
                </ul>
              </div>
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
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/about"
                >About</RouterLink
              >
            </li>
            <li class="nav-item d-lg-none">
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/faq">FAQ</RouterLink>
            </li>
            <li class="nav-item d-lg-none">
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/delivery"
                >Delivery</RouterLink
              >
            </li>
            <li class="nav-item d-lg-none">
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/return"
                >Return</RouterLink
              >
            </li>
            <li class="nav-item d-lg-none">
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/favorite"
                >My favorite</RouterLink
              >
            </li>
          </ul>
        </div>

        <!-- 搜尋 -->
        <div class="position-relative z-1 search-container px-3 py-1 py-md-1">
          <form class="d-flex align-items-center" role="search" @submit.prevent="search">
            <button type="submit" class="btn p-0 border-0 search-btn" aria-label="Search">
              <i class="bi bi-search"></i>
            </button>
            <input
              v-model.trim="keyword"
              class="form-control me-1 me-md-2 border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        <!-- 桌機版愛心 -->
        <RouterLink
          to="/favorite"
          class="favorite ms-3 d-none d-lg-block"
          aria-label="My favorites"
        >
          <i
            class="bi fs-4"
            :class="favoriteStore.count ? 'bi-heart-fill' : 'bi-heart'"
            :style="{ color: favoriteStore.count ? '#e53935' : '#212529' }"
          ></i>
        </RouterLink>
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
import { useFavoriteStore } from "@/stores/favorite";

export default {
  components: { CartOffcanvas, TheCountdown },
  setup() {
    const favoriteStore = useFavoriteStore();
    return { favoriteStore };
  },
  data() {
    return {
      navCategories: [],
      keyword: "",
      navOpen: false,
      productOpen: false,
    };
  },
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
    getCategories() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        this.navCategories = [...new Set(res.data.products.map((p) => p.category))].sort();
      });
    },
    search() {
      if (!this.keyword) {
        this.$router.push("/products");
        return;
      }
      this.$router.push({ path: "/products", query: { search: this.keyword } });
    },
    toggleProduct() {
      this.productOpen = !this.productOpen;
    },
  },
  watch: {
    "$route.query.search": {
      handler(val) {
        this.keyword = val || "";
      },
      immediate: true,
    },
    $route() {
      this.productOpen = false;
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
