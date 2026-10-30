<template>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <h2 class="section-title text-center mb-3 mb-lg-4 fw-bold">News</h2>
    <main class="mb-4 mb-lg-6">
      <div class="row mx-0 gx-0 g-2 g-lg-4 mb-lg-6 align-items-stretch">
        <div
          class="col-12 col-md-6 col-lg-4 align-items-stretch"
          v-for="item in newsList"
          :key="item.id"
        >
          <div class="news-card card border-0 rounded-0 position-relative h-100">
            <img :src="item.imageUrl" class="rounded-0 img-fluid mb-0" :alt="item.title" />
            <div class="card-body px-1 p-md-2 p-lg-3 pt-2 d-flex flex-column">
              <p class="text-muted fs-7 mb-1">
                <i class="bi bi-calendar-week me-1"></i>{{ item.date }}
              </p>
              <h5 class="fw-semibold">{{ item.title }}</h5>
              <p class="card-text fs-6 fw-medium content-truncate mb-4">{{ item.text }}</p>
              <RouterLink
                :to="`/news/${item.id}`"
                class="stretched-link d-block text-end fs-6 fw-semibold link-dark mt-auto"
                >Read more</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <ThePagination />
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

import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import ThePagination from "@/components/ui/ThePagination.vue";

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
      newsList: [
        {
          id: 1,
          title: "Wavo Launches New Ultra Boost Running Shoes for 2026",
          text: "Wavo's latest Ultra Boost series redefines performance running with cutting-edge cushioning technology and a sleek new design built for all terrains.",
          imageUrl: newsImg,
          date: "2026-09-01",
        },
        {
          id: 2,
          title: "How to Choose the Right Running Shoes for Your Foot Type",
          text: "Finding the perfect pair starts with understanding your arch, gait, and terrain. Our experts break down everything you need to know before your next purchase.",
          imageUrl: newsImg,
          date: "2026-08-20",
        },
        {
          id: 3,
          title: "Wavo Partners with Elite Athletes for 2026 Season",
          text: "We're proud to announce our sponsorship of three world-class marathon runners who will represent Wavo on the global stage this coming season.",
          imageUrl: newsImg,
          date: "2026-08-10",
        },
        {
          id: 4,
          title: "Top 5 Training Tips for Your First Half Marathon",
          text: "Whether you're a beginner or returning runner, these five training strategies will help you cross the finish line strong and injury-free.",
          imageUrl: newsImg,
          date: "2026-07-28",
        },
        {
          id: 5,
          title: "Sustainable Sports Gear: Wavo's Green Initiative",
          text: "Wavo is committed to reducing its environmental footprint with eco-friendly materials and a recycling program for worn-out gear.",
          imageUrl: newsImg,
          date: "2026-07-15",
        },
        {
          id: 6,
          title: "Summer Sale: Up to 30% Off Selected Apparel",
          text: "Don't miss our biggest summer sale of the year. Stock up on breathable, performance-ready apparel at unbeatable prices.",
          imageUrl: newsImg,
          date: "2026-07-01",
        },
      ],
    };
  },
};
</script>
