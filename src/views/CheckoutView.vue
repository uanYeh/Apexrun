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
            class="cart-number bg-primary text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            2
          </div>
          <p class="mb-0 fs-5 text-primary fw-semibold">Shipping & Payment</p>
        </div>
        <div class="d-flex align-items-center ps-0 bg-white">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            3
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25">Order Confirm</p>
        </div>
      </div>
      <div class="cart-pancel">
        <h4 class="fw-bold mb-3">Product Details</h4>

        <div class="row g-3 flex-">
          <div class="col-12 col-lg-8">
            <div class="accordion accordion-flush mb-5" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button
                    class="accordion-button collapsed bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Cart (12items)
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body p-0">
                    <div class="row flex-column mb-4">
                      <ul class="col-12 list-unstyled">
                        <li
                          class="cart-item d-flex align-items-center py-2 border-bottom"
                          v-for="item in cartItems"
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
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="checkout-form">
                <!-- Email Address -->
                <h4 class="fw-bold mb-3">Email Address</h4>
                <div class="mb-4">
                  <label class="form-label fw-bold"
                    >Email Address <span class="text-danger">*</span></label
                  >
                  <input type="email" class="form-control rounded-0" />
                </div>

                <!-- Delivery Address -->
                <h4 class="fw-bold mb-3">Delivery Address</h4>
                <div class="row g-3 mb-4">
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >First Name <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >Last Name <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" />
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Street address <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >City <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >zip code <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" />
                  </div>
                </div>

                <!-- Payment -->
                <h4 class="fw-bold mb-3">Payment</h4>
                <div class="row g-3 mb-4">
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Name on card <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" />
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Card Number <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control rounded-0"
                      placeholder="1234  1234  1234  1234"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >Card expiry date <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control rounded-0" placeholder="MM/YY" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold">&nbsp;</label>
                    <input type="text" class="form-control rounded-0" placeholder="SVV" />
                  </div>
                </div>

                <!-- Place Order -->
                <button class="btn w-100 text-white fw-bold btn-primary rounded-0">
                  place order
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="p-4 bg-light rounded-0">
              <h5 class="fw-bold mb-3">Order Summary</h5>
              <hr />

              <!-- Subtotal & Shipping -->
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-bold">Subtotal</span>
                <span>$120.00</span>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Discount</span>
                <span>$12.00</span>
              </div>

              <hr />

              <!-- Order Total -->
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Order Total</span>
                <span class="fw-bold">$19.00</span>
              </div>
            </div>
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
      cartItems: [
        {
          id: 1,
          brand: "DECATHLON",
          title:
            "Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge blue-green)",
          color: "Green",
          qty: 1,
          price: 1499,
          imageUrl:
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=200&h=200&fit=crop",
        },
        {
          id: 2,
          brand: "NIKE",
          title: "Air Zoom Pegasus 40 Running Shoes",
          color: "Black",
          qty: 1,
          price: 3200,
          imageUrl:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        },
        {
          id: 3,
          brand: "NIKE",
          title: "Air Zoom Pegasus 40 Running Shoes",
          color: "Black",
          qty: 1,
          price: 3200,
          imageUrl:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        },
      ],
    };
  },
};
</script>
