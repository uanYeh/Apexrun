<template>
  <section class="couponsBar text-center bg-warning text-dark">
    <p class="mb-0 py-2 fs-6 fw-semibold">
      <i class="bi bi-tags-fill"></i>
      Year-End Sale: 20% off ends in
      <span class="bg-dark text-warning p-1 me-1 rounded-1">{{ pad(days) }}d</span>:
      <span class="bg-dark text-warning p-1 me-1 rounded-1">{{ pad(hours) }}</span
      >: <span class="bg-dark text-warning p-1 me-1 rounded-1">{{ pad(minutes) }} </span>:
      <span class="bg-dark text-warning p-1 me-1 rounded-1">{{ pad(seconds) }}</span>
      <span class="text-primary p-1 ms-1">Code: SPORT20</span>
    </p>
  </section>

  <!-- <section class="couponsBar text-center bg-warning text-dark">
    <p class="mb-0 py-2 fs-6 fw-semibold">
      <i class="bi bi-tags-fill"></i> GET 20% OFF SPECIAL SALES IN OD 23H 58M 38S
    </p>
  </section> -->
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 0,
      timer: null,
    };
  },
  mounted() {
    const deadline = new Date("2026-12-31T23:59:59");
    this.timer = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        clearInterval(this.timer);
        this.timeLeft = 0;
        return;
      }
      this.timeLeft = diff;
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  computed: {
    days() {
      return Math.floor(this.timeLeft / 1000 / 60 / 60 / 24);
    },
    hours() {
      return Math.floor((this.timeLeft / 1000 / 60 / 60) % 24);
    },
    minutes() {
      return Math.floor((this.timeLeft / 1000 / 60) % 60);
    },
    seconds() {
      return Math.floor((this.timeLeft / 1000) % 60);
    },
  },
  methods: {
    pad(n) {
      return String(n).padStart(2, "0");
    },
  },
};
</script>
