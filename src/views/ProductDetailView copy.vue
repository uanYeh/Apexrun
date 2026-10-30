<template>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <main>
      <div class="row mb-4">
        <div class="col-12 col-md-6 col-lg-8">
          <div class="row g-2">
            <div class="col-12 col-lg-6" v-for="(img, index) in visibleImages" :key="index">
              <a :href="img" class="glightbox" data-gallery="product-gallery">
                <img :src="img" class="w-100" style="cursor: pointer" />
              </a>
            </div>
          </div>
          <!-- 隱藏的其餘圖片，只給 lightbox 用 -->
          <template v-for="(img, index) in images.slice(4)" :key="'hidden-' + index">
            <a :href="img" class="glightbox d-none" data-gallery="product-gallery"></a>
          </template>

          <!-- 超過4張才顯示按鈕 -->
          <button
            v-if="images.length > 4"
            class="btn border rounded-0 w-100 mt-3 mb-4"
            @click="openLightboxAt(4)"
          >
            查看更多 ({{ images.length - 4 }})
          </button>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <!-- 標籤 + 品牌 -->
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fs-7 px-2 badge bg-warning rounded-0 text-uppercase">Hot</span>
            <span class="text-muted fs-6 fw-lighter">{{ product.category }}</span>
          </div>

          <!-- 標題 -->
          <h3 class="fw-bold mb-2">{{ product.title }}</h3>
          <div class="fs-6 mb-2">{{ product.text }}</div>

          <!-- 評分 -->
          <p class="mb-2"><i class="bi bi-star-fill text-warning"></i> 4.8</p>

          <!-- 價格 -->
          <div class="mb-2 mb-lg-4">
            <span class="fs-2 fw-bold text-dark">${{ product.price }}</span>
            <span class="text-muted text-decoration-line-through ms-2"
              >${{ product.origin_price }}</span
            >
          </div>

          <!-- 尺寸 -->
          <div class="mb-2 mb-lg-4">
            <p class="mb-2">Size :</p>
            <select class="form-select rounded-0" v-model="selectedSize">
              <option value="">Please select your size.</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
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

          <!-- 加入購物車 -->
          <button class="btn w-100 rounded-0 py-3 fw-bold bg-primary text-white">
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
            <h5 class="fw-bold mb-2">About This Item</h5>
            <p class="text-muted">
              About This Item Dress your little one in comfort with these sleep and play pajamas
              featuring playful dinosaur foot art. Made from soft interlock fabric, they ensure easy
              dressing and all-night coziness. The charming navy design is perfect for little
              adventurers, while the STANDARD 100 by OEKO-TEX® certification guarantees a safe,
              quality fabric for your baby's sensitive skin. Ideal for seasonal wear, these pajamas
              combine style with practicality, making bedtime a breeze for both kids and parents.
              Embrace the joy of playful prints while providing the comfort your child deserves.
              Design You Can Trust Footed design with playful dinosaur foot art. Cuddle tab™
              protects little chins. Soft interlock fabric ensures cozy wear. Long sleeves for added
              warmth. Foldover mitts on newborn & 3M sizes.
            </p>
          </div>
          <div class="tab-pane fade" id="size" role="tabpanel">
            <h5 class="fw-bold mb-3">Size & Fit</h5>
            <p class="text-muted">Please refer to our size guide for the best fit.</p>
          </div>
          <div class="tab-pane fade" id="material" role="tabpanel">
            <h5 class="fw-bold mb-3">Material / Composition</h5>
            <p class="text-muted">100% Polyester</p>
          </div>
        </div>

        <!--Recently Seen-->
        <div class="py-4 px-0 px-lg-3 mb-2 mb-lg-5">
          <h5 class="theme-title fw-bold mb-4">Recently Seen</h5>
          <Swiper v-bind="swiperOptions">
            <SwiperSlide class="col-6 col-md-3" v-for="item in recentProducts" :key="item.id">
              <ProductCard :product="item" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="py-4 px-0 px-lg-3 mb-2 mb-lg-5">
          <h5 class="theme-title fw-bold mb-4">You might like</h5>
          <Swiper v-bind="swiperOptions">
            <SwiperSlide class="col-6 col-md-3" v-for="item in recentProducts" :key="item.id">
              <ProductCard :product="item" />
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
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import photoImg from "@/assets/images/photoImg.jpg";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import ProductCard from "@/components/ProductCard.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default {
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
      qty: 1,
      photoImg,
      showCount: 4,
      lightbox: null,
      product: {
        id: 1,
        title: "Ultra Boost Running Shoes Pro Edition",
        text: "Engineered for long-distance runners, featuring ultra-lightweight cushioning technology that delivers exceptional rebound and comfort across all surfaces.",
        price: 3200,
        origin_price: 4500,
        category: "Shoes",
        imageUrl: photoImg,
      },
      images: [photoImg, photoImg, photoImg, photoImg, photoImg, photoImg],
      recentProducts: [
        {
          id: 1,
          title: "Ultra Boost Running Shoes Pro Edition",
          text: "Engineered for long-distance runners, featuring ultra-lightweight cushioning technology that delivers exceptional rebound and comfort across all surfaces.",
          price: 3200,
          origin_price: 4500,
          category: "Ultra Boost Running",
          imageUrl: photoImg,
        },
        {
          id: 2,
          title: "Lightweight Sport Performance Jacket",
          text: "A breathable, wind-resistant jacket with water-repellent fabric, designed to keep you performing at your best whether on a morning run or intense training session.",
          price: 2800,
          origin_price: 3800,
          category: "Apparel",
          imageUrl: photoImg,
        },
        {
          id: 3,
          title: "High Compression Training Tights",
          text: "High-elasticity compression design promotes blood circulation, reduces muscle fatigue, and enhances both athletic performance and post-workout recovery.",
          price: 1500,
          origin_price: 2000,
          category: "Apparel",
          imageUrl: photoImg,
        },
        {
          id: 4,
          title: "All Terrain Trail Running Shoes",
          text: "Reinforced grip outsole adapts to gravel, mud, and rugged terrain, keeping your stride stable and confident on every trail running adventure.",
          price: 4200,
          origin_price: 5500,
          category: "Shoes",
          imageUrl: photoImg,
        },
        {
          id: 5,
          title: "Waterproof Multi-Pocket Sports Bag",
          text: "Durable waterproof material paired with a versatile multi-pocket layout, making it easy to organize your gear for the gym, trails, or any outdoor activity.",
          price: 1800,
          origin_price: 2500,
          category: "Accessories",
          imageUrl: photoImg,
        },
        {
          id: 6,
          title: "Breathable UV Protection Running Cap",
          text: "Quick-dry, UV-blocking fabric shields you from the sun while keeping you cool and comfortable during outdoor workouts in any weather condition.",
          price: 850,
          origin_price: 1200,
          category: "Accessories",
          imageUrl: photoImg,
        },
        {
          id: 7,
          title: "Breathable UV Protection Running Cap",
          text: "Quick-dry, UV-blocking fabric shields you from the sun while keeping you cool and comfortable during outdoor workouts in any weather condition.",
          price: 850,
          origin_price: 1200,
          category: "Accessories",
          imageUrl: photoImg,
        },
      ],
      swiperOptions: {
        modules: [Navigation],
        navigation: false,
        slidesPerView: 2.1,
        spaceBetween: 8,
        centeredSlidesBounds: true,
        slidesOffsetBefore: -270,
        loop: true,
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
      this.lightbox = GLightbox({ selector: ".glightbox" });
    });
  },
  beforeUnmount() {},
  methods: {
    openLightboxAt(index) {
      if (this.lightbox) {
        this.lightbox.openAt(index);
      }
    },
    // updateShowCount 不再控制 showCount，直接拿掉或留著備用
  },
  computed: {
    visibleImages() {
      return this.images.slice(0, this.showCount); // showCount = 4，應該要有4張
    },
  },
};
</script>
