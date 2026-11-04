<script>
import { RouterView } from "vue-router";
import TheCart from "@/components/TheCart.vue";

export default {
  components: {
    RouterView,
    TheCart,
  },
};
</script>

<template>
  <RouterView />
  <TheCart />
</template>
