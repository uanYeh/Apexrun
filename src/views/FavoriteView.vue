<template>
  <Loading :active="isLoading"></Loading>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <h2 class="section-title text-center mb-3 mb-lg-4 fw-bold">My Favorites</h2>

    <main class="mb-4 mb-lg-6">
      <!-- 沒有收藏 -->
      <div v-if="!isLoading && favoriteProducts.length === 0" class="text-center text-muted py-5">
        <i class="bi bi-heart fs-1"></i>
        <p class="mt-2 mb-4">You haven't added any favorites yet.</p>
        <RouterLink to="/products" class="btn btn-primary rounded-0 px-4 py-2">
          Shop Now
        </RouterLink>
      </div>

      <!-- 收藏列表 -->
      <template v-else>
        <p class="mb-3">{{ favoriteProducts.length }} items</p>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 mx-n3 gx-3 gy-1 gy-lg-3">
          <div class="col" v-for="item in favoriteProducts" :key="item.id">
            <ProductCard :product="item" @add-cart="addCart" />
          </div>
        </div>
      </template>
    </main>
  </div>
  <TheFooter />
</template>

<script>
// ===== 購物車 / 收藏 =====
import { useCartStore } from "@/stores/cart";
import { useFavoriteStore } from "@/stores/favorite";
import { Offcanvas } from "bootstrap";

// ===== 元件 =====
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import ProductCard from "@/components/ProductCard.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    ProductCard,
    TheBreadcrumb,
  },
  setup() {
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();
    return { cartStore, favoriteStore };
  },
  data() {
    return {
      isLoading: false,
      allProducts: [],
    };
  },
  computed: {
    // 從全部商品裡，找出有被收藏的
    favoriteProducts() {
      return this.allProducts.filter((p) => this.favoriteStore.favorites.includes(p.id));
    },
  },
  methods: {
    getProducts() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.allProducts = res.data.products;
        })
        .catch((err) => {
          this.isLoading = false;
          console.error("取得商品失敗：", err);
        });
    },
    addCart(id) {
      this.cartStore.addCart(id, 1).then(() => {
        const el = document.getElementById("CartOffcanvas");
        const offcanvas = Offcanvas.getOrCreateInstance(el);
        if (!el.classList.contains("show")) {
          offcanvas.show();
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
