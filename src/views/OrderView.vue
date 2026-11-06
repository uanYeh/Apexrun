<template>
  <TheHeader />
  <main class="container-xl py-3 my-6">
    <div class="row justify-content-center">
      <div
        class="stepper col-12 col-md-8 mb-4 px-0 d-flex justify-content-center justify-content-md-between"
      >
        <div class="d-flex align-items-center bg-white pe-2">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            1
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25 d-none d-md-block">
            Order Detail
          </p>
        </div>
        <div class="d-flex align-items-center bg-white pe-2">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            2
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25 d-none d-md-block">
            Shipping & Payment
          </p>
        </div>
        <div class="d-flex align-items-center bg-white">
          <div
            class="cart-number bg-primary text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            3
          </div>
          <p class="mb-0 fs-5 text-primary fw-semibold">Order Confirm</p>
        </div>
      </div>
      <div class="order-pancel col-12 col-md-8">
        <div class="text-center mb-4">
          <div class="success-checkmark mb-3">
            <svg viewBox="0 0 52 52" class="checkmark-svg">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <!-- <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem"></i> -->
          <p class="fs-3 fw-bold text-primary mb-0">Your Purchase is Complete</p>
          <p>Thank you for purchasing from APEXRUN.</p>
        </div>
        <div class="order-confirm p-4 border" v-if="order">
          <!-- Order Summary -->
          <h4 class="fw-bold mb-3">Order Summary</h4>
          <hr />

          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <p class="mb-1">Order Number: {{ order.id }}</p>
              <p class="mb-1">Payment Status: {{ order.is_paid ? "Paid" : "Unpaid" }}</p>
              <p class="mb-1">Total: ${{ currency(order.total) }}</p>
            </div>
            <div class="col-12 col-md-6">
              <p class="mb-1">Name：{{ order.user.name }}</p>
              <p class="mb-1">Email：{{ order.user.email }}</p>
              <p class="mb-1">Tel：{{ order.user.tel }}</p>
              <p class="mb-1">Shipping Address：</p>
              <p class="mb-1">{{ order.user.address }}</p>
            </div>
          </div>

          <hr />

          <!-- Product Details：✏️ 修改，每個規格一行 -->
          <h4 class="fw-bold mb-3">Product Details</h4>

          <div class="row flex-column">
            <ul class="col-12 list-unstyled">
              <li
                v-for="line in orderLines"
                :key="line.key"
                class="cart-item d-flex align-items-center py-2 border-bottom"
              >
                <img
                  :src="line.product.imageUrl"
                  :alt="line.product.title"
                  class="cart-item-img me-3"
                />
                <div class="flex-grow-1">
                  <p class="fw-bold mb-1 cart-item-title me-2">{{ line.product.title }}</p>
                  <p v-if="line.label" class="text-muted small mb-1">{{ line.label }}</p>
                  <p class="text-muted small mb-1">Qty：{{ line.qty }}</p>
                </div>
                <div class="d-flex align-items-center gap-3 ms-3">
                  <span class="fw-bold">${{ currency(line.product.price * line.qty) }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- ✅ 新增：小計、折扣 -->
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>${{ currency(subtotal) }}</span>
          </div>
          <div v-if="discountAmount > 0" class="d-flex justify-content-between mb-2">
            <span>
              Discount
              <span v-if="couponCode" class="text-muted">({{ couponCode }})</span>
            </span>
            <span class="text-success">-${{ currency(discountAmount) }}</span>
          </div>
          <hr />

          <!-- Order Total -->
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-bold">Order Total</h6>
            <h6 class="fw-bold">${{ currency(order.total) }}</h6>
          </div>
        </div>
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import axios from "axios";
import { currency } from "@/methods/filters";

export default {
  components: { TheHeader, TheFooter },
  data() {
    return {
      order: null,
    };
  },
  computed: {
    // ✅ 新增：訂單裡的商品（API 回傳的是物件，轉成陣列）
    orderItems() {
      return this.order ? Object.values(this.order.products || {}) : [];
    },
    // ✅ 新增：依規格拆成多行；舊訂單沒有規格的話，就是一行
    orderLines() {
      return this.orderItems.flatMap((item) => {
        const variants =
          Array.isArray(item.variants) && item.variants.length
            ? item.variants
            : [{ size: "", color: "", qty: item.qty }];
        return variants.map((v, index) => ({
          key: `${item.id}-${index}`,
          product: item.product,
          qty: v.qty,
          label: [v.color, v.size].filter(Boolean).join(" / "),
        }));
      });
    },
    // ✅ 新增：折扣前的小計
    subtotal() {
      return this.orderItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    },
    // ✅ 新增：折扣金額，四捨五入避免小數點
    discountAmount() {
      return Math.round(this.subtotal - this.order.total);
    },
    // ✅ 新增：用了哪一組折扣碼
    couponCode() {
      const item = this.orderItems.find((i) => i.coupon && i.coupon.code);
      return item ? item.coupon.code : "";
    },
  },
  methods: {
    currency,
    async getOrder() {
      const id = this.$route.params.id;
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${id}`,
      );
      this.order = res.data.order;
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
