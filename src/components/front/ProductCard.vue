<template>
  <div class="card product-card border-0 rounded-0 position-relative">
    <div class="photo-img">
      <img :src="product.imageUrl" class="card-img-top rounded-0" :alt="product.title" />
    </div>
    <p
      v-if="product.origin_price > product.price"
      class="position-absolute bg-warning px-2 py-0 mt-1 text-uppercase fw-semibold"
    >
      sale
    </p>
    <div class="card-body p-1 pt-2 pb-4">
      <p class="mb-2 fs-5 fw-medium">
        ${{ product.price }}
        <span
          v-if="product.origin_price !== product.price"
          class="fs-6 text-light-emphasis text-decoration-line-through"
          >${{ product.origin_price }}</span
        >
      </p>
      <p class="card-text mb-2 fs-6 fw-medium content-truncate">{{ product.content }}</p>
      <p class="card-brands mb-2 fs-7 fw-semibold">{{ product.category }}</p>
      <a
        class="icon-cart"
        data-bs-toggle="offcanvas"
        href="#CartOffcanvas"
        role="button"
        aria-controls="CartOffcanvas"
      >
        <i class="bi bi-cart-plus-fill fs-4"></i><span class="d-block d-md-none">add to cart</span>
      </a>
      <RouterLink :to="`/products/${product.id}`" class="stretched-link z-1"></RouterLink>
    </div>
  </div>

  <!-- 
        <div class="card product-card border-0 rounded-0 position-relative">
          <img :src="photoImg" class="card-img-top rounded-0" alt="..." />
          <p class="position-absolute bg-warning px-2 py-0 mt-1 text-uppercase fw-semibold">sale</p>
          <div class="card-body p-1 pt-2 pb-4">
            <p class="mb-2 fs-5 fw-medium">
              $899
              <span class="fs-6 text-light-emphasis text-decoration-line-through">$1200</span>
            </p>
            <p class="card-text mb-2 fs-6 fw-medium content-truncate">
              Prescription swimming goggles XBASE 200-600 degrees - Black (nose bridge blue-green)
            </p>
            <p class="card-brands mb-2 fs-7 fw-semibold">DECATHLON2</p>
            <a
              href="#"
              class="icon-cart text-end d-inline-block position-absolute z-2 bottom-0 end-0"
              ><i class="bi bi-cart-plus-fill fs-4"></i
            ></a>
            <a href="/product/1" class="stretched-link z-1"></a>
          </div>
        </div> -->
</template>

<script>
export default {
  props: ["product"],

  methods: {
    getProduct(id) {
      this.$router.push(`product/${id}`);
    },
  },
};
</script>
