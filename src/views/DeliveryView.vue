<template>
  <TheHeader />
  <div class="container-xl py-3">
    <TheBreadcrumb />

    <h2 class="section-title text-center mb-3 mb-lg-4 fw-bold">Delivery</h2>
    <main class="mb-4 mb-lg-6">
      <h3 class="fw-bold h1 mb-2 mb-lg-4">Products from our affiliated brands</h3>
      <div class="row g-4 mt-2 mt-lg-4 mb-4 mb-lg-6 align-items-stretch">
        <div class="col-12 col-md-4">
          <div class="delivery-panel border p-2 p-lg-4 pt-4 pt-lg-5 h-100">
            <h5 class="text-center fs-4 fw-semibold text-primary">Home delivery</h5>
            <ul>
              <li>Online credit card payment / electronic payment</li>
              <li>
                Free shipping on orders over NT$499 to Taiwan main island and outlying islands
                (excluding large equipment)
              </li>
              <li>
                Orders placed before 23:59 will be shipped the next day and delivered within 1-3
                days (no delivery service on Sundays and public holidays).
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="delivery-panel border p-2 p-lg-4 pt-4 pt-lg-5 h-100">
            <h5 class="text-center fs-4 fw-semibold text-primary">Convenience store pickup</h5>
            <ul>
              <li>Cash payment / Online credit card payment / Electronic payment</li>
              <li>Free shipping on all orders, regardless of amount</li>
              <li>
                Orders placed before 23:59 daily will be shipped the next day and delivered in 1-2
                days.
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="delivery-panel border p-2 p-lg-4 pt-4 pt-lg-5 h-100">
            <h5 class="text-center fs-4 fw-semibold text-primary">In-store pickup</h5>
            <ul>
              <li>Online payment by card/electronic payment</li>
              <li>Free shipping on all orders, regardless of amount</li>
              <li>
                Orders placed before 23:59 daily will be shipped the next day and delivered within
                1-3 days.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container-lg position-relative">
        <article class="article-content">
          <section class="mb-4 mb-lg-6">
            <h4 class="fw-bold mb-3">How is shipping calculated for home delivery?</h4>
            <ul class="fs-6 mb-4 mb-lg-8">
              <li class="mb-1 mb-lg-2">
                Orders picked up at convenience stores or physical stores receive free shipping.
                Home delivery is free for orders over NT$499 (excluding large equipment). The
                shipping cost will be displayed at checkout.
              </li>
              <li class="mb-1 mb-lg-2">
                All home delivery orders purchased from the official website are delivered by
                Hsinchu Logistics.
              </li>
              <li class="mb-1 mb-lg-2">
                If you purchase different types of products simultaneously, the shipping cost will
                be calculated based on the higher-priced type. For equipment, basketball hoops,
                bicycles, and table tennis tables, shipping costs are calculated per item, as shown
                below:
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 3 general items, delivery to the island: Shipping cost = NT$0
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 1 general item + 1 piece of general fitness equipment, delivery to the
                island: Shipping cost = NT$150
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 2 small basketball hoops + 1 general item, delivery to the island: Shipping
                cost = NT$150 x 2 = NT$300
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 1 bicycle + 1 piece of general fitness equipment, delivery to an outlying
                island: Shipping cost = NT$550 + NT$500 = NT$1050
              </li>
            </ul>
          </section>
          <section class="mb-4 mb-lg-6">
            <h4 class="fw-bold mb-3">How is shipping calculated for home delivery?</h4>
            <ul class="fs-6 mb-4 mb-lg-8">
              <li class="mb-1 mb-lg-2">
                Orders picked up at convenience stores or physical stores receive free shipping.
                Home delivery is free for orders over NT$499 (excluding large equipment). The
                shipping cost will be displayed at checkout.
              </li>
              <li class="mb-1 mb-lg-2">
                All home delivery orders purchased from the official website are delivered by
                Hsinchu Logistics.
              </li>
              <li class="mb-1 mb-lg-2">
                If you purchase different types of products simultaneously, the shipping cost will
                be calculated based on the higher-priced type. For equipment, basketball hoops,
                bicycles, and table tennis tables, shipping costs are calculated per item, as shown
                below:
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 3 general items, delivery to the island: Shipping cost = NT$0
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 1 general item + 1 piece of general fitness equipment, delivery to the
                island: Shipping cost = NT$150
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 2 small basketball hoops + 1 general item, delivery to the island: Shipping
                cost = NT$150 x 2 = NT$300
              </li>
              <li class="mb-1 mb-lg-2">
                Purchase 1 bicycle + 1 piece of general fitness equipment, delivery to an outlying
                island: Shipping cost = NT$550 + NT$500 = NT$1050
              </li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  </div>
  <TheFooter />
</template>

<script>
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
    return {};
  },
};
</script>
