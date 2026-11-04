<!-- <template>
  <nav class="container-xl navbar navbar-expand-lg">
    <div class="container-fluid position-lg-relative">
      <RouterLink class="navbar-brand" to="/"
        ><img src="@/assets/images/logo-dark.svg" alt="Wavo" style="width: 190px"
      /></RouterLink>
      <button
        class="navbar-toggler rounded-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="link-hover nav-link dropdown-toggle fw-semibold fs-6"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Product
            </a>
            <ul class="dropdown-menu rounded-0">
              <li><RouterLink class="dropdown-item" to="/products">All Products</RouterLink></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="link-hover nav-link fw-semibold fs-6" aria-current="page" href="#">News</a>
          </li>
          <li class="nav-item">
            <a class="link-hover nav-link fw-semibold fs-6" href="#">About</a>
          </li>
          <li class="nav-item d-lg-none">
            <a class="link-hover nav-link fw-semibold fs-6" href="#">FAQ</a>
          </li>
        </ul>
      </div>
      <div class="position-relative z-1 search-container px-3 py-1 py-md-1">
        <form class="d-flex align-items-center" role="search">
          <i class="bi bi-search"></i>
          <input
            class="form-control me-1 me-md-2 border-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <a class="favorite ms-3">
        <i class="bi bi-heart fs-4 text-dark"></i>
      </a>
      <CartListOffcanvas />
    </div>
  </nav>
</template> -->
<template>
  <Teleport to="body">
    <div class="modal fade" id="couponModal" ref="couponModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-0 border-0">
          <div class="modal-body p-0 position-relative">
            <button
              type="button"
              class="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-1"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div class="bg-primary text-white text-center p-5">
              <p class="fs-6 text-uppercase fw-semibold mb-2">Year-End Sale</p>
              <h2 class="display-4 fw-bold mb-2">20% OFF</h2>
              <p class="mb-4">
                Use code at checkout: <span class="fw-bold text-warning">SPORT20</span>
              </p>
              <button class="btn btn-light rounded-0 px-4" @click="copyCoupon">
                {{ copied ? "COPIED!" : "COPY CODE" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      copied: false,
      modal: null,
    };
  },
  mounted() {
    // const seen = localStorage.getItem("couponSeen");
    // if (!seen) {
    this.modal = new Modal(this.$refs.couponModal);
    setTimeout(() => {
      this.modal.show();
    }, 500);
    // }
  },
  beforeUnmount() {
    // 離開首頁時清掉 modal，避免殘留的灰色背景
    if (this.modal) this.modal.dispose();
  },
  methods: {
    copyCoupon() {
      navigator.clipboard.writeText("SPORT20");
      this.copied = true;
      localStorage.setItem("couponSeen", "true");
      // 顯示 COPIED! 1 秒後再關閉
      setTimeout(() => {
        this.modal.hide();
        this.copied = false;
      }, 1000);
    },
  },
};
</script>
