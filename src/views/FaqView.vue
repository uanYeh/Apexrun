<template>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />

    <main class="mb-4 mb-lg-6">
      <img :src="qaBanner" class="img-fluid w-100 mb-2 mb-lg-6" />
      <div class="container-lg position-relative">
        <article class="article-content">
          <section class="mb-4 mb-lg-6">
            <h3 class="fw-bold h1 mb-2 mb-lg-4">FREQUENTLY ASKED QUESTIONS</h3>
            <h4 class="fw-bold mb-3">All your problems can be solved here…...</h4>
            <p class="mb-3">
              Welcome to APEXRUN's FAQ page! Got questions about our gear, materials, or orders?
              We've got the answers. Can't find what you need? Our team is always happy to help —
              just reach out!
            </p>
            <p class="mb-0">
              Taiwan has always been a place where sport and lifestyle go hand in hand — and APEXRUN
              is proud to be part of that story.
            </p>
          </section>
        </article>
        <section class="qa-content">
          <div class="accordion" id="faqAccordion">
            <div class="accordion-item" v-for="(item, index) in faqList" :key="index">
              <h2 class="accordion-header">
                <button
                  class="accordion-button fw-semibold fs-5"
                  :class="{ collapsed: index !== 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse${index}`"
                  :aria-expanded="index === 0"
                  :aria-controls="`collapse${index}`"
                >
                  {{ index + 1 }}. {{ item.question }}
                </button>
              </h2>
              <div
                :id="`collapse${index}`"
                class="accordion-collapse collapse"
                :class="{ show: index === 0 }"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body">{{ item.answer }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
  <TheFooter />
</template>

<script>
import qaBanner from "@/assets/images/qaBanner.jpg";

import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    TheBreadcrumb,
  },
  data() {
    return {
      qaBanner,
      faqList: [
        {
          question: "What materials are used in APEXRUN products?",
          answer:
            "At APEXRUN, we prioritize sustainability without compromising performance. Our products are made from recycled materials, reclaimed fibers, and high-durability fabrics designed to withstand the demands of sports while minimizing environmental impact.",
        },
        {
          question: "Are APEXRUN products suitable for beginners?",
          answer:
            "Absolutely! We design products for all skill levels. Whether you are just starting out or training for a competition, our lineup covers everything from entry-level to professional grade gear.",
        },
        {
          question: "How do I choose the right size?",
          answer:
            "Each product page includes a detailed size chart. We recommend measuring your chest, waist, and hips and comparing with our guide. If you are between sizes, we suggest sizing up for a more comfortable fit.",
        },
        {
          question: "What is your return and exchange policy?",
          answer:
            "We offer a 30-day return policy on all unused items in original packaging. If the product does not meet your expectations, contact our support team and we will arrange a return or exchange.",
        },
        {
          question: "How do I care for my APEXRUN gear?",
          answer:
            "Machine wash cold with like colors and hang to dry. Avoid bleach and fabric softeners, as they can break down the technical fibers. Do not tumble dry or iron directly on printed areas.",
        },
        {
          question: "Are your products eco-friendly?",
          answer:
            "Yes! Sustainability is at the core of what we do. We use recycled polyester, organic cotton blends, and eco-conscious packaging. Our goal is to reduce our carbon footprint with every product we release.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use it on our website or the carrier's platform to follow your package in real time.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Currently, we ship to all major cities across Taiwan. International shipping is coming soon — stay tuned for updates on our website and social media channels.",
        },
        {
          question: "How can I contact the APEXRUN support team?",
          answer:
            "You can reach us via email at support@apexrun.com.tw, or through the contact form on our website. Our team is available Monday to Friday, 9am–6pm (GMT+8), and typically responds within one business day.",
        },
      ],
    };
  },
};
</script>
