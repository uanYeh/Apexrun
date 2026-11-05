<template>
  <div v-if="product" class="bg-light px-3 py-3 border-bottom">
    <!-- 標題 + 關閉 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <p class="mb-0 fw-bold fs-5">Select options</p>
      <button
        type="button"
        class="btn-close"
        aria-label="Close options"
        @click="cartStore.closeQuickAdd()"
      ></button>
    </div>

    <!-- 商品資訊 -->
    <div class="d-flex align-items-center gap-3 mb-3">
      <img :src="product.imageUrl" :alt="product.title" class="cart-item-img" />
      <div class="flex-grow-1 overflow-hidden">
        <p class="fw-bold mb-1 cart-item-title">{{ product.title }}</p>
        <p class="mb-0">
          <span class="fw-bold">${{ currency(product.price) }}</span>
          <del v-if="product.origin_price > product.price" class="text-muted fs-7 ms-2">
            ${{ currency(product.origin_price) }}
          </del>
        </p>
      </div>
    </div>

    <!-- 顏色 -->
    <div v-if="colors.length" class="mb-3">
      <p class="mb-2 fs-7">
        Color: <span class="fw-bold">{{ selectedColor || "Please select" }}</span>
      </p>
      <div class="d-flex flex-wrap gap-2">
        <button
          v-for="c in colors"
          :key="c.name"
          type="button"
          class="color-swatch rounded-circle border"
          :class="{ active: selectedColor === c.name }"
          :style="{ backgroundColor: c.code }"
          :title="c.name"
          :aria-label="c.name"
          @click="selectColor(c.name)"
        ></button>
      </div>
    </div>

    <!-- 尺寸 -->
    <div v-if="sizes.length" class="mb-3">
      <p class="mb-2 fs-7">
        Size: <span class="fw-bold">{{ selectedSize || "Please select" }}</span>
      </p>
      <div class="d-flex flex-wrap gap-2">
        <button
          v-for="s in sizes"
          :key="s"
          type="button"
          class="size-btn btn btn-outline-dark btn-sm rounded-0"
          :class="{ active: selectedSize === s }"
          @click="selectSize(s)"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <!-- 沒選完的提示 -->
    <p v-if="optionError" class="text-danger fs-7 mb-2">{{ optionError }}</p>

    <button
      type="button"
      class="btn btn-primary w-100 rounded-0 py-2"
      :disabled="isAdding"
      @click="add"
    >
      <span v-if="isAdding" class="spinner-border spinner-border-sm me-2" role="status"></span>
      Add to Cart
    </button>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      selectedColor: "",
      selectedSize: "",
      optionError: "",
    };
  },
  computed: {
    // 正在選規格的商品（從 store 來）
    product() {
      return this.cartStore.quickAddProduct;
    },
    colors() {
      return Array.isArray(this.product?.colors) ? this.product.colors : [];
    },
    sizes() {
      return Array.isArray(this.product?.sizes) ? this.product.sizes : [];
    },
    // 這個商品正在加入購物車
    isAdding() {
      return this.cartStore.loadingItem === this.product?.id;
    },
  },
  watch: {
    // 換商品時，清空選擇；只有一個選項的話自動選好
    product: {
      handler() {
        this.selectedColor = this.colors.length === 1 ? this.colors[0].name : "";
        this.selectedSize = this.sizes.length === 1 ? this.sizes[0] : "";
        this.optionError = "";
      },
      immediate: true,
    },
  },
  methods: {
    currency,
    selectColor(name) {
      this.selectedColor = name;
      this.optionError = "";
    },
    selectSize(size) {
      this.selectedSize = size;
      this.optionError = "";
    },
    async add() {
      // 有顏色或尺寸就一定要選
      if (this.colors.length && !this.selectedColor) {
        this.optionError = "Please select a color.";
        return;
      }
      if (this.sizes.length && !this.selectedSize) {
        this.optionError = "Please select a size.";
        return;
      }
      await this.cartStore.addCart(this.product.id, 1, {
        color: this.selectedColor,
        size: this.selectedSize,
      });
      // 加入後關掉選擇區，TheCart 會顯示 Just added
      this.cartStore.closeQuickAdd();
    },
  },
};
</script>
