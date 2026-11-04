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
              <ul class="dropdown-menu rounded-0 mb-3 mb-lg-0">
                <li><RouterLink class="dropdown-item" to="/products">All Products</RouterLink></li>
                <li v-for="cat in categories" :key="cat">
                  <RouterLink class="dropdown-item" :to="`/products?category=${cat}`">
                    {{ cat }}
                  </RouterLink>
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
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/about"
                >About</RouterLink
              >
            </li>
            <li class="nav-item d-lg-none">
              <RouterLink class="link-hover nav-link fw-semibold fs-6" to="/faq">FAQ </RouterLink>
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
            <!-- 手機選單：My favorite -->
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

        <!-- 桌機版：愛心連到收藏頁（有收藏時變實心） -->
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
  // 收藏 store：判斷 Header 愛心要不要實心
  setup() {
    const favoriteStore = useFavoriteStore();
    return { favoriteStore };
  },
  data() {
    return {
      categories: [],
      keyword: "", // 搜尋關鍵字
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
        this.categories = [...new Set(res.data.products.map((p) => p.category))];
      });
    },
    // 搜尋：按 Enter 後跳到商品頁
    search() {
      if (!this.keyword) {
        this.$router.push("/products");
        return;
      }
      this.$router.push({ path: "/products", query: { search: this.keyword } });
    },
  },
  watch: {
    "$route.query.search": {
      handler(val) {
        this.keyword = val || "";
      },
      immediate: true, // 一進頁面就先同步一次
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
