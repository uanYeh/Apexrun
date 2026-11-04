<template>
  <ul class="list-unstyled">
    <template v-for="item in cartStore.carts" :key="item.id">
      <li
        v-for="(variant, index) in cartStore.variantsOf(item)"
        :key="`${item.id}-${index}`"
        class="cart-item d-flex align-items-center border-bottom"
        :class="editable ? 'py-3' : 'py-2'"
      >
        <!-- 圖片 -->
        <img :src="item.product.imageUrl" :alt="item.product.title" class="cart-item-img me-3" />

        <!-- 商品資訊 -->
        <div class="flex-grow-1">
          <p class="fw-bold mb-1 cart-item-title me-2">{{ item.product.title }}</p>

          <!-- 規格（顏色 / 尺寸） -->
          <p v-if="variantLabel(variant)" class="mb-1 fs-7 text-muted">
            {{ variantLabel(variant) }}
          </p>

          <!-- 只顯示數量（結帳頁） -->
          <p v-if="!editable" class="text-muted small mb-1">Qty：{{ variant.qty }}</p>

          <!-- 可以調整數量（側邊購物車、購物車頁） -->
          <div v-else class="d-flex align-items-center">
            <div v-if="size === 'sm'">qty：</div>
            <div
              class="d-flex border"
              :style="[
                size === 'sm' ? 'height: 28px' : '',
                isLoading(item, index) ? 'pointer-events: none; opacity: 0.5' : '',
              ]"
            >
              <button
                class="btn btn-light rounded-0"
                :class="size === 'sm' ? 'px-1 py-0' : 'px-2'"
                :aria-label="`Decrease ${item.product.title}`"
                @click="updateQty(item, index, variant.qty - 1)"
              >
                <i class="bi bi-dash" :class="{ 'fs-7': size === 'sm' }"></i>
              </button>
              <input
                type="number"
                class="text-center border-0 px-2 fs-7 no-spinner"
                style="width: 40px"
                :value="variant.qty"
                min="1"
                :aria-label="`Quantity of ${item.product.title}`"
                @change="updateQty(item, index, $event.target.value)"
              />
              <button
                class="btn btn-light rounded-0"
                :class="size === 'sm' ? 'px-1 py-0' : 'px-2'"
                :aria-label="`Increase ${item.product.title}`"
                @click="updateQty(item, index, variant.qty + 1)"
              >
                <i class="bi bi-plus" :class="{ 'fs-7': size === 'sm' }"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- 價格 + 刪除 -->
        <div class="d-flex align-items-center ms-3" :class="size === 'sm' ? 'gap-2' : 'gap-3'">
          <span class="fw-bold">${{ currency(item.product.price * variant.qty) }}</span>
          <button
            v-if="editable"
            class="btn-close"
            :class="{ 'me-2': size === 'sm' }"
            :disabled="isLoading(item, index)"
            :aria-label="`Remove ${item.product.title}`"
            @click="removeItem(item, index)"
          ></button>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";

export default {
  props: {
    // 能不能調整數量、刪除（結帳頁設成 false）
    editable: {
      type: Boolean,
      default: true,
    },
    // 按鈕大小："sm" 小（側邊購物車），"md" 一般（購物車頁）
    size: {
      type: String,
      default: "md",
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      loadingKey: null, // 正在更新/刪除的那一行（商品 id + 規格位置）
    };
  },
  methods: {
    currency,
    // 規格文字，例如「Black / M」
    variantLabel(v) {
      return [v.color, v.size].filter(Boolean).join(" / ");
    },
    isLoading(item, index) {
      return this.loadingKey === `${item.id}-${index}`;
    },
    // 調整某一個規格的數量
    async updateQty(item, index, qty) {
      const q = parseInt(qty);
      if (!q || q < 1) return;
      this.loadingKey = `${item.id}-${index}`;
      try {
        await this.cartStore.updateVariantQty(item, index, q);
      } finally {
        this.loadingKey = null;
      }
    },
    // 刪除某一個規格
    async removeItem(item, index) {
      this.loadingKey = `${item.id}-${index}`;
      try {
        await this.cartStore.removeVariant(item, index);
      } finally {
        this.loadingKey = null;
      }
    },
  },
};
</script>
