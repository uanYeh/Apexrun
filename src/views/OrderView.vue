<template>
  <TheHeader />
  <main class="container-xl py-3 my-6">
    <div class="row justify-content-center">
      <div class="stepper col-8 mb-4 px-0 d-flex flex-direction justify-content-between">
        <div class="d-flex align-items-center ps-0 bg-white pe-2">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            1
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25">Order Detail</p>
        </div>
        <div class="d-flex align-items-center ps-0 bg-white pe-2">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            2
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25">Shipping & Payment</p>
        </div>
        <div class="d-flex align-items-center ps-0 bg-white">
          <div
            class="cart-number bg-primary text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            3
          </div>
          <p class="mb-0 fs-5 text-primary fw-semibold">Order Confirm</p>
        </div>
      </div>
      <div class="order-pancel col-8">
        <div class="text-center">
          <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem"></i>
          <p class="fs-3 fw-bold text-primary mb-0">Your Purchase is Complete</p>
          <p>Thank you for purchasing from Carpento.</p>
        </div>
        <div class="order-confirm p-4 border">
          <!-- Order Summary -->
          <h4 class="fw-bold mb-3">Order Summary</h4>
          <hr />

          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <p class="mb-1">Order Number: {{ order.orderNumber }}</p>
              <p class="mb-1">Payment Status: {{ order.paymentStatus }}</p>
              <p class="mb-1">Paid Date: {{ order.paidDate }}</p>
              <p class="mb-1">Total: ${{ order.total }}</p>
              <p class="mb-1">Quantity: {{ order.quantity }}</p>
            </div>
            <div class="col-12 col-md-6">
              <p class="mb-1">Name：{{ order.name }}</p>
              <p class="mb-1">Email：{{ order.email }}</p>
              <p class="mb-1">Tel：{{ order.tel }}</p>
              <p class="mb-1">Shipping Address：</p>
              <p class="mb-1">{{ order.address }}</p>
            </div>
          </div>

          <hr />

          <!-- Product Details -->
          <h4 class="fw-bold mb-3">Product Details</h4>

          <div class="row flex-column">
            <ul class="col-12 list-unstyled">
              <li
                class="cart-item d-flex align-items-center py-2 border-bottom"
                v-for="item in order.products"
                :key="item.id"
              >
                <!-- 圖片 -->
                <img :src="item.imageUrl" alt="item.title" class="cart-item-img me-3" />

                <!-- 商品資訊 -->
                <div class="flex-grow-1">
                  <p class="fw-bold mb-1 cart-item-title me-2">{{ item.title }}</p>
                  <p class="text-muted small mb-1">Qty：1</p>
                </div>

                <!-- 價格 + 刪除 -->
                <div class="d-flex align-items-center gap-3 ms-3">
                  <span class="fw-bold">$1,499</span>
                </div>
              </li>
            </ul>
          </div>
          <!-- Order Total -->
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-bold">Order Total</h6>
            <h6 class="fw-bold">${{ order.total }}.00</h6>
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

export default {
  components: { TheHeader, TheFooter },
  data() {
    return {
      order: {
        orderNumber: "-OzvlXqzKouKTjr8xltA",
        paymentStatus: "Paid",
        paidDate: "Thu Aug 13 2026",
        total: 499,
        quantity: 1,
        name: "444 4",
        email: "4242422@GMAIL.COM",
        tel: "44444444",
        address: "4242, 242, 44, 44 44",
        products: [
          {
            id: 1,
            brand: "DECATHLON",
            title:
              "Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge blue-green)",
            color: "Green",
            qty: 1,
            price: 399,
            imageUrl:
              "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=120&h=120&fit=crop",
          },
          {
            id: 2,
            brand: "DECATHLON",
            title:
              "Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge blue-green)",
            color: "Green",
            qty: 1,
            price: 399,
            imageUrl:
              "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=120&h=120&fit=crop",
          },
        ],
      },
    };
  },
};
</script>
