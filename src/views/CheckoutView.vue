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
        <a
          @click.prevent="$router.back()"
          href="#"
          class="text-decoration-none text-muted mb-3 d-inline-block link-dark"
        >
          <i class="bi bi-arrow-left me-1"></i>Back to Cart
        </a>
        <h4 class="fw-bold mb-3">Product Details</h4>

        <div class="row g-3 flex-">
          <div class="col-12 col-lg-8">
            <div class="mb-5">
              <button
                class="btn btn-light w-100 text-start rounded-0 d-flex justify-content-between align-items-center py-3 px-3"
                type="button"
                @click="isOpen = !isOpen"
              >
                <span>Cart ({{ cartStore.carts.length }} items)</span>
                <i class="bi bi-chevron-down" :class="{ 'rotate-180': isOpen }"></i>
              </button>
              <div v-show="isOpen">
                <ul class="list-unstyled mt-2">
                  <li
                    class="cart-item d-flex align-items-center py-2 border-bottom"
                    v-for="item in cartStore.carts"
                    :key="item.id"
                  >
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="cart-item-img me-3"
                    />
                    <div class="flex-grow-1">
                      <p class="fw-bold mb-1 cart-item-title me-2">{{ item.product.title }}</p>
                      <p class="text-muted small mb-1">Qty：{{ item.qty }}</p>
                    </div>
                    <div class="d-flex align-items-center gap-3 ms-3">
                      <span class="fw-bold">${{ currency(item.total) }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12">
              <Form @submit="placeOrder" class="checkout-form">
                <!-- Email -->
                <h4 class="fw-bold mb-3">Email Address</h4>
                <div class="mb-4">
                  <label class="form-label fw-bold"
                    >Email Address <span class="text-danger">*</span></label
                  >
                  <Field
                    name="email"
                    type="email"
                    class="form-control rounded-0"
                    rules="required|email"
                    v-model="form.email"
                  />
                  <ErrorMessage name="email" class="text-danger fs-7" />
                </div>

                <!-- Delivery Address -->
                <h4 class="fw-bold mb-3">Delivery Address</h4>
                <div class="row g-3 mb-4">
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >First Name <span class="text-danger">*</span></label
                    >
                    <Field
                      name="firstName"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.firstName"
                    />
                    <ErrorMessage name="firstName" class="text-danger fs-7" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >Last Name <span class="text-danger">*</span></label
                    >
                    <Field
                      name="lastName"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.lastName"
                    />
                    <ErrorMessage name="lastName" class="text-danger fs-7" />
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Phone Number <span class="text-danger">*</span></label
                    >
                    <Field
                      name="tel"
                      type="tel"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.tel"
                    />
                    <ErrorMessage name="tel" class="text-danger fs-7" />
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Street address <span class="text-danger">*</span></label
                    >
                    <Field
                      name="address"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.address"
                    />
                    <ErrorMessage name="address" class="text-danger fs-7" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >City <span class="text-danger">*</span></label
                    >
                    <Field
                      name="city"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.city"
                    />
                    <ErrorMessage name="city" class="text-danger fs-7" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >Zip code <span class="text-danger">*</span></label
                    >
                    <Field
                      name="zip"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.zip"
                    />
                    <ErrorMessage name="zip" class="text-danger fs-7" />
                  </div>
                </div>

                <!-- Payment -->
                <h4 class="fw-bold mb-3">Payment</h4>
                <div class="row g-3 mb-4">
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Name on card <span class="text-danger">*</span></label
                    >
                    <Field
                      name="cardName"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      v-model="form.cardName"
                    />
                    <ErrorMessage name="cardName" class="text-danger fs-7" />
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-bold"
                      >Card Number <span class="text-danger">*</span></label
                    >
                    <Field
                      name="cardNumber"
                      type="text"
                      class="form-control rounded-0"
                      rules="required|min:16|max:16"
                      placeholder="1234  1234  1234  1234"
                      v-model="form.cardNumber"
                    />
                    <ErrorMessage name="cardNumber" class="text-danger fs-7" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold"
                      >Card expiry date <span class="text-danger">*</span></label
                    >
                    <Field
                      name="cardExpiry"
                      type="text"
                      class="form-control rounded-0"
                      rules="required"
                      placeholder="MM/YY"
                      v-model="form.cardExpiry"
                    />
                    <ErrorMessage name="cardExpiry" class="text-danger fs-7" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold">&nbsp;</label>
                    <Field
                      name="cardCvv"
                      type="text"
                      class="form-control rounded-0"
                      rules="required|min:3|max:4"
                      placeholder="CVV"
                      v-model="form.cardCvv"
                    />
                    <ErrorMessage name="cardCvv" class="text-danger fs-7" />
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn w-100 text-white fw-bold btn-primary rounded-0 py-3"
                  :disabled="isLoading"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  {{ isLoading ? "Processing..." : "Place Order" }}
                </button>
              </Form>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="p-4 bg-light rounded-0">
              <h5 class="fw-bold mb-3">Order Summary</h5>
              <hr />

              <!-- Subtotal & Shipping -->
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-bold">Subtotal</span>
                <span>${{ currency(cartStore.total) }}</span>
              </div>
              <div
                v-if="cartStore.total !== cartStore.finalTotal"
                class="d-flex justify-content-between mb-3"
              >
                <span class="fw-bold">Discount</span>
                <span class="text-success"
                  >-${{ currency(cartStore.total - cartStore.finalTotal) }}</span
                >
              </div>

              <hr />

              <!-- Order Total -->
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Order Total</span>
                <span class="fw-bold">${{ currency(cartStore.finalTotal) }}</span>
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
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import axios from "axios";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

configure({
  generateMessage: localize("en", {
    messages: {
      required: "{field} is required",
      email: "Please enter a valid email",
      min: "{field} must be at least {length} characters",
      max: "{field} must be at most {length} characters",
    },
  }),
});

export default {
  components: { TheHeader, TheFooter, Form, Field, ErrorMessage },
  setup() {
    const cartStore = useCartStore();
    cartStore.getCart();
    return { cartStore };
  },
  data() {
    return {
      isLoading: false,
      isOpen: false,
      form: {
        email: "",
        firstName: "",
        lastName: "",
        tel: "",
        address: "",
        city: "",
        zip: "",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
      },
    };
  },
  methods: {
    currency,
    async placeOrder() {
      const user = {
        name: `${this.form.firstName} ${this.form.lastName}`,
        email: this.form.email,
        tel: this.form.tel,
        address: `${this.form.address}, ${this.form.city}, ${this.form.zip}`,
      };
      this.isLoading = true;
      try {
        const orderRes = await axios.post(
          `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order`,
          { data: { user } },
        );
        if (!orderRes.data.success) return;

        const orderId = orderRes.data.orderId;

        const payRes = await axios.post(
          `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/pay/${orderId}`,
        );
        if (payRes.data.success) {
          this.$router.push(`/order/${orderId}`);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
