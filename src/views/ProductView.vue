<template>
  <Loading :active="isLoading"></Loading>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <div v-if="currentCategory" class="border p-4 mb-4 mx-0 mx-lg-2">
      <h3 class="fw-bold">{{ currentCategory.title }}</h3>
      <p class="fs-6">{{ currentCategory.desc }}</p>
    </div>

    <!-- 搜尋結果提示 -->
    <div v-if="$route.query.search" class="mb-3 mx-0 mx-lg-2">
      Search results for "<strong>{{ $route.query.search }}</strong
      >"
      <span v-if="products.length === 0" class="text-muted"> — no products found</span>
    </div>

    <div class="row mx-0 gx-0 px-0 px-lg-3">
      <!-- 左側篩選 -->
      <aside class="col-lg-2 mb-4 mb-lg-0">
        <div class="sticky-top" style="top: 20px">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-filter-circle fs-4"></i>
            <p class="mx-2 fs-4 fw-semibold mb-0">Filter</p>
          </div>
          <ul class="list-unstyled mx-0 me-2">
            <li class="border border-lg-0 p-2 d-inline-block d-lg-block me-2 mb-2 m-lg-0">
              <a
                @click.prevent="$router.push('/products')"
                href="#"
                class="text-dark text-decoration-none d-inline-block d-lg-block"
                >All</a
              >
            </li>
            <li
              v-for="cat in categories"
              :key="cat"
              class="border border-lg-0 p-2 d-inline-block d-lg-block me-2 mb-2 m-lg-0"
            >
              <a
                @click.prevent="$router.push(`/products?category=${cat}`)"
                href="#"
                class="text-dark text-decoration-none d-inline-block d-lg-block"
              >
                {{ cat }}
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右側商品列表 -->
      <main class="products col-lg-10 mb-4 px-lg-0">
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-md-center mb-3"
        >
          <span>{{ products.length }} items</span>
          <div class="d-flex justify-content-center align-items-center">
            <span class="me-2">Sort by:</span>
            <select v-model="sortBy" class="form-select w-auto rounded-0">
              <option value="">select</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        <div class="row mx-n3 mb-4 mb-lg-6 gx-3 gy-1 gy-lg-3">
          <div class="col-6 col-md-4 col-lg-3" v-for="item in pagedProducts" :key="item.id">
            <ProductCard :product="item" @add-cart="addCart" />
          </div>
        </div>
        <ThePagination :currentPage="currentPage" :totalPages="totalPages" @change="changePage" />
      </main>
    </div>
  </div>
  <TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import ProductCard from "@/components/ProductCard.vue";
import ThePagination from "@/components/ui/ThePagination.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import { useCartStore } from "@/stores/cart";
import { Offcanvas } from "bootstrap";

export default {
  components: { TheHeader, TheFooter, ProductCard, ThePagination, TheBreadcrumb },
  data() {
    return {
      allProducts: [],
      products: [],
      isLoading: false,
      sortBy: "",
      perPage: 16, //一頁幾筆
      currentPage: 1,
      categoryDesc: [
        //無api 只好寫死分類跟說明
        {
          category: "",
          title: "ALL",
          desc: "Discover performance gear built for every sport. APEXRUN brings you premium running shoes, apparel, and accessories — designed to keep you moving further, faster, and stronger.",
        },
        {
          category: "Bags",
          title: "BAGS",
          desc: "Carry your essentials with ease. Our backpacks and waist bags are built for athletes who need storage without the bulk.",
        },
        {
          category: "Apparel",
          title: "APPAREL",
          desc: "Train in comfort and style. Our technical apparel is crafted to move with your body — breathable, lightweight, and built for performance.",
        },
        {
          category: "Equipment",
          title: "EQUIPMENT",
          desc: "Protect your body and track your performance. APEXRUN equipment — from knee sleeves to timers — gives you the edge you need.",
        },
        {
          category: "Accessories",
          title: "ACCESSORIES",
          desc: "From hats and gloves to socks, our accessories are designed to keep you focused on the run — no matter the weather.",
        },
      ],
    };
  },
  methods: {
    getProducts() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.allProducts = res.data.products;
        this.filterProducts();
      });
    },
    // 依分類 + 搜尋關鍵字篩選
    filterProducts() {
      const category = this.$route.query.category;
      const search = (this.$route.query.search || "").toLowerCase();

      this.products = this.allProducts.filter((p) => {
        const matchCategory = category ? p.category === category : true;
        const matchSearch = search
          ? [p.title, p.content, p.category].some((text) =>
              (text || "").toLowerCase().includes(search),
            )
          : true;
        return matchCategory && matchSearch;
      });

      this.currentPage = 1; // 篩選後回到第一頁
    },
    changePage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
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
  watch: {
    "$route.query.category"() {
      this.filterProducts();
    },
    "$route.query.search"() {
      this.filterProducts();
    },
  },
  computed: {
    categories() {
      return [...new Set(this.allProducts.map((p) => p.category))];
    },
    sortedProducts() {
      const list = [...this.products];
      if (this.sortBy === "price-asc") return list.sort((a, b) => a.price - b.price);
      if (this.sortBy === "price-desc") return list.sort((a, b) => b.price - a.price);
      if (this.sortBy === "name-asc") return list.sort((a, b) => a.title.localeCompare(b.title));
      if (this.sortBy === "name-desc") return list.sort((a, b) => b.title.localeCompare(a.title));
      return list;
    },
    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    },
    pagedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sortedProducts.slice(start, start + this.perPage);
    },
    //這是分類說明(沒有api 所以寫死的方式)
    currentCategory() {
      if (this.$route.query.search) return null; // 搜尋時不顯示分類說明
      return this.categoryDesc.find((item) => item.category === (this.$route.query.category || ""));
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  created() {
    this.getProducts();
  },
};
</script>
