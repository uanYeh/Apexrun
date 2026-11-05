<template>
  <Loading :active="isLoading"></Loading>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <main class="mb-4 mb-lg-6">
      <article v-if="article.id" class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <!-- 封面圖（桌機寬度一半、置中） -->
          <div v-if="article.image" class="row justify-content-center mb-4">
            <div class="col-12 col-md-6">
              <img :src="article.image" :alt="article.title" class="img-fluid w-100" />
            </div>
          </div>

          <!-- 字體大小 -->
          <div class="d-flex justify-content-end mb-3">
            <div class="btn-group btn-group-sm" role="group" aria-label="Font size">
              <button
                type="button"
                class="btn btn-outline-secondary rounded-0"
                :disabled="zoomIndex === 0"
                aria-label="Smaller text"
                @click="changeZoom(-1)"
              >
                A-
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary rounded-0"
                :class="{ active: zoomIndex === defaultZoomIndex }"
                aria-label="Default text size"
                @click="changeZoom(0)"
              >
                A
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary rounded-0"
                :disabled="zoomIndex === zoomLevels.length - 1"
                aria-label="Larger text"
                @click="changeZoom(1)"
              >
                A+
              </button>
            </div>
          </div>

          <!-- 文章文字（依倍數縮放） -->
          <div :class="`article-zoom-${zoomLevels[zoomIndex]}`">
            <!-- 標題 + 作者、日期 -->
            <h1 class="fw-bold fs-2 mb-3">{{ article.title }}</h1>
            <p class="text-muted fs-7 mb-3">
              <i class="bi bi-person me-1"></i>{{ article.author }}
              <span class="mx-2">·</span>
              <i class="bi bi-calendar-week me-1"></i>{{ date(article.create_at) }}
            </p>

            <!-- 標籤 -->
            <div v-if="article.tag && article.tag.length" class="d-flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in article.tag"
                :key="tag"
                class="badge rounded-0 bg-light text-dark border fw-medium"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- 描述 -->
            <p
              v-if="article.description"
              class="fs-5 fw-medium border-start border-4 border-primary ps-3 mb-4"
            >
              {{ article.description }}
            </p>

            <!-- 內文（照後台輸入的換行分段） -->
            <div class="fs-6 lh-lg" style="white-space: pre-line">{{ article.content }}</div>
          </div>

          <hr class="my-5" />

          <!-- 上一篇 / 下一篇 -->
          <nav class="row g-3" aria-label="Article navigation">
            <div class="col-6">
              <RouterLink
                v-if="prevArticle"
                :to="`/news/${prevArticle.id}`"
                class="d-block link-dark link-opacity-50-hover text-decoration-none"
              >
                <span class="d-block fs-7 mb-1 opacity-75">
                  <i class="bi bi-arrow-left me-1"></i>Previous
                </span>
                <span class="fw-semibold clamp2">{{ prevArticle.title }}</span>
              </RouterLink>
            </div>
            <div class="col-6 text-end">
              <RouterLink
                v-if="nextArticle"
                :to="`/news/${nextArticle.id}`"
                class="d-block link-dark link-opacity-50-hover text-decoration-none"
              >
                <span class="d-block fs-7 mb-1 opacity-75">
                  Next<i class="bi bi-arrow-right ms-1"></i>
                </span>
                <span class="fw-semibold clamp2">{{ nextArticle.title }}</span>
              </RouterLink>
            </div>
          </nav>
        </div>
      </article>
    </main>
  </div>
  <TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import { date } from "@/methods/filters";

export default {
  components: { TheHeader, TheFooter, TheBreadcrumb },
  data() {
    return {
      isLoading: false,
      article: {},
      allArticles: [], // 全部文章（算上一篇、下一篇用）

      // 文章文字倍數，對應 _custom.scss 的 article-zoom-xx
      zoomLevels: [90, 100, 115, 130],
      defaultZoomIndex: 1, // 預設 100%
      zoomIndex: 1,
    };
  },
  computed: {
    // 目前這篇在列表中的位置
    currentIndex() {
      return this.allArticles.findIndex((a) => a.id === this.$route.params.id);
    },
    prevArticle() {
      return this.currentIndex > 0 ? this.allArticles[this.currentIndex - 1] : null;
    },
    nextArticle() {
      return this.currentIndex !== -1 && this.currentIndex < this.allArticles.length - 1
        ? this.allArticles[this.currentIndex + 1]
        : null;
    },
  },
  methods: {
    date,
    // 取得這篇文章（列表 API 沒有內文，要單獨抓）
    getArticle() {
      const id = this.$route.params.id;
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/article/${id}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.article = res.data.article;
        })
        .catch((err) => {
          console.error("取得文章失敗：", err);
          this.$router.push("/news"); // 找不到文章就回列表
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 取得全部文章，順序跟 News 列表一樣
    getAllArticles() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/articles`;
      this.$http.get(api).then((res) => {
        this.allArticles = res.data.articles;
      });
    },
    // 調整文字倍數：-1 縮小、1 放大、0 回到預設，並記在瀏覽器
    changeZoom(direction) {
      const next = direction === 0 ? this.defaultZoomIndex : this.zoomIndex + direction;
      this.zoomIndex = Math.min(this.zoomLevels.length - 1, Math.max(0, next));
      try {
        localStorage.setItem("articleZoomIndex", this.zoomIndex);
      } catch {
        // 瀏覽器不能存也沒關係
      }
    },
  },
  watch: {
    // 點上一篇、下一篇時，重新抓文章並回到頂部
    "$route.params.id"(id) {
      if (!id) return;
      window.scrollTo({ top: 0 });
      this.getArticle();
    },
  },
  created() {
    try {
      const saved = Number(localStorage.getItem("articleZoomIndex"));
      if (saved >= 0 && saved < this.zoomLevels.length) this.zoomIndex = saved;
    } catch {
      // 讀不到就用預設
    }
    this.getArticle();
    this.getAllArticles();
  },
};
</script>
