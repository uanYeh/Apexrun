<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title border-1" id="offcanvasExampleLabel">Cart (1 items)</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <hr />
    <div class="offcanvas-body">
      <div>
        Some text as placeholder. In real life you can have the elements you have chosen. Like,
        text, images, lists, etc.
      </div>
      <div class="dropdown mt-3">
        <div class="d-flex justify-content-between">
          <div>Total</div>
          <div>$499</div>
        </div>
      </div>
    </div>
  </div>
</template>
