<template>
  <TheHeader />
  <section id="examples" class="section">
    <div class="pswp-gallery" id="my-gallery">
      <a
        href="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200"
        data-pswp-width="1200"
        data-pswp-height="800"
      >
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" />
      </a>
      <a
        href="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200"
        data-pswp-width="1200"
        data-pswp-height="800"
      >
        <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" />
      </a>
    </div>
  </section>

  <div class="container-xl py-3">
    <TheBreadcrumb />

    <a href="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" class="glightbox">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
        style="width: 200px"
      />
    </a>
  </div>
  <TheFooter />
</template>

<script>
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";

export default {
  components: { TheHeader, TheFooter, TheBreadcrumb },
  data() {
    return { lightbox: null };
  },
  mounted() {
    this.$nextTick(() => {
      const lightbox = new PhotoSwipeLightbox({
        gallery: "#my-gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    });
  },
};
</script>

<style>
.glightbox-clean .gslide-image img {
  max-height: 100vh;
  max-width: 100vw;
  object-fit: contain;
}
</style>
