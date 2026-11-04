import { defineStore } from "pinia";
import axios from "axios";

// API 共用網址
const apiBase = () => `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}`;

// 取得購物車項目的規格明細
// 舊資料沒有 variants 的話，當成「沒有規格」的一行
function getVariants(item) {
  if (Array.isArray(item.variants) && item.variants.length) {
    return item.variants.map((v) => ({ ...v }));
  }
  return [{ size: "", color: "", qty: item.qty }];
}

// 算出所有規格的總數量
function sumQty(variants) {
  return variants.reduce((sum, v) => sum + v.qty, 0);
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [],
    total: 0,
    isLoading: false,
    finalTotal: 0,
    lastAdded: null,
    loadingItem: "",
  }),
  actions: {
    getCart() {
      const api = `${apiBase()}/cart`;
      this.isLoading = true;
      return axios.get(api).then((res) => {
        this.isLoading = false;
        this.carts = res.data.data.carts;
        this.total = res.data.data.total;
        this.finalTotal = res.data.data.final_total;
      });
    },

    // 給畫面使用：取得某個購物車項目的規格明細
    variantsOf(item) {
      return getVariants(item);
    },

    // 存回 API：qty 自動算成明細的總數
    async saveCartItem(item, variants) {
      const api = `${apiBase()}/cart/${item.id}`;
      await axios.put(api, {
        data: { product_id: item.product_id, qty: sumQty(variants), variants },
      });
      await this.getCart();
    },

    // ✏️ 修改：多了 options，可以傳入 { size, color }
    async addCart(id, qty = 1, options = {}) {
      if (this.loadingItem) return;
      this.loadingItem = id;

      const size = options.size || "";
      const color = options.color || "";

      try {
        await this.getCart();
        const existing = this.carts.find((item) => item.product_id === id);

        if (existing) {
          // 購物車已經有這個商品：同規格加數量，不同規格新增一行
          const variants = getVariants(existing);
          const same = variants.find((v) => v.size === size && v.color === color);
          if (same) {
            same.qty += qty;
          } else {
            variants.push({ size, color, qty });
          }
          await this.saveCartItem(existing, variants);
        } else {
          // 購物車還沒有這個商品：新增
          const api = `${apiBase()}/cart`;
          await axios.post(api, {
            data: { product_id: id, qty, variants: [{ size, color, qty }] },
          });
          await this.getCart();
        }

        const productApi = `${apiBase()}/product/${id}`;
        axios.get(productApi).then((res) => {
          this.lastAdded = {
            ...res.data.product,
            qty,
            size,
            color,
            total: res.data.product.price * qty,
          };
          setTimeout(() => {
            this.lastAdded = null;
          }, 4000);
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.loadingItem = "";
      }
    },

    // ✅ 新增：調整某個規格的數量
    async updateVariantQty(item, index, qty) {
      if (qty < 1) return;
      const variants = getVariants(item);
      variants[index].qty = qty;
      await this.saveCartItem(item, variants);
    },

    // ✅ 新增：刪除某個規格，刪到沒有規格時，整個商品從購物車移除
    async removeVariant(item, index) {
      const variants = getVariants(item);
      variants.splice(index, 1);
      if (variants.length === 0) {
        await this.removeCart(item.id);
      } else {
        await this.saveCartItem(item, variants);
      }
    },

    removeCart(id) {
      const api = `${apiBase()}/cart/${id}`;
      return axios.delete(api).then(() => this.getCart());
    },

    // 保留舊的寫法：只有一種規格時可以直接改總數量
    async updateCart(cartId, qty, productId) {
      if (qty < 1) return;
      const item = this.carts.find((i) => i.id === cartId);
      const variants = item ? getVariants(item) : [];
      if (variants.length > 1) {
        console.warn("這個商品有多種規格，請改用 updateVariantQty");
        return;
      }
      if (variants.length === 1) variants[0].qty = qty;
      const api = `${apiBase()}/cart/${cartId}`;
      await axios.put(api, { data: { product_id: productId, qty, variants } });
      await this.getCart();
    },

    applyCoupon(code) {
      const api = `${apiBase()}/coupon`;
      return axios.post(api, { data: { code } }).then((res) => {
        this.getCart();
        return res.data;
      });
    },
  },
});
