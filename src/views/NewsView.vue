<template>
  <Loading :active="isLoading"></Loading>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <h2 class="section-title text-center mb-3 mb-lg-4 fw-bold">News</h2>
    <main class="mb-4 mb-lg-6">
      <div class="row mx-0 gx-0 g-2 g-lg-4 mb-lg-6 align-items-stretch">
        <div
          class="col-12 col-md-6 col-lg-4 align-items-stretch"
          v-for="item in pagedArticles"
          :key="item.id"
        >
          <div class="news-card card border-0 rounded-0 position-relative h-100">
            <img :src="item.image" class="rounded-0 img-fluid mb-0" :alt="item.title" />
            <div class="card-body px-1 p-md-2 p-lg-3 pt-2 d-flex flex-column">
              <p class="text-muted fs-7 mb-1">
                <i class="bi bi-calendar-week me-1"></i>{{ date(item.create_at) }}
              </p>
              <h5 class="clamp2 fw-semibold">{{ item.title }}</h5>
              <p class="card-text fs-6 fw-medium content-truncate mb-4">{{ item.description }}</p>
              <RouterLink
                :to="`/news/${item.id}`"
                class="stretched-link d-block text-end fs-6 fw-semibold link-dark mt-auto"
                >Read more</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <ThePagination :currentPage="currentPage" :totalPages="totalPages" @change="changePage" />
      <!-- <div class="row">
        <div class="col-12 col-md-2 col-lg-4">
          <div class="news-card card border-0 rounded-0">
            <img :src="newsImg" class="rounded-0 img-fluid mb-2" alt="..." />
            <div class="card-body p-1 pt-2 p-2 pb-4">
              <h5 class="fw-semibold">
                Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge
              </h5>
              <p class="card-text mb-2 fs-6 fw-medium content-truncate mb-4">
                Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge
                blue-green)Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge
                blue-green)
              </p>
              <a href="/news/1" class="stretched-link d-block text-end fs-6 fw-semibold link-dark"
                >Read more</a
              >
            </div>
          </div>
        </div>
      </div> -->
    </main>
  </div>
  <TheFooter />
</template>

<script>
import newsImg from "@/assets/images/newsImg.jpg";

import TheHeader from "@/components/front/TheHeader.vue";
import TheFooter from "@/components/front/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import ThePagination from "@/components/ui/ThePagination.vue";
import { date } from "@/methods/filters";

export default {
  components: {
    TheHeader,
    TheFooter,
    TheBreadcrumb,
    ThePagination,
  },
  data() {
    return {
      newsImg,
      isLoading: false,
      allArticles: [],
      perPage: 6, //每頁幾筆
      currentPage: 1,
    };
  },
  methods: {
    date,
    getArticles() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/articles`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.allArticles = res.data.articles;
        console.log(res.data.articles);
      });
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allArticles.length / this.perPage);
    },
    pagedArticles() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.allArticles.slice(start, start + this.perPage);
    },
    frontPagination() {
      return {
        total_pages: this.totalPages,
        current_page: this.currentPage,
        has_pre: this.currentPage > 1,
        has_next: this.currentPage < this.totalPages,
      };
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
