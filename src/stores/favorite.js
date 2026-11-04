import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    // 一開始先從 localStorage 讀出之前收藏的商品 id
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  }),
  getters: {
    // 收藏數量（Header 愛心上的數字）
    count: (state) => state.favorites.length,
  },
  actions: {
    // 判斷這個商品有沒有被收藏
    isFavorite(id) {
      return this.favorites.includes(id);
    },
    // 點愛心：沒收藏就加入，有收藏就移除
    toggleFavorite(id) {
      if (this.isFavorite(id)) {
        this.favorites = this.favorites.filter((item) => item !== id);
      } else {
        this.favorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
