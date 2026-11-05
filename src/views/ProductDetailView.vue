<template>
  <Loading :active="isLoading"></Loading>
  <TheHeader />

  <div class="container-xl py-3">
    <TheBreadcrumb :product-title="product.title" />
    <main>
      <!-- ✏️ 修改：載入完成才顯示商品資訊 -->
      <div v-if="!isLoading && product.id" class="row mb-4">
        <div class="col-12 col-md-6 col-lg-8">
          <!-- 手機、平板：左右滑動 -->
          <div class="d-lg-none">
            <Swiper v-bind="galleryOptions" class="product-gallery-swiper">
              <SwiperSlide v-for="(url, index) in photos" :key="url">
                <img
                  :src="url"
                  :alt="`${product.title} ${index + 1}`"
                  class="product-img w-100"
                  style="cursor: zoom-in"
                  @click="openLightboxAt(index)"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <!-- 桌機：2 × 2，超過 4 張時第 4 格顯示「+N」 -->
          <div class="row g-2 d-none d-lg-flex">
            <div
              v-for="(url, index) in visiblePhotos"
              :key="url"
              :class="photos.length === 1 ? 'col-12' : 'col-6'"
            >
              <img
                :src="url"
                :alt="`${product.title} ${index + 1}`"
                class="product-img w-100"
                style="cursor: zoom-in"
                @click="openLightboxAt(index)"
              />
            </div>
            <div v-if="photos.length > 4" class="col-6">
              <button
                type="button"
                class="photo-more"
                :aria-label="`View all ${photos.length} photos`"
                @click="openLightboxAt(3)"
              >
                <img :src="photos[3]" alt="" class="product-img w-100" />
                <span class="photo-more-overlay">+{{ photos.length - 3 }}</span>
              </button>
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

          <!-- 收藏 + 評分 //評分隨機給，因為沒有api-->
          <div class="d-flex align-items-center gap-3 mb-2">
            <button
              type="button"
              class="btn p-0 border-0 lh-1 fs-5"
              :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
              @click="favoriteStore.toggleFavorite(product.id)"
            >
              <i
                class="bi heart-icon"
                :class="isFavorite ? 'bi-heart-fill is-active' : 'bi-heart'"
              ></i>
            </button>
            <span><i class="bi bi-star-fill text-warning"></i> {{ rating }}</span>
          </div>

          <!-- 價格：✏️ 修改，有折扣才顯示原價 -->
          <div class="mb-2 mb-lg-4">
            <span class="fs-2 fw-bold text-dark">${{ currency(product.price) }}</span>
            <span
              v-if="product.origin_price > product.price"
              class="text-muted text-decoration-line-through ms-2"
              >${{ currency(product.origin_price) }}</span
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

          <!-- 顏色：商品有 colors 才顯示 -->
          <div v-if="productColors.length" class="mb-3">
            <p class="mb-2">
              Color :
              <span class="fw-semibold" :class="{ 'text-muted fw-normal': !selectedColor }">
                {{ selectedColor || "Please select" }}
              </span>
            </p>
            <div class="d-flex flex-wrap gap-2">
              <button
                v-for="color in productColors"
                :key="color.name"
                type="button"
                class="color-swatch"
                :class="{ active: selectedColor === color.name }"
                :style="{ backgroundColor: color.code }"
                :title="color.name"
                :aria-label="color.name"
                @click="selectedColor = color.name"
              ></button>
            </div>
          </div>

          <!-- 尺寸：商品有 sizes 才顯示 -->
          <div v-if="productSizes.length" class="mb-3">
            <p class="mb-2">Size :</p>
            <div class="d-flex flex-wrap gap-2">
              <button
                v-for="size in productSizes"
                :key="size"
                type="button"
                class="size-btn"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

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

          <!-- 沒選完的提醒 -->
          <p v-if="optionError" class="text-danger fs-6 mb-2">{{ optionError }}</p>

          <!-- 加入購物車 -->
          <button
            class="btn w-100 rounded-0 py-3 fw-bold bg-primary text-white"
            @click="addCart(product.id)"
            :disabled="cartStore.loadingItem === product.id"
          >
            <span
              v-if="cartStore.loadingItem === product.id"
              class="spinner-border spinner-border-sm text-white me-2"
              role="status"
            ></span>
            Add to cart
          </button>
        </div>
      </div>

      <!-- ✅ 新增：載入中的骨架畫面 -->
      <div v-else class="row mb-4 placeholder-wave" aria-hidden="true">
        <div class="col-12 col-md-6 col-lg-8">
          <!-- 手機、平板：一張 -->
          <div class="ratio ratio-1x1 d-lg-none">
            <div class="placeholder w-100 h-100"></div>
          </div>
          <!-- 桌機：2 × 2 -->
          <div class="row g-2 d-none d-lg-flex">
            <div v-for="n in 4" :key="n" class="col-6">
              <div class="ratio ratio-1x1">
                <div class="placeholder w-100 h-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <span class="placeholder col-3 mb-3"></span>
          <h3><span class="placeholder col-10"></span></h3>
          <p>
            <span class="placeholder col-12"></span>
            <span class="placeholder col-8"></span>
          </p>
          <p><span class="placeholder col-2"></span></p>
          <h2 class="mb-4"><span class="placeholder col-4"></span></h2>
          <p><span class="placeholder col-3"></span></p>
          <div class="d-flex gap-2 mb-4">
            <span class="placeholder" style="width: 3rem; height: 2.25rem"></span>
            <span class="placeholder" style="width: 3rem; height: 2.25rem"></span>
            <span class="placeholder" style="width: 3rem; height: 2.25rem"></span>
            <span class="placeholder" style="width: 3rem; height: 2.25rem"></span>
          </div>
          <p><span class="placeholder col-3"></span></p>
          <span class="placeholder col-4 mb-4" style="height: 2.5rem"></span>
          <span class="placeholder w-100" style="height: 3.5rem"></span>
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
            <div v-if="product.sizeFit" class="text-muted" v-html="product.sizeFit"></div>
            <p v-else class="text-muted mb-0">No size & fit information available.</p>
          </div>
          <div class="tab-pane fade" id="material" role="tabpanel">
            <h5 class="fw-bold mb-3">Material / Composition</h5>
            <p v-if="product.material" class="text-muted mb-0" style="white-space: pre-line">
              {{ product.material }}
            </p>
            <p v-else class="text-muted mb-0">No material information available.</p>
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
// ===== Swiper =====
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination"; // ✅ 新增：手機圖片輪播的「1 / 8」頁數樣式

// ===== 圖片放大 =====
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

// ===== 購物車 =====
import { useCartStore } from "@/stores/cart";
import { useFavoriteStore } from "@/stores/favorite";
import { Offcanvas } from "bootstrap";

// ===== 元件 =====
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import ProductCard from "@/components/ProductCard.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";

// ===== 工具函式與設定 =====
import { currency } from "@/methods/filters";
import { productOptions, galleryOptions } from "@/config/swiperOptions"; // ✏️ 修改：加上 galleryOptions

export default {
  setup() {
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();
    return { cartStore, favoriteStore };
  },
  components: {
    TheHeader,
    TheFooter,
    TheBreadcrumb,
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isLoading: false,
      product: {},
      selectedSize: "",
      selectedColor: "", // 選擇的顏色
      optionError: "", // 沒選完的提醒文字
      qty: 1,
      lightbox: null,
      photoSizes: {}, // ✅ 新增：每張圖片的實際寬高，燈箱需要
      recentProducts: [], //recent
      mightLikeProducts: [], //might like
      status: {
        LoadingItem: "",
      },
      swiperOptions: productOptions,
      galleryOptions, // ✅ 新增：手機圖片輪播設定
    };
  },
  mounted() {
    // ✏️ 修改：建立燈箱，圖片清單在點擊時才交給它
    this.lightbox = new PhotoSwipeLightbox({
      pswpModule: () => import("photoswipe"),
    });
    this.lightbox.init();
  },
  // ✅ 新增：離開頁面時清掉燈箱
  beforeUnmount() {
    if (this.lightbox) this.lightbox.destroy();
  },
  methods: {
    currency,
    getProduct() {
      const id = this.$route.params.id;
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          // console.log("res:", res.data);
          this.product = res.data.product;
          this.$nextTick(() => this.loadPhotoSizes()); // ✅ 新增：先讀出圖片尺寸
          this.saveToRecent(id);
          this.getRelated();
        })
        .catch((err) => {
          this.isLoading = false; // 失敗：也要關閉 Loading
          console.error("取得商品失敗：", err);
          this.$router.push("/products");
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
      // 是不是目前頁面的商品（下方輪播的卡片不是）
      const isCurrent = id === this.product.id;

      // 目前頁面的商品，有顏色或尺寸就要選完才能加入
      if (isCurrent) {
        if (this.productColors.length && !this.selectedColor) {
          this.optionError = "Please select a color.";
          return;
        }
        if (this.productSizes.length && !this.selectedSize) {
          this.optionError = "Please select a size.";
          return;
        }
      }

      // 目前商品用選的數量，下方卡片固定 1 件
      const qty = isCurrent ? this.qty : 1;

      this.status.LoadingItem = id;
      const options = isCurrent ? { size: this.selectedSize, color: this.selectedColor } : {};
      this.cartStore.addCart(id, qty, options).then(() => {
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
    // ✅ 新增：先讀出每張圖片的實際尺寸，燈箱才能顯示正確的比例
    loadPhotoSizes() {
      this.photos.forEach((url) => {
        if (this.photoSizes[url]) return;
        const img = new Image();
        img.onload = () => {
          this.photoSizes[url] = { width: img.naturalWidth, height: img.naturalHeight };
        };
        img.src = url;
      });
    },
    // ✏️ 修改：點第幾張圖，燈箱就從第幾張開始（可以左右滑看全部）
    openLightboxAt(index) {
      if (!this.lightbox) return;
      const dataSource = this.photos.map((src) => ({
        src,
        width: this.photoSizes[src]?.width || 1200,
        height: this.photoSizes[src]?.height || 1200,
      }));
      this.lightbox.loadAndOpen(index, dataSource);
    },
  },
  computed: {
    isFavorite() {
      return this.favoriteStore.favorites.includes(this.product.id);
    },
    rating() {
      const seed = this.product.id ? this.product.id.charCodeAt(0) : 0;
      return (4.5 + (seed % 9) * 0.1).toFixed(1);
    },
    // 這個商品可選的尺寸（沒有就是空陣列）
    productSizes() {
      return Array.isArray(this.product.sizes) ? this.product.sizes : [];
    },
    // 這個商品可選的顏色（沒有就是空陣列）
    productColors() {
      return Array.isArray(this.product.colors) ? this.product.colors : [];
    },
    // ✅ 新增：所有圖片，主圖排第一張
    photos() {
      const extra = Array.isArray(this.product.imagesUrl) ? this.product.imagesUrl : [];
      return [...new Set([this.product.imageUrl, ...extra].filter(Boolean))];
    },
    // ✅ 新增：桌機要顯示的圖片，超過 4 張就只顯示 3 張，第 4 格放「+N」
    visiblePhotos() {
      return this.photos.length > 4 ? this.photos.slice(0, 3) : this.photos;
    },
  },
  watch: {
    "$route.params.id"() {
      this.qty = 1; // 換商品時數量回到 1
      this.getProduct();
      this.getRecentProducts();
    },
    // 商品載入後清空選擇，只有一個選項時自動選好
    product() {
      this.selectedSize = this.productSizes.length === 1 ? this.productSizes[0] : "";
      this.selectedColor = this.productColors.length === 1 ? this.productColors[0].name : "";
      this.optionError = "";
    },
    // 選了之後，紅字提醒就消失
    selectedSize() {
      this.optionError = "";
    },
    selectedColor() {
      this.optionError = "";
    },
  },
  created() {
    this.getProduct();
    this.getRecentProducts();
  },
};
</script>
