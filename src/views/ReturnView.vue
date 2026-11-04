<template>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />
    <h2 class="section-title text-center mb-3 mb-lg-4 fw-bold">Delivery</h2>
    <main class="mb-4 mb-lg-6">
      <div class="container-lg position-relative">
        <article class="article-content">
          <section class="mb-4 mb-lg-6">
            <h4 class="fw-bold mb-3">Return and Exchange Policy</h4>
            <ul class="fs-6 mb-4 mb-lg-8">
              <li class="mb-1 mb-lg-2">
                If you purchased online, please keep the returned item intact, seal the packaging,
                and write the order number on the outer packaging.
              </li>
              <li class="mb-1 mb-lg-2">
                Online purchases are "refundable, no exchange." If the item does not meet your
                expectations, please process the return online and then repurchase the item you
                want.
              </li>
              <li class="mb-1 mb-lg-2">
                If the original order was paid for using a shopping voucher, the refund will first
                be processed for the shopping voucher balance. The remaining refund amount will be
                refunded according to the original order's payment method.
              </li>
              <li class="mb-1 mb-lg-2">
                If the order used a discount code, the discount amount will be applied to each item.
                Therefore, when canceling or returning an item, the refund amount will be calculated
                based on the actual payment amount after deducting the discount.
              </li>
              <li class="mb-1 mb-lg-2">
                If you purchased in a physical store and have a three-part invoice, please also
                provide the company invoice stamp for the discount slip. If there are any issues
                with the invoice, please handle them at the service desk within five days of
                issuance. Late applications will not be accepted.
              </li>
              <li class="mb-1 mb-lg-2">
                If you purchased in a physical store, please bring the original purchase invoice to
                any physical store in Taiwan for a return or exchange. For credit card payments, the
                cardholder must bring the original credit card and the signed receipt. For LINE Pay
                payments, you must return to the original store for processing within 60 days.
              </li>
              <li class="mb-1 mb-lg-2">
                Exclusions: Second-hand items are eligible for general return policy, but cannot be
                exchanged.
              </li>
            </ul>
          </section>
          <section class="mb-4 mb-lg-6">
            <h4 class="fw-bold mb-3">Refund Method and Time</h4>
            <ul class="fs-6 mb-4 mb-lg-8">
              <li class="mb-1 mb-lg-2">Refund Method and Time</li>
              <li class="mb-1 mb-lg-2">
                ※ Refunds will be processed within approximately 7-10 business days after the
                returned item is sent to the warehouse.
              </li>
              <li class="mb-1 mb-lg-2">
                ※ If the original order was paid for using a shopping voucher, the refund will first
                be processed for the shopping voucher balance. The remaining refund amount will be
                refunded according to the original order's payment method.
              </li>
              <li class="mb-1 mb-lg-2">
                ※ For orders placed via convenience store cash on delivery or credit card payment
                more than 180 days ago, please click on the offline refund information form and fill
                in your account information. We will then process the refund via bank transfer.
              </li>
              <li class="mb-1 mb-lg-2">
                ※ Online purchases returned at Decathlon stores will not be refunded on-site. Please
                hand the item to the service desk staff, and we will process the refund according to
                the original order's payment method.
              </li>
              <li class="mb-1 mb-lg-2">
                ※ If our customer service center has not received a refund request from the customer
                within 6 months, the platform will prioritize processing the refund and converting
                it into a member shopping credit card, valid for 6 months. If the customer wishes to
                have the refund returned to their original account, please contact our customer
                service center.
              </li>
            </ul>
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
      faqList: [
        {
          question: "What is APEXRUN's return policy?",
          answer:
            "We offer a 30-day return policy on all unused items in original packaging. If the product does not meet your expectations, contact our support team and we will arrange a return or exchange.",
        },
        {
          question: "How do I initiate a return or exchange?",
          answer:
            "To initiate a return or exchange, please contact our support team at support@apexrun.com.tw within 30 days of receiving your order. Include your order number and reason for return, and we will guide you through the process.",
        },
        {
          question: "Can I exchange my item for a different size or color?",
          answer:
            "Yes! Exchanges are available for different sizes or colors, subject to stock availability. Contact our support team and we will do our best to accommodate your request.",
        },
        {
          question: "How long does it take to receive my refund?",
          answer:
            "Once we receive and inspect your returned item, refunds are processed within 5–7 business days. The time it takes to appear in your account may vary depending on your bank or payment provider.",
        },
        {
          question: "Are there any items that cannot be returned?",
          answer:
            "Items that have been worn, washed, or damaged after delivery are not eligible for return. Additionally, sale items and customized products are final sale and cannot be returned or exchanged.",
        },
      ],
    };
  },
};
</script>
