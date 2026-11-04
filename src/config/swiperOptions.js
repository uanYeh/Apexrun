import { Pagination, Autoplay } from "swiper/modules";

// 商品輪播（Clearing / Most Popular）
export const productOptions = {
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
};

// 新品輪播（News Product，旁邊有大圖所以每排比較少）
export const newProductOptions = {
  slidesPerView: 2.1,
  spaceBetween: 8,
  centeredSlidesBounds: true,
  slidesOffsetBefore: -270,
  loop: true,
  breakpoints: {
    375: { slidesPerView: 2.3, slidesOffsetBefore: 0, spaceBetween: 8 },
    576: { slidesPerView: 2.3, slidesOffsetBefore: 0, spaceBetween: 8 },
    768: { slidesPerView: 3.5, slidesOffsetBefore: 0, spaceBetween: 16 },
    992: { slidesPerView: 2.5, slidesOffsetBefore: 0, spaceBetween: 16 },
    1200: { slidesPerView: 4, slidesOffsetBefore: 0, spaceBetween: 16 },
  },
};

// 評論輪播（Ratings & Reviews）
export const reviewsOptions = {
  modules: [Pagination, Autoplay],
  pagination: { clickable: true },
  autoplay: { delay: 3000, disableOnInteraction: false },
  loop: false,
  slidesPerView: 1,
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  },
};

// 服務特色輪播（Repair / Return / Free shipping）
export const featureOptions = {
  modules: [Autoplay],
  autoplay: { delay: 6000, disableOnInteraction: false },
  loop: false,
  slidesPerView: 1,
  breakpoints: {
    992: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
};
