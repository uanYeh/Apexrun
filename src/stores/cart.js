import { defineStore } from "pinia";
import axios from "axios";

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
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
      this.isLoading = true;
      return axios.get(api).then((res) => {
        this.isLoading = false;
        this.carts = res.data.data.carts;
        this.total = res.data.data.total;
        this.finalTotal = res.data.data.final_total;
      });
    },
    async addCart(id, qty = 1) {
      if (this.loadingItem) return;
      this.loadingItem = id;

      try {
        await this.getCart();
        const existing = this.carts.find((item) => item.product_id === id);
        if (existing) {
          await this.updateCart(existing.id, existing.qty + qty, existing.product_id);
        } else {
          const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
          await axios.post(api, { data: { product_id: id, qty } });
          await this.getCart();
        }

        const productApi = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
        axios.get(productApi).then((res) => {
          this.lastAdded = { ...res.data.product, qty, total: res.data.product.price * qty };
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
    removeCart(id) {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${id}`;
      return axios.delete(api).then(() => this.getCart());
    },
    async updateCart(cartId, qty, productId) {
      if (qty < 1) return;
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${cartId}`;
      await axios.put(api, { data: { product_id: productId, qty } });
      await this.getCart();
    },
    applyCoupon(code) {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/coupon`;
      return axios.post(api, { data: { code } }).then((res) => {
        this.getCart();
        return res.data;
      });
    },
  },
});
