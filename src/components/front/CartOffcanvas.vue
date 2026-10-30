<template>
  <div class="cart-num">
    <a
      class="position-relative mx-3"
      data-bs-toggle="offcanvas"
      href="#CartOffcanvas"
      role="button"
      aria-controls="CartOffcanvas"
    >
      <i class="bi bi-bag fs-4 text-dark"></i>
      <span
        class="position-absolute translate-middle badge rounded-pill bg-danger d-flex justify-content-center align-items-center text-white fw-bolder"
      >
        13
      </span>
    </a>
  </div>
  <Teleport to="body">
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="CartOffcanvas"
      aria-labelledby="CartOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="CartOffcanvasLabel">Cart (1 items)</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>Some text as placeholder...</div>
        <div class="d-flex justify-content-between mt-3">
          <div>Total</div>
          <div>$499</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {};
</script>
