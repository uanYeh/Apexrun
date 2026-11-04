<template>
  <TheHeader />

  <div class="container-xl py-3">
    <TheBreadcrumb />
    <main>
      <div class="row mb-4">
        <div class="col-12 col-md-6 col-lg-8">
          <div class="row g-2" id="product-gallery">
            <div class="col-12">
              <img :src="product.imageUrl" class="product-img w-100" />
            </div>
          </div>
          <!-- <div class="row g-2">

            <div
              class="col-12 col-lg-6"
              v-for="(product, index) in visibleProducts"
              :key="product.id"
            >
              <a :href="product.imageUrl" class="glightbox">
                <img :src="product.imageUrl" class="product-img" style="cursor: pointer" />
              </a>
            </div>


            <div class="col-12 col-lg-6" v-if="products.length > 4">
              <div class="product-more" @click="openLightboxAt(3)">
                <i class="bi bi-plus-circle"></i>
                <span>查看更多 +{{ products.length - 3 }}</span>
              </div>
            </div>

            <template v-for="(product, index) in products.slice(3)" :key="'hidden-' + index">
              <a :href="product.imageUrl" class="glightbox d-none"></a>
            </template>
          </div> -->

          <!-- <div class="row g-2">
            <div class="col-12 col-lg-6" v-for="(product, index) in products" :key="product.id">
              <a :href="product.imageUrl" class="glightbox" data-gallery="product-gallery">
                <img :src="product.imageUrl" class="w-100 product-img" style="cursor: pointer" />
              </a>
            </div>
            <div class="col-12 col-lg-6" v-if="products.length > 4">
              <div class="product-more" @click="openLightboxAt(4)">
                <i class="bi bi-plus-circle"></i>
                <span>查看更多</span>
              </div>
            </div>
          </div> -->
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <!-- 標籤 + 分類-->
          <div class="d-flex align-items-center mb-2">
            <span
              v-if="product.origin_price > product.price"
              class="fs-7 px-2 badge bg-warning rounded-0 text-uppercase"
              >sale</span
            >
            <span class="text-muted fs-6 fw-lighter ms-auto">{{ product.category }}</span>
          </div>
          <!-- 標題 -->
          <h3 class="fw-bold mb-2">{{ product.title }}</h3>
          <div class="fs-6 mb-2">{{ product.description }}</div>

          <!-- 評分 //隨機給，因為沒有api-->
          <p class="mb-2"><i class="bi bi-star-fill text-warning"></i> {{ rating }}</p>

          <!-- 價格 -->
          <div class="mb-2 mb-lg-4">
            <span class="fs-2 fw-bold text-dark">${{ currency(product.price) }}</span>
            <span class="text-muted text-decoration-line-through ms-2"
              >${{ product.origin_price }}</span
            >
          </div>

          <!-- 尺寸 沒有尺寸，先關閉-->
          <!-- <div class="mb-2 mb-lg-4">
            <p class="mb-2">Size :</p>
            <select class="form-select rounded-0" v-model="selectedSize">
              <option value="">Please select your size.</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div> -->

          <!-- 數量 -->
          <div class="mb-4">
            <p class="mb-2">Count :</p>
            <div class="d-flex border" style="width: fit-content">
              <button class="btn btn-light rounded-0 px-3" @click="qty > 1 && qty--">
                <i class="bi bi-dash"></i>
              </button>
              <div class="d-flex align-items-center justify-content-center px-4">{{ qty }}</div>
              <button class="btn btn-light rounded-0 px-3" @click="qty++">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <!-- 加入購物車 -->
          <button
            class="btn w-100 rounded-0 py-3 fw-bold bg-primary text-white"
            @click="addCart(product.id)"
            :disabled="status.LoadingItem == product.id && status.LoadingItem !== ''"
          >
            <span
              v-if="status.LoadingItem == product.id && status.LoadingItem !== ''"
              class="spinner-border spinner-border-sm text-white me-2"
              role="status"
            ></span>
            Add to cart
          </button>
        </div>
      </div>
      <div>
        <!-- 頁籤 -->
        <ul
          class="nav nav-tabs d-flex flex-nowrap justify-content-center justify-content-md-center align-items-stretch"
          id="productTab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active fw-bold fs-6 rounded-0 border me-1 me-md-2 border-bottom-0 px-3 px-md-6 py-2"
              data-bs-toggle="tab"
              data-bs-target="#details"
              type="button"
              role="tab"
            >
              Details
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fw-bold fs-6 rounded-0 border me-1 me-md-2 border-bottom-0 px-3 px-md-6 py-2"
              data-bs-toggle="tab"
              data-bs-target="#size"
              type="button"
              role="tab"
            >
              Size & Fit
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fw-bold fs-6 rounded-0 border me-1 me-md-2 border-bottom-0 px-3 px-md-6 py-2"
              data-bs-toggle="tab"
              data-bs-target="#material"
              type="button"
              role="tab"
            >
              Material / Composition
            </button>
          </li>
        </ul>

        <!-- 內容 -->
        <div class="tab-content py-4 px-0 px-lg-3 mb-2 mb-lg-4" id="productTabContent">
          <div class="tab-pane fade show active" id="details" role="tabpanel">
            <h5 class="fw-bold mb-2">Details</h5>
            <p class="text-muted">
              {{ product.content }}
            </p>
          </div>
          <div class="tab-pane fade" id="size" role="tabpanel">
            <h5 class="fw-bold mb-3">Size & Fit</h5>
            <SizeGuideTab :category="product.category" />
          </div>
          <div class="tab-pane fade" id="material" role="tabpanel">
            <h5 class="fw-bold mb-3">Material / Composition</h5>
            <ProductInfoTabs :category="product.category" tab="material" />
          </div>
        </div>

        <!--Recently Seen-->
        <div v-if="recentProducts.length > 0" class="py-4 px-0 px-lg-3 mb-2 mb-lg-5">
          <h5 class="theme-title fw-bold mb-4">Recently Seen</h5>
          <Swiper v-bind="swiperOptions">
            <SwiperSlide class="col-6 col-md-3" v-for="item in recentProducts" :key="item.id">
              <ProductCard :product="item" @add-cart="addCart" />
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- You might like -->
        <div class="py-4 px-0 px-lg-3 mb-2 mb-lg-5">
          <h5 class="theme-title fw-bold mb-4">You might like</h5>
          <Swiper v-bind="swiperOptions">
            <SwiperSlide class="col-6 col-md-3" v-for="item in mightLikeProducts" :key="item.id">
              <ProductCard :product="item" @add-cart="addCart" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  </div>
  <TheFooter />
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
// 移除
// import GLightbox from "glightbox";
// import "glightbox/dist/css/glightbox.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import ProductCard from "@/components/ProductCard.vue";
import { currency } from "@/methods/filters";
import SizeGuideTab from "@/components/ui/SizeGuideTab.vue";
import ProductInfoTabs from "@/components/ui/ProductInfoTabs.vue";
import { useCartStore } from "@/stores/cart";
import { Offcanvas } from "bootstrap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  components: {
    TheHeader,
    TheFooter,
    TheBreadcrumb,
    ProductCard,
    Swiper,
    SwiperSlide,
    SizeGuideTab,
    ProductInfoTabs,
  },
  data() {
    return {
      product: {},
      photos: [], // 圖片 gallery 用
      selectedSize: "",
      qty: 1,
      lightbox: null,
      recentProducts: [], //recent
      mightLikeProducts: [], //might like
      status: {
        LoadingItem: "",
      },
      swiperOptions: {
        modules: [Navigation],
        navigation: false,
        slidesPerView: 2.1,
        spaceBetween: 8,
        centeredSlidesBounds: true,
        slidesOffsetBefore: -270,
        loop: true,
        rating: (Math.random() * (5 - 4.2) + 4.2).toFixed(1),
        breakpoints: {
          375: { slidesPerView: 2.3, slidesOffsetBefore: 0, spaceBetween: 8 },
          576: { slidesPerView: 2.3, slidesOffsetBefore: 0, spaceBetween: 16 },
          768: { slidesPerView: 3.5, slidesOffsetBefore: 0, spaceBetween: 16 },
          992: { slidesPerView: 3.5, slidesOffsetBefore: 0, spaceBetween: 16 },
          1200: { slidesPerView: 5.5, slidesOffsetBefore: -122, spaceBetween: 16 },
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const lightbox = new PhotoSwipeLightbox({
        gallery: "#product-gallery",
        children: "a.pswp-item",
        pswpModule: () => import("photoswipe"),
      });

      lightbox.on("contentLoad", (e) => {
        const { content } = e;
        if (content.type === "image") {
          e.preventDefault();
          const img = new Image();
          img.src = content.data.src;
          img.onload = () => {
            content.data.w = img.naturalWidth;
            content.data.h = img.naturalHeight;
            content.onLoaded();
          };
        }
      });

      lightbox.init();
      this.lightbox = lightbox;
    });
  },
  methods: {
    currency,
    getProduct() {
      const id = this.$route.params.id;
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        // console.log("res:", res.data);
        this.product = res.data.product;
        this.saveToRecent(id);
        this.getRelated();
      });
    },
    // addCart(id) {
    //   this.status.LoadingItem = id;
    //   const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
    //   const cart = { product_id: id, qty: this.qty };
    //   this.$http.post(api, { data: cart }).then((res) => {
    //     this.status.LoadingItem = "";
    //     console.log(res);
    //   });
    // },
    // addCart(id) {
    //   this.status.LoadingItem = id;
    //   this.cartStore.addCart(id, this.qty).then(() => {
    //     this.status.LoadingItem = "";
    //   });
    // },
    addCart(id) {
      this.status.LoadingItem = id;
      this.cartStore.addCart(id, this.qty).then(() => {
        this.status.LoadingItem = "";
        const el = document.getElementById("CartOffcanvas");
        const offcanvas = Offcanvas.getOrCreateInstance(el);
        if (!el.classList.contains("show")) {
          offcanvas.show();
        }
      });
    },
    //You might like
    getRelated() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        this.mightLikeProducts = res.data.products
          .filter((p) => p.category === this.product.category && p.id !== this.product.id)
          .slice(0, 7);
      });
    },
    saveToRecent(id) {
      let recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");
      recent = recent.filter((item) => item !== id);
      recent.unshift(id);
      recent = recent.slice(0, 8);
      localStorage.setItem("recentProducts", JSON.stringify(recent));
    },
    getRecentProducts() {
      const recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");
      const ids = recent.filter((id) => id !== this.$route.params.id);
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        const all = res.data.products;
        this.recentProducts = ids.map((id) => all.find((p) => p.id === id)).filter(Boolean);
      });
    },
    openLightboxAt(index) {
      if (this.lightbox) {
        this.lightbox.loadAndOpen(index);
      }
    },
  },
  computed: {
    rating() {
      const seed = this.product.id ? this.product.id.charCodeAt(0) : 0;
      return (4.5 + (seed % 9) * 0.1).toFixed(1);
    },
  },
  watch: {
    "$route.params.id"() {
      this.getProduct();
      this.getRecentProducts();
    },
  },
  created() {
    this.getProduct();
    this.getRecentProducts();
  },
};
</script>
