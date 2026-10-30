<template>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <main class="mb-4 mb-lg-6">
      <img :src="aboutBanner" class="img-fluid w-100 mb-2 mb-lg-6" />
      <div class="container-lg position-relative">
        <article class="article-content">
          <section class="mb-4 mb-lg-6">
            <h3 class="fw-bold h1 mb-2 mb-lg-4">Our Story</h3>
            <h4 class="fw-bold mb-3">It all started in the coastal city of Tainan, Taiwan...</h4>
            <h4 class="fw-bold mb-3">
              At APEXRUN, our passion for sports runs as deep as the ocean, and we strive every day
              to bring the joy of movement to everyone — from the mountains to the sea.
            </h4>
            <p class="mb-3">
              APEXRUN was born in Tainan, a city rich in culture and surrounded by nature. Founder
              Chen Wei-Lin grew up surfing along the southern coastline and believed that great
              sports gear should be accessible to everyone — not just the elite. The name “APEXRUN”
              captures the energy of a wave: powerful, fluid, and always moving forward. Our core
              belief is simple — your passion for sports should never be limited by price or access.
            </p>
            <p class="mb-3">
              From our roots in Tainan, we expanded our design and research centers across Taiwan,
              drawing inspiration from the island’s diverse landscapes — from the surf breaks of
              Kenting to the mountain trails of Hualien. Every product we create is tested in the
              real conditions our athletes face, ensuring performance you can trust.
            </p>
            <p class="mb-3">
              Today, APEXRUN operates across Taiwan with a growing community of athletes, weekend
              warriors, and outdoor enthusiasts. We currently carry a focused lineup of products
              across 7 sports categories — each one carefully selected and tested for real
              performance. As we grow, our vision is clear: to expand our range and bring even more
              sports within reach, so that no matter what moves you, APEXRUN will be there.
            </p>
            <p class="mb-0">
              Taiwan has always been a place where sport and lifestyle go hand in hand — and APEXRUN
              is proud to be part of that story.
            </p>
          </section>
          <!-- <div class="sportPeoplePhoto position-absolute">
            <img :src="signImg" />
            <img :src="sportPeoplePhoto" />
          </div> -->
          <div class="text-end"></div>
        </article>
      </div>
    </main>
  </div>
  <TheFooter />
</template>

<script>
import sportPeoplePhoto from "@/assets/images/full-shot-woman-doing-sport.png";
import aboutBanner from "@/assets/images/aboutBanner.jpg";
import signImg from "@/assets/images/sign.jpg";

import TheHeader from "@/components/front/TheHeader.vue";
import TheFooter from "@/components/front/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    TheBreadcrumb,
  },
  data() {
    return {
      aboutBanner,
      signImg,
      sportPeoplePhoto,
    };
  },
};
</script>
